import { TOKEN } from "@/shared/data/const";

export async function fetchSearchMedia(query: string) {
  const url = `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=es-ES&page=1`;
  try {
    const data = await fetch(url, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!data.ok) return false;

    return data.json();
  } catch {
    return false;
  }
}
