import { slug } from "./slug";

export function generateMediaUrl(data: {
  id: number;
  title?: string;
  name?: string;
}): string {
  if (data.title) {
    return `/movie/${data.id}-${slug(data.title)}`;
  }
  if (data.name) {
    return `/serie/${data.id}-${slug(data.name)}`;
  }
  return "";
}
