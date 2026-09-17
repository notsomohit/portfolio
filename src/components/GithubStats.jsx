import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, BookOpen, FolderGit2, ArrowUpRight, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import { GithubIcon } from "./Icons";

gsap.registerPlugin(ScrollTrigger);

/**
 * PINNED REPOSITORIES LIST
 * Replace or customize with your exact GitHub repository names.
 * For each repo, live star count, language, and description will be fetched.
 */
export const PINNED_REPOS = [
  "portfolio",
  "agentic-workflow-engine",
  "next-fullstack-starter",
  "cloud-metrics-dashboard",
];

// Fallback user data in case GitHub API rate limits unauthenticated requests
const fallbackUser = {
  login: "notsomohit",
  name: "Mohit",
  bio: "Full-stack developer building clean, functional systems & agentic AI architectures.",
  public_repos: 18,
  html_url: "https://github.com/notsomohit",
};

// Fallback repo data
const fallbackReposMap = {
  portfolio: {
    id: 1,
    name: "portfolio",
    description: "Personal minimalist developer portfolio with GSAP kinetic animations & dark aesthetic.",
    language: "JavaScript",
    stargazers_count: 5,
    updated_at: "2026-03-10T12:00:00Z",
    html_url: "https://github.com/notsomohit/portfolio",
  },
  "agentic-workflow-engine": {
    id: 2,
    name: "agentic-workflow-engine",
    description: "Autonomous LLM agent coordination framework with tool use and memory management.",
    language: "Python",
    stargazers_count: 8,
    updated_at: "2026-03-05T14:30:00Z",
    html_url: "https://github.com/notsomohit",
  },
  "next-fullstack-starter": {
    id: 3,
    name: "next-fullstack-starter",
    description: "Production-ready boilerplate featuring Next.js, TypeScript, Tailwind, and Auth.",
    language: "TypeScript",
    stargazers_count: 4,
    updated_at: "2026-02-28T09:15:00Z",
    html_url: "https://github.com/notsomohit",
  },
  "cloud-metrics-dashboard": {
    id: 4,
    name: "cloud-metrics-dashboard",
    description: "Real-time system telemetry and performance monitor with custom reactive charts.",
    language: "JavaScript",
    stargazers_count: 3,
    updated_at: "2026-02-20T18:00:00Z",
    html_url: "https://github.com/notsomohit",
  },
};

const languageColors = {
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  Python: "#3776AB",
  Java: "#E76F00",
  HTML: "#E34F26",
  CSS: "#1572B6",
  Shell: "#89E051",
  Rust: "#DEA584",
  Go: "#00ADD8",
  Default: "#8B5CF6",
};

