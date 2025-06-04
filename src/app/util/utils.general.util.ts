export function getValuesByKey<T, K extends keyof T>(
  array: T[],
  key: K
): T[K][] {
  return array.map((item) => item[key]);
}
