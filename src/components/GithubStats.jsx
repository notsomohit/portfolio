import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, GitFork, BookOpen, FolderGit2, ArrowUpRight, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import { GithubIcon } from "./Icons";
import { fetchActualPinnedRepos, DEFAULT_PINNED_REPOS } from "../data/githubPinned";

gsap.registerPlugin(ScrollTrigger);

const fallbackUser = {
  login: "notsomohit",
  name: "Mohit",
  bio: "Full-stack developer building clean, functional systems & agentic AI architectures.",
  public_repos: 18,
  html_url: "https://github.com/notsomohit",
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
  "Jupyter Notebook": "#DA5B0B",
  Default: "#8B5CF6",
};

export default function GithubStats() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState(DEFAULT_PINNED_REPOS);
  const [loading, setLoading] = useState(true);

  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const statsRowRef = useRef(null);
  const chartCardRef = useRef(null);
  const reposScrollRef = useRef(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const fetchGithubData = async () => {
    setLoading(true);
    try {
      const userPromise = fetch("https://api.github.com/users/notsomohit")
        .then((r) => (r.ok ? r.json() : fallbackUser))
        .catch(() => fallbackUser);

      const pinnedPromise = fetchActualPinnedRepos();

      const [userData, pinnedData] = await Promise.all([userPromise, pinnedPromise]);
      setUser(userData);
      setRepos(pinnedData && pinnedData.length > 0 ? pinnedData : DEFAULT_PINNED_REPOS);
    } catch {
      setUser(fallbackUser);
      setRepos(DEFAULT_PINNED_REPOS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGithubData();
  }, []);

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
    const walk = (x - startX.current) * 1.5;
    reposScrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const scrollByAmount = (direction) => {
    if (reposScrollRef.current) {
      const scrollOffset = direction === "left" ? -320 : 320;
      reposScrollRef.current.scrollBy({ left: scrollOffset, behavior: "smooth" });
    }
  };

  return (
    <section
      id="github"
      ref={containerRef}
      className="relative px-5 sm:px-10 lg:px-20 py-16 sm:py-20 md:py-24 lg:py-28 bg-[#0A0A0A] border-t border-neutral-900 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="mb-10 sm:mb-14">
          <div className="flex items-baseline justify-between flex-wrap gap-4 mb-3 sm:mb-4">
            <div className="flex items-baseline gap-3 sm:gap-6">
              <span className="font-mono text-sm sm:text-lg font-bold text-[#8B5CF6]">
                04
              </span>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight">
                ACTIVITY
              </h2>
            </div>

            <a
              href="https://github.com/notsomohit"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs sm:text-sm text-neutral-400 hover:text-white flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#141414] border border-neutral-800 hover:border-neutral-700 transition-colors group"
            >
              <GithubIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8B5CF6]" />
              <span>@notsomohit</span>
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
          <div className="w-full h-[1px] bg-neutral-800" />
        </div>

        <div className="mb-8 sm:mb-10">
          <h3 className="font-display text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight mb-2 sm:mb-3">
            OPEN SOURCE & PINNED REPOS
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-neutral-400 font-normal max-w-2xl leading-relaxed">
            Real-time activity streamed from GitHub. Pinned repositories, live contribution heatmap, and open source projects.
          </p>
        </div>

        <div
          ref={statsRowRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-6 mb-8"
        >
          <div className="p-4 sm:p-6 rounded-2xl bg-[#141414] border border-neutral-800/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-neutral-500 mb-2 sm:mb-3">
              <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider">PUBLIC REPOSITORIES</span>
              <FolderGit2 className="w-4 h-4 text-[#8B5CF6]" />
            </div>
            {loading ? (
              <div className="h-7 w-16 bg-neutral-800 animate-pulse rounded" />
            ) : (
              <span className="font-display text-2xl sm:text-4xl font-black text-white">
                {user?.public_repos ?? fallbackUser.public_repos}
              </span>
            )}
          </div>

          <div className="sm:col-span-2 p-4 sm:p-6 rounded-2xl bg-[#141414] border border-neutral-800/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-neutral-500 mb-2">
              <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider">DEV STATUS</span>
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

        <div
          ref={chartCardRef}
          className="p-4 sm:p-6 lg:p-8 rounded-2xl bg-[#141414] border border-neutral-800/80 mb-8 sm:mb-10 overflow-hidden relative shadow-xl"
        >
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="font-mono text-xs font-bold text-[#8B5CF6]">CONTRIBUTIONS</span>
              <span className="text-neutral-600 font-mono text-xs">//</span>
              <span className="font-mono text-xs text-neutral-400">ANNUAL HEATMAP</span>
            </div>
            <span className="font-mono text-[10px] sm:text-[11px] text-neutral-500 uppercase tracking-widest hidden sm:inline">
              PURPLE THEME SYNC
            </span>
          </div>

          <div className="w-full overflow-x-auto pb-2 flex justify-center custom-terminal-scroll">
            <img
              src="https://ghchart.rshah.org/8b5cf6/notsomohit"
              alt="Mohit's GitHub Contribution Heatmap"
              className="min-w-[600px] sm:min-w-[650px] w-full max-w-4xl h-auto opacity-90 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
          </div>

          <div className="absolute top-2.5 left-2.5 w-2 h-2 border-t border-l border-neutral-700 pointer-events-none" />
          <div className="absolute top-2.5 right-2.5 w-2 h-2 border-t border-r border-neutral-700 pointer-events-none" />
          <div className="absolute bottom-2.5 left-2.5 w-2 h-2 border-b border-l border-neutral-700 pointer-events-none" />
          <div className="absolute bottom-2.5 right-2.5 w-2 h-2 border-b border-r border-neutral-700 pointer-events-none" />
        </div>

        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="font-mono text-xs font-bold text-[#8B5CF6]">PINNED REPOSITORIES</span>
            <span className="text-neutral-600 font-mono text-xs">//</span>
            <span className="font-mono text-xs text-neutral-400 hidden sm:inline">LIVE SYNCED FROM GITHUB</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={fetchGithubData}
              className="inline-flex items-center gap-1 font-mono text-xs text-neutral-400 hover:text-white transition-colors mr-1 sm:mr-2"
              title="Refresh from GitHub"
            >
              <RefreshCw className={`w-3 h-3 text-[#8B5CF6] ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Sync</span>
            </button>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scrollByAmount("left")}
                aria-label="Scroll left"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#141414] border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <button
                onClick={() => scrollByAmount("right")}
                aria-label="Scroll right"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#141414] border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={reposScrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 custom-repo-scroll cursor-grab active:cursor-grabbing scroll-smooth"
        >
          {repos.map((repo) => {
            const langColor =
              languageColors[repo.language] || languageColors.Default;

            return (
              <a
                key={repo.name}
                href={repo.url || `https://github.com/notsomohit/${repo.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[260px] sm:min-w-[320px] md:min-w-[360px] max-w-[380px] shrink-0 p-5 sm:p-6 rounded-2xl bg-[#141414] border border-neutral-800/80 hover:border-neutral-600 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:shadow-xl hover:-translate-y-0.5 relative"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-500 group-hover:text-[#8B5CF6] transition-colors shrink-0" />
                      <h4 className="font-mono text-sm sm:text-base font-bold text-white group-hover:text-[#8B5CF6] transition-colors truncate">
                        {repo.name}
                      </h4>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#8B5CF6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  </div>

                  <p className="text-neutral-400 text-xs sm:text-sm font-normal line-clamp-2 sm:line-clamp-3 leading-relaxed mb-3 sm:mb-4">
                    {repo.description || "No description provided."}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-800/60 flex items-center justify-between text-[11px] sm:text-xs font-mono text-neutral-400">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full"
                      style={{ backgroundColor: langColor }}
                    />
                    <span>{repo.language || "Code"}</span>
                  </div>

                  <div className="flex items-center gap-3 text-neutral-400">
                    {repo.forks > 0 && (
                      <div className="flex items-center gap-1">
                        <GitFork className="w-3 h-3" />
                        <span>{repo.forks}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 group-hover:text-amber-400 transition-colors">
                      <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>{repo.stars ?? 0}</span>
                    </div>
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
