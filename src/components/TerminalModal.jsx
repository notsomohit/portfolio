import React, { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, X } from "lucide-react";
import { skillClusters } from "../data/skillsData";
import { fetchActualPinnedRepos, DEFAULT_PINNED_REPOS } from "../data/githubPinned";
import { fetchGithubActivityStats } from "../data/githubStats";

const EMAIL = "mohitascend07@gmail.com";
const GITHUB_URL = "https://github.com/notsomohit";
const LINKEDIN_URL = "https://www.linkedin.com/in/notsomohit/";

export default function TerminalModal({ isOpen, onClose }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    {
      id: "init",
      type: "system",
      content: "Mohit Portfolio Terminal [Version 1.0.0]\nType 'help' for available commands or 'exit' to close.\n",
    },
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef(null);
  const terminalEndRef = useRef(null);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setInput("");
    }
  }, [isOpen]);

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

  const handleCommand = async (rawInput) => {
    const cmd = rawInput.trim();
    if (!cmd) return;

    setHistory((prev) => [...prev, { id: Math.random().toString(), type: "command", content: cmd }]);
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
    setInput("");

    const lowerCmd = cmd.toLowerCase();

    if (lowerCmd === "clear") {
      setHistory([]);
      return;
    }

    if (lowerCmd === "exit") {
      onClose();
      return;
    }

    if (lowerCmd === "help") {
      const helpText = `Available commands:
  help        - Displays this command reference
  about       - Who I am and what I do
  skills      - Tech stack, frameworks, tools & security
  stats       - GitHub lifetime commits, active streak & records
  streak      - Current & longest GitHub daily streak
  projects    - Pinned GitHub repositories dynamically synced
  commits     - Fetch recent public commits LIVE from GitHub API
  contact     - Direct contact channels
  email       - Displays email address
  github      - GitHub profile URL
  linkedin    - LinkedIn profile URL
  socials     - All social & contact links
  whoami      - Prints Mohit's professional bio
  date        - Current system date & time
  clear       - Clears terminal output history
  exit        - Closes this terminal window`;
      setHistory((prev) => [...prev, { id: Math.random().toString(), type: "output", content: helpText }]);
      return;
    }

    if (lowerCmd === "about") {
      const aboutText = `Mohit // Full-Stack Developer

• Bio: Full-stack developer who enjoys building clean, functional products end-to-end.
• Focus: Currently going deep on AI and agentic AI systems, figuring out how autonomous agents actually get built.
• Passion: Passionate about system architecture & AI tools.`;
      setHistory((prev) => [...prev, { id: Math.random().toString(), type: "output", content: aboutText }]);
      return;
    }

    if (lowerCmd === "skills") {
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

    if (lowerCmd === "projects") {
      setIsLoading(true);
      setHistory((prev) => [
        ...prev,
        {
          id: "modal-loading-projects",
          type: "output",
          content: "Fetching actual pinned GitHub repositories for @notsomohit ...",
        },
      ]);

      const pinnedList = await fetchActualPinnedRepos();
      const reposToDisplay = pinnedList && pinnedList.length > 0 ? pinnedList : DEFAULT_PINNED_REPOS;

      const formattedProjects = reposToDisplay.map((p) => {
        return `• ${p.name} [${p.language || "Code"} ★${p.stars ?? 0}]
  Description: ${p.description || "GitHub repository"}
  URL: ${p.url || `https://github.com/notsomohit/${p.name}`}`;
      }).join("\n\n");

      const projectsText = `Actual GitHub Pinned Repositories:\n\n${formattedProjects}`;

      setHistory((prev) => [
        ...prev.filter((item) => item.id !== "modal-loading-projects"),
        { id: Math.random().toString(), type: "output", content: projectsText },
      ]);
      setIsLoading(false);
      return;
    }

    if (lowerCmd === "stats") {
      setIsLoading(true);
      setHistory((prev) => [
        ...prev,
        {
          id: "modal-loading-stats",
          type: "output",
          content: "Fetching GitHub metrics & streak analytics for @notsomohit ...",
        },
      ]);

      const ghStats = await fetchGithubActivityStats();
      const statsText = `GitHub Analytics & Activity for @notsomohit:
  • Total Commits / Contributions : ${ghStats.totalCommits}+
  • Current Streak               : ${ghStats.currentStreak} Days (Active)
  • Longest Streak               : ${ghStats.longestStreak} Days (Record)
  • Public Repositories          : ${ghStats.publicRepos}
  • Status                       : ${ghStats.bio}`;

      setHistory((prev) => [
        ...prev.filter((item) => item.id !== "modal-loading-stats"),
        { id: Math.random().toString(), type: "output", content: statsText },
      ]);
      setIsLoading(false);
      return;
    }

    if (lowerCmd === "streak") {
      setIsLoading(true);
      setHistory((prev) => [
        ...prev,
        {
          id: "modal-loading-streak",
          type: "output",
          content: "Calculating current GitHub contribution streak ...",
        },
      ]);

      const ghStats = await fetchGithubActivityStats();
      const streakText = `GitHub Contribution Streak:
  🔥 Current Streak : ${ghStats.currentStreak} Days (Daily consistency)
  🏆 Longest Streak : ${ghStats.longestStreak} Days (All-time personal best)
  📊 Total Commits  : ${ghStats.totalCommits}+ contributions`;

      setHistory((prev) => [
        ...prev.filter((item) => item.id !== "modal-loading-streak"),
        { id: Math.random().toString(), type: "output", content: streakText },
      ]);
      setIsLoading(false);
      return;
    }

    if (lowerCmd === "commits") {
      setIsLoading(true);
      setHistory((prev) => [
        ...prev,
        {
          id: "modal-loading-commits",
          type: "output",
          content: "Fetching live public commits from https://api.github.com/users/notsomohit/events/public ...",
        },
      ]);

      const commitsText = await fetchLiveCommits();

      setHistory((prev) => [
        ...prev.filter((item) => item.id !== "modal-loading-commits"),
        { id: Math.random().toString(), type: "output", content: commitsText },
      ]);
      setIsLoading(false);
      return;
    }

    if (lowerCmd === "contact") {
      const contactText = `Contact Channels:
  • Email    : ${EMAIL}
  • GitHub   : ${GITHUB_URL}
  • LinkedIn : ${LINKEDIN_URL}`;
      setHistory((prev) => [...prev, { id: Math.random().toString(), type: "output", content: contactText }]);
      return;
    }

    if (lowerCmd === "email") {
      setHistory((prev) => [...prev, { id: Math.random().toString(), type: "output", content: EMAIL }]);
      return;
    }

    if (lowerCmd === "github") {
      setHistory((prev) => [...prev, { id: Math.random().toString(), type: "output", content: GITHUB_URL }]);
      return;
    }

    if (lowerCmd === "linkedin") {
      setHistory((prev) => [...prev, { id: Math.random().toString(), type: "output", content: LINKEDIN_URL }]);
      return;
    }

    if (lowerCmd === "socials") {
      const socialsText = `Social & Contact Links:
  • GitHub   : ${GITHUB_URL}
  • LinkedIn : ${LINKEDIN_URL}
  • Email    : ${EMAIL}`;
      setHistory((prev) => [...prev, { id: Math.random().toString(), type: "output", content: socialsText }]);
      return;
    }

    if (lowerCmd === "whoami") {
      const whoamiText = `user: guest@portfolio
identity: Mohit — Full-stack developer building clean, functional systems & agentic AI architectures.`;
      setHistory((prev) => [...prev, { id: Math.random().toString(), type: "output", content: whoamiText }]);
      return;
    }

    if (lowerCmd === "date") {
      const dateText = new Date().toString();
      setHistory((prev) => [...prev, { id: Math.random().toString(), type: "output", content: dateText }]);
      return;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        type: "output",
        content: `command not found: "${cmd}". Type 'help' for available commands.`,
      },
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!isLoading) {
        handleCommand(input);
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#0a0a0a] border border-neutral-800 rounded-xl shadow-2xl overflow-hidden flex flex-col font-mono text-sm select-text"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-10 px-4 bg-[#111111] border-b border-neutral-800/80 flex items-center justify-between shrink-0 select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] hover:opacity-80 cursor-pointer" onClick={onClose} />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <span className="ml-2 text-xs text-neutral-400 font-mono hidden sm:inline">
              mohit@portfolio: ~/contact
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-neutral-500 font-mono hidden sm:inline">
              [ESC to close]
            </span>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white p-1 transition-colors"
              aria-label="Close terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          className="p-4 sm:p-6 max-h-[60vh] sm:max-h-[480px] overflow-y-auto space-y-3 font-mono text-xs sm:text-sm text-neutral-300 leading-relaxed custom-repo-scroll"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((item) => {
            if (item.type === "command") {
              return (
                <div key={item.id} className="flex items-center gap-2 text-white">
                  <span className="text-[#7c5cff] font-bold shrink-0">
                    mohit@portfolio:~$
                  </span>
                  <span>{item.content}</span>
                </div>
              );
            }
            if (item.type === "system") {
              return (
                <pre
                  key={item.id}
                  className="whitespace-pre-wrap font-mono text-neutral-400 bg-transparent p-0 m-0 border-none"
                >
                  {item.content}
                </pre>
              );
            }
            return (
              <pre
                key={item.id}
                className="whitespace-pre-wrap font-mono text-neutral-200 bg-[#0e0e0e]/70 p-3 rounded-lg border border-neutral-800/60 m-0 overflow-x-auto leading-relaxed"
              >
                {item.content}
              </pre>
            );
          })}

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
                className="w-full bg-transparent border-none outline-none text-white font-mono text-xs sm:text-sm p-0 m-0 focus:ring-0 caret-[#7c5cff]"
              />
            </div>
          </div>
          <div ref={terminalEndRef} />
        </div>

        <div className="px-4 py-2.5 bg-[#0d0d0d] border-t border-neutral-800/60 flex flex-wrap items-center justify-between gap-2 text-[11px] text-neutral-500 select-none">
          <div className="flex flex-wrap items-center gap-2">
            <span>Try:</span>
            {["help", "about", "skills", "projects", "commits"].map((cmd) => (
              <button
                key={cmd}
                onClick={() => {
                  if (!isLoading) handleCommand(cmd);
                }}
                className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 hover:border-[#7c5cff]/60 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                {cmd}
              </button>
            ))}
          </div>
          <span className="hidden sm:inline text-neutral-600">
            press Enter ↵
          </span>
        </div>
      </div>
    </div>
  );
}

export function TerminalCornerHint({ onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="fixed bottom-5 right-5 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#141414] border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-colors focus:outline-none cursor-pointer"
      title="Terminal (Press ` or Ctrl+K)"
      aria-label="Open CLI Terminal"
    >
      <TerminalIcon className="w-4 h-4" />
    </button>
  );
}
