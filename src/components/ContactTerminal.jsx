"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, CornerDownLeft } from "lucide-react";
import { skillClusters } from "../data/skillsData";

const PINNED_PROJECTS = [
  {
    name: "portfolio",
    description: "Personal minimalist developer portfolio with GSAP kinetic animations & dark aesthetic.",
    language: "JavaScript",
    stars: 5,
    url: "https://github.com/notsomohit/portfolio",
  },
  {
    name: "agentic-workflow-engine",
    description: "Autonomous LLM agent coordination framework with tool use and memory management.",
    language: "Python",
    stars: 8,
    url: "https://github.com/notsomohit",
  },
  {
    name: "next-fullstack-starter",
    description: "Production-ready boilerplate featuring Next.js, TypeScript, Tailwind, and Auth.",
    language: "TypeScript",
    stars: 4,
    url: "https://github.com/notsomohit",
  },
];

const EMAIL = "mohitascend07@gmail.com";
const GITHUB_URL = "https://github.com/notsomohit";
const LINKEDIN_URL = "https://www.linkedin.com/in/notsomohit/";

export default function ContactTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    {
      id: "init",
      type: "system",
      content: "Mohit Portfolio Terminal [v1.0.0]\nType 'help' for a list of available commands.",
    },
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef(null);
  const terminalEndRef = useRef(null);
  const terminalBoxRef = useRef(null);

  // Auto-scroll output
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [history, isLoading]);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const fetchLiveCommits = async () => {
    try {
      const res = await fetch("https://api.github.com/users/notsomohit/events/public");
      if (!res.ok) {
        throw new Error(`GitHub API returned status ${res.status}`);
      }
      const events = await res.json();
      const pushEvents = events.filter((e) => e.type === "PushEvent").slice(0, 4);

      if (!pushEvents || pushEvents.length === 0) {
        return "No recent public push events found on GitHub.";
      }

      const formattedEvents = await Promise.all(
        pushEvents.map(async (event) => {
          const repoName = event.repo?.name || "repository";
          const dateStr = event.created_at
            ? new Date(event.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "recent";

          let commitMsgs = [];
          if (event.payload?.commits && event.payload.commits.length > 0) {
            commitMsgs = event.payload.commits.map((c) => {
              const sha = c.sha ? c.sha.slice(0, 7) : "commit";
              return `    • [${sha}] ${c.message?.split("\n")[0] || "Update"}`;
            });
          } else if (event.payload?.head) {
            try {
              const commitRes = await fetch(
                `https://api.github.com/repos/${repoName}/commits/${event.payload.head}`
              );
              if (commitRes.ok) {
                const cData = await commitRes.json();
                const msg = cData.commit?.message?.split("\n")[0] || "Commit update";
                commitMsgs = [`    • [${event.payload.head.slice(0, 7)}] ${msg}`];
              } else {
                commitMsgs = [
                  `    • [${event.payload.head.slice(0, 7)}] Commit pushed to ${
                    event.payload.ref?.replace("refs/heads/", "") || "main"
                  }`,
                ];
              }
            } catch {
              commitMsgs = [`    • [${event.payload.head.slice(0, 7)}] Commit pushed`];
            }
          }

          return `📦 ${repoName} (${dateStr})\n${commitMsgs.join("\n") || "    • Commit pushed"}`;
        })
      );

      return `Recent Public Commits (LIVE from GitHub API):\n\n${formattedEvents.join("\n\n")}`;
    } catch (err) {
      return `Failed to fetch live commits (${err.message}).\nView profile directly: ${GITHUB_URL}`;
    }
  };

  const processCommand = async (rawCmd) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    // Push command line to history
    const cmdEntry = {
      id: Math.random().toString(),
      type: "command",
      content: cmd,
    };

    setHistory((prev) => [...prev, cmdEntry]);
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
    setInput("");

    const normalizedCmd = cmd.toLowerCase();

    if (normalizedCmd === "clear") {
      setHistory([]);
      return;
    }

    if (normalizedCmd === "help") {
      const helpText = `Available commands:
  help        → List all available commands
  about       → Who I am and what I build
  skills      → Tech stack, frameworks, tools & security
  projects    → Pinned GitHub repositories and descriptions
  commits     → Fetch recent public commits LIVE from GitHub API
  contact     → All direct contact channels
  email       → Email address
  github      → GitHub profile URL
  linkedin    → LinkedIn profile URL
  socials     → All social & contact links
  whoami      → Quick identity summary
  date        → Display current date and time
  clear       → Clear the terminal screen`;
      setHistory((prev) => [...prev, { id: Math.random().toString(), type: "output", content: helpText }]);
      return;
    }

    if (normalizedCmd === "about") {
      const aboutText = `Mohit // Full-Stack Developer

• Bio: Full-stack developer who enjoys building clean, functional products end-to-end.
• Focus: Currently going deep on AI and agentic AI systems, figuring out how autonomous agents actually get built.
• Philosophy: Minimalist aesthetics, high-performance architectures, and systems that work reliably.`;
      setHistory((prev) => [...prev, { id: Math.random().toString(), type: "output", content: aboutText }]);
      return;
    }

    if (normalizedCmd === "skills") {
      const formattedSkills = skillClusters
        .map((cluster) => {
          const names = cluster.skills.map((s) => s.name).join(", ");
          return `  [${cluster.index}] ${cluster.name.padEnd(18)} : ${names}`;
        })
        .join("\n");

      const skillsText = `Tech Stack & Tools:\n\n${formattedSkills}`;
      setHistory((prev) => [...prev, { id: Math.random().toString(), type: "output", content: skillsText }]);
      return;
    }

    if (normalizedCmd === "projects") {
      const formattedProjects = PINNED_PROJECTS.map((p) => {
        return `• ${p.name} [${p.language} ★${p.stars}]
  Description: ${p.description}
  URL: ${p.url}`;
      }).join("\n\n");

      const projectsText = `Pinned Repositories:\n\n${formattedProjects}`;
      setHistory((prev) => [...prev, { id: Math.random().toString(), type: "output", content: projectsText }]);
      return;
    }

    if (normalizedCmd === "commits") {
      setIsLoading(true);
      setHistory((prev) => [
        ...prev,
        {
          id: "loading-commits",
          type: "output",
          content: "Fetching live public commits from https://api.github.com/users/notsomohit/events/public ...",
        },
      ]);

      const commitsText = await fetchLiveCommits();

      setHistory((prev) => [
        ...prev.filter((item) => item.id !== "loading-commits"),
        { id: Math.random().toString(), type: "output", content: commitsText },
      ]);
      setIsLoading(false);
      return;
    }

    if (normalizedCmd === "contact") {
      const contactText = `Contact Channels:
  • Email    : ${EMAIL}
  • GitHub   : ${GITHUB_URL}
  • LinkedIn : ${LINKEDIN_URL}`;
      setHistory((prev) => [...prev, { id: Math.random().toString(), type: "output", content: contactText }]);
      return;
    }

    if (normalizedCmd === "email") {
      setHistory((prev) => [
        ...prev,
        { id: Math.random().toString(), type: "output", content: EMAIL },
      ]);
      return;
    }

    if (normalizedCmd === "github") {
      setHistory((prev) => [
        ...prev,
        { id: Math.random().toString(), type: "output", content: GITHUB_URL },
      ]);
      return;
    }

    if (normalizedCmd === "linkedin") {
      setHistory((prev) => [
        ...prev,
        { id: Math.random().toString(), type: "output", content: LINKEDIN_URL },
      ]);
      return;
    }

    if (normalizedCmd === "socials") {
      const socialsText = `Social & Contact Links:
  • GitHub   : ${GITHUB_URL}
  • LinkedIn : ${LINKEDIN_URL}
  • Email    : ${EMAIL}`;
      setHistory((prev) => [...prev, { id: Math.random().toString(), type: "output", content: socialsText }]);
      return;
    }

    if (normalizedCmd === "whoami") {
      const whoamiText = `user: guest@portfolio
identity: Mohit — Full-stack developer building clean, functional systems & agentic AI architectures.`;
      setHistory((prev) => [...prev, { id: Math.random().toString(), type: "output", content: whoamiText }]);
      return;
    }

    if (normalizedCmd === "date") {
      const dateText = new Date().toString();
      setHistory((prev) => [...prev, { id: Math.random().toString(), type: "output", content: dateText }]);
      return;
    }

    // Default unknown command
    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        type: "output",
        content: `command not found: "${cmd}". Type 'help' for a list of available commands.`,
      },
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!isLoading) {
        processCommand(input);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex =
          historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < commandHistory.length) {
          setHistoryIndex(nextIndex);
          setInput(commandHistory[nextIndex]);
        } else {
          setHistoryIndex(-1);
          setInput("");
        }
      }
    }
  };

  return (
    <div
      ref={terminalBoxRef}
      onClick={handleFocus}
      className="w-full h-full min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] bg-[#0a0a0a] border border-neutral-800 rounded-2xl flex flex-col font-mono text-xs sm:text-sm text-neutral-300 shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(124,92,255,0.06)] overflow-hidden cursor-text transition-all duration-300 hover:border-neutral-700"
    >
      {/* macOS-style Title Bar */}
      <div className="h-10 px-4 bg-[#111111] border-b border-neutral-800/90 flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block" />
          <span className="ml-2.5 text-[11px] sm:text-xs text-neutral-400 font-mono">
            mohit@portfolio: ~/contact
          </span>
        </div>
        <div className="flex items-center gap-2 text-neutral-500 text-[10px] sm:text-[11px]">
          <TerminalIcon className="w-3.5 h-3.5 text-[#7c5cff]" />
          <span className="hidden sm:inline">bash</span>
        </div>
      </div>

      {/* Terminal Body & Scrollable Area */}
      <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-3 font-mono text-xs sm:text-[13px] leading-relaxed custom-repo-scroll max-h-[420px] sm:max-h-[460px]">
        {history.map((item) => {
          if (item.type === "command") {
            return (
              <div key={item.id} className="flex items-start gap-2 text-white">
                <span className="text-[#7c5cff] font-bold shrink-0">
                  mohit@portfolio:~$
                </span>
                <span className="text-white font-medium break-all">{item.content}</span>
              </div>
            );
          }

          if (item.type === "system") {
            return (
              <pre
                key={item.id}
                className="whitespace-pre-wrap font-mono text-neutral-400 bg-transparent p-0 m-0 border-none select-text"
              >
                {item.content}
              </pre>
            );
          }

          return (
            <pre
              key={item.id}
              className="whitespace-pre-wrap font-mono text-neutral-200 bg-[#0e0e0e]/70 p-3 rounded-lg border border-neutral-800/60 m-0 select-text overflow-x-auto leading-relaxed"
            >
              {item.content}
            </pre>
          );
        })}

        {/* Active Input Line */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-[#7c5cff] font-bold shrink-0">
            mohit@portfolio:~$
          </span>
          <div className="relative flex-1 flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              aria-label="Terminal input prompt"
              className="w-full bg-transparent border-none outline-none text-white font-mono text-xs sm:text-[13px] p-0 m-0 focus:ring-0 caret-[#7c5cff]"
              placeholder={history.length === 1 ? "type 'help' or command..." : ""}
            />
          </div>
        </div>
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Quick Action Shortcuts / Footer */}
      <div className="px-4 py-2 bg-[#0d0d0d] border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-neutral-500 select-none">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="text-neutral-500">Quick:</span>
          {["help", "about", "skills", "projects", "commits"].map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (!isLoading) {
                  processCommand(cmd);
                  handleFocus();
                }
              }}
              className="px-2 py-0.5 rounded bg-neutral-900/90 border border-neutral-800 hover:border-[#7c5cff]/60 hover:text-white text-neutral-400 font-mono transition-colors cursor-pointer text-[10px] sm:text-[11px]"
            >
              {cmd}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 text-[10px] text-neutral-500 font-mono">
          <span>↑/↓ history</span>
          <CornerDownLeft className="w-2.5 h-2.5 ml-1 text-neutral-600" />
        </div>
      </div>
    </div>
  );
}
