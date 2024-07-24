const SORT_KEYS = ['id', '-id', 'title', '-title'];

export const isValidSortField = (key: string |null): boolean => {
  return key === null || SORT_KEYS.includes(key);
}