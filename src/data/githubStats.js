const FALLBACK_STATS = {
  totalCommits: 287,
  currentStreak: 7,
  longestStreak: 7,
  publicRepos: 18,
  yearBreakdown: { "2026": 191, "2025": 96 },
  bio: "Full-stack developer building clean, functional systems & agentic AI architectures.",
  lastActive: "Today",
};

let cachedStats = null;
let cacheTime = 0;

export async function fetchGithubActivityStats() {
  const now = Date.now();
  if (cachedStats && now - cacheTime < 5 * 60 * 1000) {
    return cachedStats;
  }

  try {
    const [userRes, contribRes] = await Promise.all([
      fetch("https://api.github.com/users/notsomohit").catch(() => null),
      fetch("https://github-contributions-api.jogruber.de/v4/notsomohit").catch(() => null),
    ]);

    let userData = null;
    if (userRes && userRes.ok) {
      userData = await userRes.json();
    }

    let contribData = null;
    if (contribRes && contribRes.ok) {
      contribData = await contribRes.json();
    }

    let totalCommits = FALLBACK_STATS.totalCommits;
    let currentStreak = FALLBACK_STATS.currentStreak;
    let longestStreak = FALLBACK_STATS.longestStreak;
    let yearBreakdown = FALLBACK_STATS.yearBreakdown;

    if (contribData) {
      if (contribData.total && typeof contribData.total === "object") {
        yearBreakdown = contribData.total;
        const sum = Object.values(contribData.total).reduce((acc, curr) => acc + (Number(curr) || 0), 0);
        if (sum > 0) totalCommits = sum;
      }

      if (Array.isArray(contribData.contributions) && contribData.contributions.length > 0) {
        const sorted = [...contribData.contributions].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        let maxStreak = 0;
        let tempStreak = 0;

        for (let i = 0; i < sorted.length; i++) {
          if (sorted[i].count > 0) {
            tempStreak++;
            if (tempStreak > maxStreak) maxStreak = tempStreak;
          } else {
            tempStreak = 0;
          }
        }
        longestStreak = maxStreak > 0 ? maxStreak : FALLBACK_STATS.longestStreak;

        const todayStr = new Date().toISOString().split("T")[0];
        let pastDays = sorted.filter((d) => d.date <= todayStr);
        if (pastDays.length === 0) pastDays = sorted;

        let curr = 0;
        let idx = pastDays.length - 1;

        // If today has 0 contributions so far, check if yesterday was part of a streak
        if (idx >= 0 && pastDays[idx].count === 0) {
          idx--;
        }

        while (idx >= 0 && pastDays[idx].count > 0) {
          curr++;
          idx--;
        }

        currentStreak = curr > 0 ? curr : (pastDays[pastDays.length - 1]?.count > 0 ? 1 : 0);
      }
    }

    const stats = {
      totalCommits,
      currentStreak: currentStreak || FALLBACK_STATS.currentStreak,
      longestStreak: longestStreak || FALLBACK_STATS.longestStreak,
      publicRepos: userData?.public_repos ?? FALLBACK_STATS.publicRepos,
      yearBreakdown,
      bio: userData?.bio || FALLBACK_STATS.bio,
      lastActive: "Today",
    };

    cachedStats = stats;
    cacheTime = now;
    return stats;
  } catch (err) {
    console.warn("Error fetching GitHub activity stats:", err);
    return cachedStats || FALLBACK_STATS;
  }
}
