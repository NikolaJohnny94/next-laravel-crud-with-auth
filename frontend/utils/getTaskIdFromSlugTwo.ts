export function getTaskId(paramsId: string | string[]): number {
  return Array.isArray(paramsId)
    ? Number(paramsId[paramsId.length - 1])
    : Number(paramsId)
}
