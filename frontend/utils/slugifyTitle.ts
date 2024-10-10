export const slugify = (title: string, id: number): string =>
  `${title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')}-${id}`
