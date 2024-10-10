export const getTaskIdFromSlug = (slug: string | string[]): number => {
  if (Array.isArray(slug)) {
    return Number(slug[slug.length - 1])
  } else if (typeof slug === 'string') {
    const lastSegment = slug.split('-').pop()
    return Number(lastSegment)
  } else {
    return 0
  }
}
