import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  GitCommit, 
  Flame, 
  Trophy, 
  FolderGit2, 
  ArrowUpRight, 
  RefreshCw, 
  Activity, 
  Calendar,
  Sparkles
} from "lucide-react";
import { GithubIcon } from "./Icons";
import { fetchGithubActivityStats } from "../data/githubStats";

gsap.registerPlugin(ScrollTrigger);

export default function GithubStats() {
  const [stats, setStats] = useState({
    totalCommits: 287,
    currentStreak: 7,
    longestStreak: 7,
    publicRepos: 18,
    yearBreakdown: { "2026": 191, "2025": 96 },
    bio: "Full-stack developer building clean, functional systems & agentic AI architectures.",
    lastActive: "Today",
  });
  const [loading, setLoading] = useState(true);

  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const statsRowRef = useRef(null);
  const chartCardRef = useRef(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchGithubActivityStats();
      if (data) {
        setStats(data);
      }
    } catch (err) {
      console.warn("Failed to load GitHub stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
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
    }, containerRef);

    return () => ctx.revert();
  }, [loading]);

  const yearKeys = stats.yearBreakdown ? Object.keys(stats.yearBreakdown).sort((a, b) => b - a) : [];

  return (
    <section
      id="github"
      ref={containerRef}
      className="relative px-5 sm:px-10 lg:px-20 py-16 sm:py-20 md:py-24 lg:py-28 bg-[#0A0A0A] border-t border-neutral-900 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
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

        {/* Title & Description */}
        <div className="mb-8 sm:mb-10">
          <h3 className="font-display text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight mb-2 sm:mb-3">
            GITHUB COMMITS & STREAK
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-neutral-400 font-normal max-w-2xl leading-relaxed">
            Real-time activity stream from GitHub. Total contributions, daily commit streaks, and live activity heatmap.
          </p>
        </div>

        {/* 4 Stats Grid: Commits, Current Streak, Longest Streak, Repositories */}
        <div
          ref={statsRowRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10"
        >
          {/* Card 1: Total Commits */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#141414] border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col justify-between group">
            <div className="flex items-center justify-between text-neutral-400 mb-3">
              <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-neutral-400">
                TOTAL COMMITS
              </span>
              <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#8B5CF6]">
                <GitCommit className="w-4 h-4" />
              </div>
            </div>

            <div className="my-1">
              {loading ? (
                <div className="h-10 w-24 bg-neutral-800 animate-pulse rounded my-1" />
              ) : (
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                    {stats.totalCommits}
                  </span>
                  <span className="font-mono text-xs sm:text-sm text-[#8B5CF6] font-semibold">+</span>
                </div>
              )}
            </div>

            <div className="pt-3 mt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px] sm:text-xs font-mono text-neutral-400">
              <span className="text-neutral-400">Lifetime contributions</span>
              <span className="text-[#8B5CF6] font-semibold">Synced</span>
            </div>
          </div>

          {/* Card 2: Current Streak */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#141414] border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col justify-between group">
            <div className="flex items-center justify-between text-neutral-400 mb-3">
              <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-neutral-400">
                CURRENT STREAK
              </span>
              <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400">
                <Flame className="w-4 h-4" />
              </div>
            </div>

            <div className="my-1">
              {loading ? (
                <div className="h-10 w-24 bg-neutral-800 animate-pulse rounded my-1" />
              ) : (
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                    {stats.currentStreak}
                  </span>
                  <span className="font-mono text-xs sm:text-sm text-amber-400 font-bold uppercase">
                    {stats.currentStreak === 1 ? "Day" : "Days"}
                  </span>
                </div>
              )}
            </div>

            <div className="pt-3 mt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px] sm:text-xs font-mono">
              <span className="text-neutral-400">Daily consistency</span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                ACTIVE
              </span>
            </div>
          </div>

          {/* Card 3: Longest Streak */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#141414] border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col justify-between group">
            <div className="flex items-center justify-between text-neutral-400 mb-3">
              <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-neutral-400">
                LONGEST STREAK
              </span>
              <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-yellow-400">
                <Trophy className="w-4 h-4" />
              </div>
            </div>

            <div className="my-1">
              {loading ? (
                <div className="h-10 w-24 bg-neutral-800 animate-pulse rounded my-1" />
              ) : (
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                    {stats.longestStreak}
                  </span>
                  <span className="font-mono text-xs sm:text-sm text-yellow-400 font-bold uppercase">
                    {stats.longestStreak === 1 ? "Day" : "Days"}
                  </span>
                </div>
              )}
            </div>

            <div className="pt-3 mt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px] sm:text-xs font-mono text-neutral-400">
              <span className="text-neutral-400">Personal record</span>
              <span className="text-neutral-300 font-semibold">Max Continuous</span>
            </div>
          </div>

          {/* Card 4: Public Repositories */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#141414] border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col justify-between group">
            <div className="flex items-center justify-between text-neutral-400 mb-3">
              <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-neutral-400">
                PUBLIC REPOS
              </span>
              <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-indigo-400">
                <FolderGit2 className="w-4 h-4" />
              </div>
            </div>

            <div className="my-1">
              {loading ? (
                <div className="h-10 w-24 bg-neutral-800 animate-pulse rounded my-1" />
              ) : (
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                    {stats.publicRepos}
                  </span>
                  <span className="font-mono text-xs sm:text-sm text-neutral-300 font-semibold">Repos</span>
                </div>
              )}
            </div>

            <div className="pt-3 mt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px] sm:text-xs font-mono text-neutral-400">
              <span className="text-neutral-400">Open source code</span>
              <span className="text-neutral-300 font-semibold">GitHub</span>
            </div>
          </div>
        </div>

        {/* Heatmap Card */}
        <div
          ref={chartCardRef}
          className="p-5 sm:p-7 lg:p-8 rounded-2xl bg-[#141414] border border-neutral-800 overflow-hidden relative"
        >
          <div className="flex items-center justify-between flex-wrap gap-3 mb-5 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="font-mono text-xs font-bold text-[#8B5CF6]">CONTRIBUTIONS</span>
              <span className="text-neutral-600 font-mono text-xs">//</span>
              <span className="font-mono text-xs text-neutral-400">ANNUAL HEATMAP</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={loadData}
                disabled={loading}
                className="inline-flex items-center gap-1.5 font-mono text-xs text-neutral-400 hover:text-white transition-colors px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 hover:border-neutral-700"
                title="Refresh stats from GitHub"
              >
                <RefreshCw className={`w-3 h-3 text-[#8B5CF6] ${loading ? "animate-spin" : ""}`} />
                <span>{loading ? "Syncing..." : "Sync Live"}</span>
              </button>

              <span className="font-mono text-[10px] sm:text-[11px] text-neutral-500 uppercase tracking-widest hidden md:inline">
                PURPLE THEME
              </span>
            </div>
          </div>

          {/* Graph Image */}
          <div className="w-full overflow-x-auto pb-4 flex justify-center custom-terminal-scroll">
            <img
              src="https://ghchart.rshah.org/8b5cf6/notsomohit"
              alt="Mohit's GitHub Contribution Heatmap"
              className="min-w-[620px] sm:min-w-[680px] w-full max-w-4xl h-auto opacity-95 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
          </div>

          {/* Footer Breakdown Row */}
          <div className="mt-4 pt-4 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2 text-neutral-300">
              <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span className="truncate max-w-md">{stats.bio}</span>
            </div>

            <div className="flex items-center gap-3 text-neutral-400">
              {yearKeys.map((yr) => (
                <div key={yr} className="flex items-center gap-1">
                  <span className="text-neutral-500">{yr}:</span>
                  <span className="text-neutral-200 font-semibold">{stats.yearBreakdown[yr]} commits</span>
                </div>
              ))}
            </div>
          </div>

          {/* Corner accents */}
          <div className="absolute top-2.5 left-2.5 w-2 h-2 border-t border-l border-neutral-700 pointer-events-none" />
          <div className="absolute top-2.5 right-2.5 w-2 h-2 border-t border-r border-neutral-700 pointer-events-none" />
          <div className="absolute bottom-2.5 left-2.5 w-2 h-2 border-b border-l border-neutral-700 pointer-events-none" />
          <div className="absolute bottom-2.5 right-2.5 w-2 h-2 border-b border-r border-neutral-700 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