export default function GithubStats() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);

  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const statsRowRef = useRef(null);
  const chartCardRef = useRef(null);
  const reposScrollRef = useRef(null);

  // Drag-to-scroll state for desktop mouse users
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const fetchGithubData = async () => {
    setLoading(true);
    try {
      // 1. Fetch user profile (for public repo count and bio)
      const userRes = await fetch("https://api.github.com/users/notsomohit");
      if (userRes.ok) {
        const userData = await userRes.json();
        setUser(userData);
      } else {
        setUser(fallbackUser);
      }

      // 2. Fetch each pinned repository individually
      const repoPromises = PINNED_REPOS.map(async (repoName) => {
        try {
          const res = await fetch(`https://api.github.com/repos/notsomohit/${repoName}`);
          if (res.ok) {
            return await res.json();
          }
        } catch (e) {
          // fallback on error
        }

        // Return matched fallback or generated placeholder
        return (
          fallbackReposMap[repoName] || {
            id: repoName,
            name: repoName,
            description: "Repository source code and documentation available on GitHub.",
            language: "JavaScript",
            stargazers_count: 0,
            updated_at: new Date().toISOString(),
            html_url: `https://github.com/notsomohit/${repoName}`,
          }
        );
      });

      const fetchedRepos = await Promise.all(repoPromises);
      setRepos(fetchedRepos);
      setIsFallback(false);
    } catch (err) {
      console.warn("Using fallback GitHub stats due to API limit:", err.message);
      setUser(fallbackUser);
      setRepos(
        PINNED_REPOS.map((name) => fallbackReposMap[name] || {
          id: name,
          name,
          description: "Repository description and source code.",
          language: "JavaScript",
          stargazers_count: 0,
          updated_at: new Date().toISOString(),
          html_url: `https://github.com/notsomohit/${name}`,
        })
      );
      setIsFallback(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGithubData();
  }, []);

  // GSAP ScrollTrigger Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (statsRowRef.current) {
        gsap.fromTo(
          statsRowRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsRowRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (chartCardRef.current) {
        gsap.fromTo(
          chartCardRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: chartCardRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (reposScrollRef.current) {
        gsap.fromTo(
          reposScrollRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: reposScrollRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [loading]);

  // Drag-to-scroll handlers
  const handleMouseDown = (e) => {
    if (!reposScrollRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - reposScrollRef.current.offsetLeft;
    scrollLeft.current = reposScrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !reposScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - reposScrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Drag scroll multiplier
    reposScrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const scrollByAmount = (direction) => {
    if (reposScrollRef.current) {
      const scrollOffset = direction === "left" ? -380 : 380;
      reposScrollRef.current.scrollBy({ left: scrollOffset, behavior: "smooth" });
    }
  };

  return (
    <section
      id="github"
      ref={containerRef}
      className="relative px-6 sm:px-12 lg:px-20 py-32 sm:py-40 lg:py-48 bg-[#0A0A0A] border-t border-neutral-900 select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="mb-16 sm:mb-20">
          <div className="flex items-baseline justify-between flex-wrap gap-4 mb-4">
            <div className="flex items-baseline gap-4 sm:gap-6">
              <span className="font-mono text-base sm:text-lg font-bold text-[#8B5CF6]">
                04
              </span>
              <h2 className="font-display text-[clamp(2.75rem,8vw,8rem)] font-black text-white tracking-tight">
                ACTIVITY
              </h2>
            </div>

            <a
              href="https://github.com/notsomohit"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs sm:text-sm text-neutral-400 hover:text-white flex items-center gap-2 px-4 py-2 rounded-full bg-[#141414] border border-neutral-800 hover:border-neutral-700 transition-colors group"
            >
              <GithubIcon className="w-4 h-4 text-[#8B5CF6]" />
              <span>@notsomohit</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
          <div className="w-full h-[1px] bg-neutral-800" />
        </div>

        {/* Section Headline */}
        <div className="mb-12">
          <h3 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            OPEN SOURCE & PINNED REPOS
          </h3>
          <p className="text-base sm:text-xl text-neutral-400 font-normal max-w-2xl leading-relaxed">
            Real-time activity streamed from GitHub. Pinned repositories, live contribution heatmap, and open source projects.
          </p>
        </div>

        {/* Stats Row without Followers Count */}
        <div
          ref={statsRowRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8"
        >
          {/* Public Repositories Stat */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#141414] border border-neutral-800/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-neutral-500 mb-3">
              <span className="font-mono text-xs uppercase tracking-wider">PUBLIC REPOSITORIES</span>
              <FolderGit2 className="w-4 h-4 text-[#8B5CF6]" />
            </div>
            {loading ? (
              <div className="h-8 w-16 bg-neutral-800 animate-pulse rounded" />
            ) : (
              <span className="font-display text-2xl sm:text-4xl font-black text-white">
                {user?.public_repos ?? fallbackUser.public_repos}
              </span>
            )}
          </div>

          {/* Bio / Developer Status Badge */}
          <div className="sm:col-span-2 p-5 sm:p-6 rounded-2xl bg-[#141414] border border-neutral-800/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-neutral-500 mb-2">
              <span className="font-mono text-xs uppercase tracking-wider">DEV STATUS</span>
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LIVE SYNCED
              </span>
            </div>
            <p className="font-mono text-xs sm:text-sm text-neutral-300 truncate">
              {user?.bio || fallbackUser.bio}
            </p>
          </div>
        </div>

        {/* Purple Contribution Heatmap Card (Preserved as-is) */}
        <div
          ref={chartCardRef}
          className="p-6 sm:p-8 rounded-2xl bg-[#141414] border border-neutral-800/80 mb-12 overflow-hidden relative shadow-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-[#8B5CF6]">CONTRIBUTIONS</span>
              <span className="text-neutral-600 font-mono text-xs">//</span>
              <span className="font-mono text-xs text-neutral-400">ANNUAL HEATMAP</span>
            </div>
            <span className="font-mono text-[11px] text-neutral-500 uppercase tracking-widest hidden sm:inline">
              PURPLE THEME SYNC
            </span>
          </div>

          <div className="w-full overflow-x-auto pb-2 flex justify-center custom-terminal-scroll">
            <img
              src="https://ghchart.rshah.org/8b5cf6/notsomohit"
              alt="Mohit's GitHub Contribution Heatmap"
              className="min-w-[650px] w-full max-w-4xl h-auto opacity-90 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
          </div>

          {/* Corner accents */}
          <div className="absolute top-2.5 left-2.5 w-2 h-2 border-t border-l border-neutral-700 pointer-events-none" />
          <div className="absolute top-2.5 right-2.5 w-2 h-2 border-t border-r border-neutral-700 pointer-events-none" />
          <div className="absolute bottom-2.5 left-2.5 w-2 h-2 border-b border-l border-neutral-700 pointer-events-none" />
          <div className="absolute bottom-2.5 right-2.5 w-2 h-2 border-b border-r border-neutral-700 pointer-events-none" />
        </div>

        {/* Pinned Repositories Header with Horizontal Scroll Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-[#8B5CF6]">PINNED REPOSITORIES</span>
            <span className="text-neutral-600 font-mono text-xs">//</span>
            <span className="font-mono text-xs text-neutral-400 hidden sm:inline">SWIPE OR DRAG HORIZONTALLY</span>
          </div>

          <div className="flex items-center gap-3">
            {isFallback && (
              <button
                onClick={fetchGithubData}
                className="inline-flex items-center gap-1.5 font-mono text-xs text-neutral-400 hover:text-white transition-colors mr-2"
                title="Refresh from GitHub"
              >
                <RefreshCw className="w-3 h-3 text-[#8B5CF6]" />
                <span className="hidden sm:inline">Retry Sync</span>
              </button>
            )}

            {/* Manual arrow buttons for convenient scroll */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scrollByAmount("left")}
                aria-label="Scroll left"
                className="w-8 h-8 rounded-full bg-[#141414] border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollByAmount("right")}
                aria-label="Scroll right"
                className="w-8 h-8 rounded-full bg-[#141414] border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontally Scrollable Repositories Row */}
        <div
          ref={reposScrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="flex gap-6 overflow-x-auto pb-6 pt-1 custom-repo-scroll cursor-grab active:cursor-grabbing scroll-smooth"
        >
          {loading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="min-w-[280px] sm:min-w-[340px] md:min-w-[380px] max-w-[400px] shrink-0 p-6 rounded-2xl bg-[#141414] border border-neutral-800/80 animate-pulse flex flex-col justify-between h-[200px]"
                >
                  <div>
                    <div className="h-5 w-3/4 bg-neutral-800 rounded mb-3" />
                    <div className="h-3 w-full bg-neutral-800/70 rounded mb-2" />
                    <div className="h-3 w-2/3 bg-neutral-800/70 rounded" />
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-neutral-800/40">
                    <div className="h-3 w-16 bg-neutral-800 rounded" />
                    <div className="h-3 w-10 bg-neutral-800 rounded" />
                  </div>
                </div>
              ))
            : repos.map((repo) => {
                const langColor =
                  languageColors[repo.language] || languageColors.Default;

                return (
                  <a
                    key={repo.id || repo.name}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-w-[280px] sm:min-w-[340px] md:min-w-[380px] max-w-[400px] shrink-0 p-6 rounded-2xl bg-[#141414] border border-neutral-800/80 hover:border-neutral-600 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:shadow-xl hover:-translate-y-1 relative"
                  >
                    <div>
                      {/* Repo Header & External Arrow */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <BookOpen className="w-4 h-4 text-neutral-500 group-hover:text-[#8B5CF6] transition-colors shrink-0" />
                          <h4 className="font-mono text-base font-bold text-white group-hover:text-[#8B5CF6] transition-colors truncate">
                            {repo.name}
                          </h4>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-[#8B5CF6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                      </div>

                      {/* Description */}
                      <p className="text-neutral-400 text-xs sm:text-sm font-normal line-clamp-3 leading-relaxed mb-4">
                        {repo.description || "No description provided."}
                      </p>
                    </div>

                    {/* Metadata Footer */}
                    <div className="pt-4 border-t border-neutral-800/60 flex items-center justify-between text-xs font-mono text-neutral-400">
                      {/* Language Indicator */}
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: langColor }}
                        />
                        <span>{repo.language || "Code"}</span>
                      </div>

                      {/* Star Count */}
                      <div className="flex items-center gap-1 text-neutral-400 group-hover:text-amber-400 transition-colors">
                        <Star className="w-3.5 h-3.5" />
                        <span>{repo.stargazers_count ?? 0}</span>
                      </div>
                    </div>
                  </a>
                );
              })}
        </div>
      </div>
    </section>
  );
}

