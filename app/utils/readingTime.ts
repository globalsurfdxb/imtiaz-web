export function getReadingTime(content: string): string {
  const text = content.replace(/<[^>]*>/g, " "); // strip HTML tags
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} ${minutes < 2 ? "min" : "mins"}`;
}