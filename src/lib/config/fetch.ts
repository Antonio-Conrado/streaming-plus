import { TOKEN } from "@/shared/data/const";
import type { ZodType } from "zod";

export async function customFetch<T>(
  url: string,
  schema: ZodType<T>,
  init?: RequestInit
): Promise<T | false> {
  const defaultHeaders = {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  };

  const headers = {
    ...defaultHeaders,
    ...(init?.headers || {}),
  };

  try {
    const response = await fetch(url, {
      ...init,
      headers,
    });

    if (!response.ok) {
      return false;
    }
    const data = await response.json();
    return schema.parse(data);
  } catch (error) {
    console.error("Fetch or validation error:", error);
    return false;
  }
}
