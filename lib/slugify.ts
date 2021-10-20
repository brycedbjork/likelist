// takes user name (eg. Bryce Bjork) and turns it into a slug (eg. bryce)

export default function slugify(text: string): string {
  return text.split(" ")[0].toLowerCase();
}
