export const DEFAULT_PINNED_REPOS = [
  {
    name: "orbit-subscriptionTracker",
    description: "Orbit - a subscription tracker with a REST API, live dashboard, and automated email reminders before renewals.",
    language: "TypeScript",
    stars: 2,
    forks: 0,
    url: "https://github.com/notsomohit/orbit-subscriptionTracker",
  },
  {
    name: "cineflix-v1",
    description: "A sleek React app for discovering movies and anime, built with a focus on clean UI, smooth UX, and performance.",
    language: "JavaScript",
    stars: 1,
    forks: 1,
    url: "https://github.com/notsomohit/cineflix-v1",
  },
  {
    name: "previous-projects",
    description: "A collection of my previous projects",
    language: "Jupyter Notebook",
    stars: 0,
    forks: 0,
    url: "https://github.com/notsomohit/previous-projects",
  },
  {
    name: "weather-app",
    description: "A simple weather app",
    language: "JavaScript",
    stars: 0,
    forks: 0,
    url: "https://github.com/notsomohit/weather-app",
  },
  {
    name: "To-Do-List",
    description: "a simple to-do web app",
    language: "JavaScript",
    stars: 0,
    forks: 0,
    url: "https://github.com/notsomohit/To-Do-List",
  },
];

let cachedPinned = null;
let cacheTime = 0;

export async function fetchActualPinnedRepos() {
  const now = Date.now();
  if (cachedPinned && now - cacheTime < 5 * 60 * 1000) {
    return cachedPinned;
  }

  try {
    const res = await fetch("https://github.com/notsomohit", {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    if (res.ok) {
      const html = await res.text();
      const pinnedRegex = /<li[^>]*pinned-item-list-item[^>]*>([\s\S]*?)<\/li>/g;
      let match;
      const pinnedList = [];

      while ((match = pinnedRegex.exec(html)) !== null) {
        const block = match[1];
        const repoMatch = block.match(/href="\/notsomohit\/([^"\/]+)"/);
        const repoName = repoMatch ? repoMatch[1] : null;

        const descMatch = block.match(/<p[^>]*pinned-item-desc[^>]*>([\s\S]*?)<\/p>/);
        const desc = descMatch ? descMatch[1].trim() : "";

        const langMatch = block.match(/itemprop="programmingLanguage">([^<]+)<\/span>/);
        const language = langMatch ? langMatch[1].trim() : "Code";

        const starMatch = block.match(/href="\/notsomohit\/[^"]+\/stargazers"[^>]*>\s*(?:<svg[^>]*>[\s\S]*?<\/svg>\s*)?(\d+)/);
        const stars = starMatch ? parseInt(starMatch[1], 10) : 0;

        const forkMatch = block.match(/href="\/notsomohit\/[^"]+\/forks"[^>]*>\s*(?:<svg[^>]*>[\s\S]*?<\/svg>\s*)?(\d+)/);
        const forks = forkMatch ? parseInt(forkMatch[1], 10) : 0;

        if (repoName) {
          pinnedList.push({
            name: repoName,
            description: desc || "Source code and documentation on GitHub.",
            language,
            stars,
            forks,
            url: `https://github.com/notsomohit/${repoName}`,
          });
        }
      }

      if (pinnedList.length > 0) {
        cachedPinned = pinnedList;
        cacheTime = now;
        return pinnedList;
      }
    }
  } catch (err) {
    console.warn("Could not dynamically parse GitHub pinned items:", err.message);
  }

  cachedPinned = DEFAULT_PINNED_REPOS;
  cacheTime = now;
  return DEFAULT_PINNED_REPOS;
}
