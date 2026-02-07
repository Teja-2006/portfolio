import { Octokit } from '@octokit/rest';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const REPO_NAME = 'portfolio';
const REPO_DESCRIPTION = 'Portfolio website for Elias - Web Designer & Front-End Developer';

const BINARY_EXTENSIONS = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.bmp', '.ico', '.webp',
  '.svg', '.woff', '.woff2', '.ttf', '.eot', '.otf',
  '.mp3', '.mp4', '.wav', '.ogg', '.webm',
  '.zip', '.gz', '.tar', '.rar',
  '.pdf', '.doc', '.docx',
]);

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected. Please connect GitHub in the Replit integrations panel.');
  }
  return accessToken;
}

async function getUncachableGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

function isBinaryFile(filePath: string): boolean {
  const ext = path.extname(filePath).toLowerCase();
  return BINARY_EXTENSIONS.has(ext);
}

function getTrackedFiles(): string[] {
  const output = execSync('git ls-files', { encoding: 'utf-8' });
  return output
    .split('\n')
    .filter(f => f.trim().length > 0)
    .filter(f => !f.startsWith('node_modules/'))
    .filter(f => !f.startsWith('.git/'));
}

async function main() {
  console.log('Starting GitHub push process...\n');

  const octokit = await getUncachableGitHubClient();

  const { data: user } = await octokit.users.getAuthenticated();
  const owner = user.login;
  console.log(`Authenticated as: ${owner}`);

  let repoExists = false;
  try {
    await octokit.repos.get({ owner, repo: REPO_NAME });
    repoExists = true;
    console.log(`Repository "${REPO_NAME}" already exists. Will push to existing repo.`);
  } catch (err: any) {
    if (err.status === 404) {
      console.log(`Creating repository "${REPO_NAME}"...`);
      await octokit.repos.createForAuthenticatedUser({
        name: REPO_NAME,
        description: REPO_DESCRIPTION,
        private: false,
        auto_init: true,
      });
      console.log(`Repository "${REPO_NAME}" created successfully.`);
    } else {
      throw err;
    }
  }

  await new Promise(resolve => setTimeout(resolve, 2000));

  const files = getTrackedFiles();
  console.log(`\nCollected ${files.length} files to push.`);

  console.log('Creating blobs...');
  const treeItems: { path: string; mode: '100644'; type: 'blob'; sha: string }[] = [];

  const BATCH_SIZE = 10;
  for (let i = 0; i < files.length; i += BATCH_SIZE) {
    const batch = files.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(
      batch.map(async (filePath) => {
        const fullPath = path.resolve(filePath);
        if (!fs.existsSync(fullPath)) {
          console.warn(`  Skipping missing file: ${filePath}`);
          return null;
        }

        const isBinary = isBinaryFile(filePath);
        let content: string;
        let encoding: 'base64' | 'utf-8';

        if (isBinary) {
          content = fs.readFileSync(fullPath).toString('base64');
          encoding = 'base64';
        } else {
          content = fs.readFileSync(fullPath, 'utf-8');
          encoding = 'utf-8';
        }

        const { data: blob } = await octokit.git.createBlob({
          owner,
          repo: REPO_NAME,
          content,
          encoding,
        });

        return {
          path: filePath,
          mode: '100644' as const,
          type: 'blob' as const,
          sha: blob.sha,
        };
      })
    );

    for (const item of results) {
      if (item) treeItems.push(item);
    }

    const processed = Math.min(i + BATCH_SIZE, files.length);
    console.log(`  Progress: ${processed}/${files.length} files processed`);
  }

  console.log('\nCreating tree...');
  const { data: tree } = await octokit.git.createTree({
    owner,
    repo: REPO_NAME,
    tree: treeItems,
  });

  let parentSha: string | undefined;
  try {
    const { data: ref } = await octokit.git.getRef({
      owner,
      repo: REPO_NAME,
      ref: 'heads/main',
    });
    parentSha = ref.object.sha;
  } catch {
    // no existing commits
  }

  console.log('Creating commit...');
  const { data: commit } = await octokit.git.createCommit({
    owner,
    repo: REPO_NAME,
    message: 'Initial commit: Portfolio website',
    tree: tree.sha,
    parents: parentSha ? [parentSha] : [],
  });

  console.log('Updating ref...');
  try {
    await octokit.git.updateRef({
      owner,
      repo: REPO_NAME,
      ref: 'heads/main',
      sha: commit.sha,
      force: true,
    });
  } catch {
    await octokit.git.createRef({
      owner,
      repo: REPO_NAME,
      ref: 'refs/heads/main',
      sha: commit.sha,
    });
  }

  const repoUrl = `https://github.com/${owner}/${REPO_NAME}`;
  console.log(`\nDone! Repository URL: ${repoUrl}`);
}

main().catch((err) => {
  console.error('Error:', err.message || err);
  process.exit(1);
});
