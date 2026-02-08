import { execSync } from "child_process";

console.log("Starting portfolio locally...");
console.log("Open http://localhost:5000 in your browser\n");

try {
  execSync("npx vite --config vite.config.local.ts", {
    stdio: "inherit",
    env: { ...process.env, NODE_ENV: "development" },
  });
} catch (e) {
  process.exit(1);
}
