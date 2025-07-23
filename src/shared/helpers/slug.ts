export function slug(title: string): string {
  return title.toLowerCase().replace(/\s+/g, "-");
}
