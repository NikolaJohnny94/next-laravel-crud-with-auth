export const slugify = (title: string): string =>
  `${title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')}`
