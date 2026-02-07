import { FaGithub, FaDribbble, FaFigma, FaDiscord } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const navLinks = [
  { label: "home", href: "#home", active: true },
  { label: "works", href: "#projects" },
  { label: "about-me", href: "#about" },
  { label: "contacts", href: "#contacts" },
];

const projects = [
  {
    image: "/figmaAssets/project1.png",
    tags: ["HTML", "SCSS", "Python", "Flask"],
    title: "ChertNodes",
    description: "Minecraft servers hosting",
  },
  {
    image: "/figmaAssets/project1.png",
    tags: ["React", "Express", "Discord.js", "Node.js"],
    title: "Kahoot Answers",
    description: "Get answers tracker for Kahoot",
  },
  {
    image: "/figmaAssets/project1.png",
    tags: ["CSS", "Express", "Node.js"],
    title: "Protectif",
    description: "Discord bot tracker",
  },
];

const skillCategories = [
  { title: "Languages", items: ["TypeScript", "Lua", "Python", "JavaScript"] },
  { title: "Databases", items: ["SQLite", "PostgreSQL", "Mongo"] },
  { title: "Tools", items: ["VSCode", "Neovim", "Linux", "Figma", "GIMP", "Git"] },
  { title: "Other", items: ["HTML", "CSS", "EJS", "SCSS", "REST"] },
  { title: "Frameworks", items: ["React", "Vue", "Disnake", "Discord.js", "Flask", "Express.js"] },
];

const funFacts = [
  "I like mass mass mass",
  "mass mass mass",
  "I often mass mass",
  "I like mass",
  "My mass on mass mass mass",
  "mass mass mass mass",
  "I have a mass called mass",
];

function DotsPattern({ className }: { className?: string }) {
  return (
    <div className={`grid grid-cols-5 gap-3 ${className || ""}`}>
      {Array.from({ length: 25 }).map((_, i) => (
        <div key={i} className="w-1 h-1 rounded-full bg-[#abb2bf]" />
      ))}
    </div>
  );
}

function SectionHeading({ hash, title, lineWidth }: { hash: string; title: string; lineWidth?: string }) {
  return (
    <div className="flex items-center gap-4">
      <h2 className="font-['Fira_Code'] font-medium text-[32px] whitespace-nowrap">
        <span className="text-[#c778dd]">#</span>
        <span className="text-white">{title}</span>
      </h2>
      <div className={`h-px bg-[#c778dd] ${lineWidth || "flex-1"}`} />
    </div>
  );
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <div className="border border-[#abb2bf] flex flex-col">
      <div className="border-b border-[#abb2bf] h-[201px] overflow-hidden">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
      </div>
      <div className="flex gap-2 p-2 font-['Fira_Code'] text-[#abb2bf] text-sm">
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <div className="border-t border-[#abb2bf] p-4 flex flex-col gap-4">
        <h3 className="font-['Fira_Code'] font-medium text-white text-2xl">{project.title}</h3>
        <p className="font-['Fira_Code'] text-[#abb2bf] text-base">{project.description}</p>
        <div className="flex gap-4">
          <button className="border border-[#c778dd] px-4 py-2 font-['Fira_Code'] font-medium text-white text-base hover:bg-[#c778dd33] transition-colors">
            {`Live <~>`}
          </button>
          <button className="border border-[#abb2bf] px-4 py-2 font-['Fira_Code'] font-medium text-[#abb2bf] text-base hover:bg-[#abb2bf22] transition-colors">
            {`Cached >=`}
          </button>
        </div>
      </div>
    </div>
  );
}

function SkillBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border border-[#abb2bf] py-2">
      <div className="px-2">
        <p className="font-['Fira_Code'] font-semibold text-white text-base">{title}</p>
      </div>
      <div className="w-full h-px bg-[#abb2bf] my-2" />
      <div className="px-2 font-['Fira_Code'] text-[#abb2bf] text-base">
        <p>{items.join(" ")}</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-[#282c33] min-h-screen text-white">
      {/* Side social media bar */}
      <div className="fixed left-4 top-0 z-50 hidden lg:flex flex-col items-center gap-2">
        <div className="w-px h-48 bg-[#abb2bf]" />
        <div className="flex flex-col gap-2">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[#abb2bf] hover:text-white transition-colors">
            <FaGithub size={32} />
          </a>
          <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="text-[#abb2bf] hover:text-white transition-colors">
            <FaDribbble size={32} />
          </a>
          <a href="https://figma.com" target="_blank" rel="noopener noreferrer" className="text-[#abb2bf] hover:text-white transition-colors">
            <FaFigma size={32} />
          </a>
        </div>
      </div>

      {/* Header */}
      <header className="max-w-[1024px] mx-auto flex items-end justify-between pt-8 pb-2 px-4">
        <div className="flex items-center gap-2">
          <img src="/figmaAssets/logo.png" alt="Logo" className="w-[16px] h-[16px]" />
          <span className="font-['Fira_Code'] font-bold text-white text-base">Elias</span>
        </div>
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`font-['Fira_Code'] text-base ${link.active ? "font-medium" : "font-normal"}`}
            >
              <span className="text-[#c778dd]">#</span>
              <span className={link.active ? "text-white" : "text-[#abb2bf] hover:text-white transition-colors"}>
                {link.label}
              </span>
            </a>
          ))}
          <div className="flex items-center gap-1 cursor-pointer">
            <span className="font-['Fira_Code'] font-semibold text-[#abb2bf] text-base">EN</span>
            <svg width="10" height="5" viewBox="0 0 10 5" fill="none">
              <path d="M1 1L5 4L9 1" stroke="#abb2bf" strokeWidth="1.5" />
            </svg>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="max-w-[1024px] mx-auto px-4 pt-16 pb-8">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1">
            <h1 className="font-['Fira_Code'] font-semibold text-[32px] leading-tight mb-8">
              Elias is a{" "}
              <span className="text-[#c778dd]">web designer</span> and{" "}
              <span className="text-[#c778dd]">front-end developer</span>
            </h1>
            <p className="font-['Fira_Code'] text-[#abb2bf] text-base mb-6">
              He crafts responsive websites where technologies meet creativity
            </p>
            <button className="border border-[#c778dd] px-4 py-2 font-['Fira_Code'] font-medium text-white text-base hover:bg-[#c778dd33] transition-colors">
              Contact me!!
            </button>
          </div>
          <div className="relative flex-shrink-0">
            <img
              src="/figmaAssets/profile.png"
              alt="Elias"
              className="w-[457px] max-w-full h-auto relative z-10"
            />
            <DotsPattern className="absolute bottom-4 right-[-20px] z-0 opacity-50" />
          </div>
        </div>
        <div className="mt-6 border border-[#abb2bf] px-4 py-2 inline-flex items-center gap-2">
          <div className="w-4 h-4 bg-[#c778dd]" />
          <span className="font-['Fira_Code'] text-[#abb2bf] text-base">
            Currently working on <span className="font-semibold text-white">Portfolio</span>
          </span>
        </div>
      </section>

      {/* Quote Section */}
      <section className="max-w-[1024px] mx-auto px-4 py-12">
        <div className="flex justify-center">
          <div className="relative max-w-[712px]">
            <div className="border border-[#abb2bf] p-8 relative">
              <span className="absolute -top-4 left-2 text-[#abb2bf] text-4xl font-serif bg-[#282c33] px-2">"</span>
              <p className="font-['Fira_Code'] font-medium text-white text-2xl text-center">
                With great power comes great electricity bill
              </p>
              <span className="absolute -bottom-4 right-2 text-[#abb2bf] text-4xl font-serif bg-[#282c33] px-2">"</span>
            </div>
            <div className="flex justify-end mt-2">
              <div className="border border-[#abb2bf] px-4 py-2">
                <p className="font-['Fira_Code'] font-normal text-white text-2xl">- Dr. Who</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="max-w-[1024px] mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-12">
          <SectionHeading hash="#" title="projects" lineWidth="w-[400px]" />
          <a href="#" className="font-['Fira_Code'] text-white text-base hover:text-[#c778dd] transition-colors whitespace-nowrap ml-4">
            View all ~~&gt;
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="max-w-[1024px] mx-auto px-4 py-12">
        <SectionHeading hash="#" title="skills" lineWidth="w-[200px]" />
        <div className="mt-12 flex flex-col lg:flex-row gap-8">
          <div className="relative flex-shrink-0 w-[200px] hidden lg:block">
            <DotsPattern className="absolute top-4 left-8" />
            <DotsPattern className="absolute bottom-4 right-0" />
            <div className="w-[86px] h-[86px] border border-[#abb2bf] absolute top-12 right-0" />
            <div className="w-[52px] h-[52px] border border-[#abb2bf] absolute bottom-0 right-8" />
          </div>
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {skillCategories.map((cat) => (
              <SkillBlock key={cat.title} title={cat.title} items={cat.items} />
            ))}
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="max-w-[1024px] mx-auto px-4 py-12">
        <SectionHeading hash="#" title="about-me" lineWidth="w-[200px]" />
        <div className="mt-8 flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="font-['Fira_Code'] text-[#abb2bf] text-base leading-[26px] space-y-4">
              <p>Hello, i'm Elias!</p>
              <p>
                I'm a self-taught front-end developer based in Kyiv, Ukraine. I can develop
                responsive websites from scratch and raise them into modern user-friendly web
                experiences.
              </p>
              <p>
                Transforming my creativity and knowledge into a websites has been my passion for
                over a year. I have been helping various clients to establish their presence
                online. I always strive to learn about the newest technologies and frameworks.
              </p>
            </div>
            <button className="mt-6 border border-[#c778dd] px-4 py-2 font-['Fira_Code'] font-medium text-white text-base hover:bg-[#c778dd33] transition-colors">
              Read more -&gt;
            </button>
          </div>
          <div className="relative flex-shrink-0">
            <img
              src="/figmaAssets/profile.png"
              alt="Elias"
              className="w-[339px] max-w-full h-auto relative z-10"
            />
            <DotsPattern className="absolute top-8 left-[-20px] z-0 opacity-50" />
            <DotsPattern className="absolute bottom-16 right-[-20px] z-0 opacity-50" />
            <div className="absolute bottom-0 left-8 right-8 h-px bg-[#c778dd]" />
          </div>
        </div>
      </section>

      {/* Fun Facts Section */}
      <section className="max-w-[1024px] mx-auto px-4 py-12">
        <SectionHeading hash="#" title="my-fun-facts" lineWidth="w-[200px]" />
        <div className="mt-8 flex flex-col lg:flex-row gap-8">
          <div className="flex flex-wrap gap-4">
            {funFacts.map((fact, i) => (
              <div key={i} className="border border-[#abb2bf] px-4 py-2">
                <p className="font-['Fira_Code'] text-[#abb2bf] text-base">{fact}</p>
              </div>
            ))}
          </div>
          <div className="relative flex-shrink-0 hidden lg:block w-[200px]">
            <DotsPattern className="absolute top-0 left-0" />
            <DotsPattern className="absolute bottom-0 right-0" />
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="max-w-[1024px] mx-auto px-4 py-12">
        <SectionHeading hash="#" title="contacts" lineWidth="w-[200px]" />
        <div className="mt-8 flex flex-col lg:flex-row gap-8 justify-between">
          <div className="flex-1 max-w-[505px]">
            <p className="font-['Fira_Code'] font-medium text-[#abb2bf] text-base">
              I'm interested in freelance opportunities. However, if you have other request or
              question, don't hesitate to contact me
            </p>
          </div>
          <div className="border border-[#abb2bf] p-4 flex flex-col gap-4">
            <p className="font-['Fira_Code'] font-semibold text-white text-base">Message me here</p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-[5px]">
                <FaDiscord className="text-[#abb2bf] w-8 h-8" />
                <span className="font-['Fira_Code'] text-[#abb2bf] text-base">@elias</span>
              </div>
              <div className="flex items-center gap-[5px]">
                <MdEmail className="text-[#abb2bf] w-8 h-8" />
                <span className="font-['Fira_Code'] text-[#abb2bf] text-base">elias@elias-dev.ml</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#abb2bf] mt-8">
        <div className="max-w-[1024px] mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <img src="/figmaAssets/logo.png" alt="Logo" className="w-[16px] h-[16px]" />
                  <span className="font-['Fira_Code'] font-medium text-white text-base">Elias</span>
                </div>
                <a
                  href="mailto:elias@elias-dev.ml"
                  className="font-['Fira_Code'] text-[#abb2bf] text-base hover:text-white transition-colors"
                >
                  elias@elias-dev.ml
                </a>
              </div>
              <p className="font-['Fira_Code'] text-white text-base">
                Web designer and front-end developer
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-['Fira_Code'] font-medium text-white text-2xl">Media</p>
              <div className="flex gap-2">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[#abb2bf] hover:text-white transition-colors">
                  <FaGithub size={32} />
                </a>
                <a href="https://figma.com" target="_blank" rel="noopener noreferrer" className="text-[#abb2bf] hover:text-white transition-colors">
                  <FaFigma size={32} />
                </a>
                <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-[#abb2bf] hover:text-white transition-colors">
                  <FaDiscord size={32} />
                </a>
              </div>
            </div>
          </div>
          <p className="font-['Fira_Code'] text-[#abb2bf] text-base text-center mt-12">
            © Copyright 2022. Made by Elias
          </p>
        </div>
      </footer>
    </div>
  );
}
