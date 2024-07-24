export const generateTitle = (sortField: string | null) => {
  if (!sortField) return ''

  const cleanSortField = sortField.startsWith('?sort=') ? sortField.slice(6) : sortField;
    const fieldName = cleanSortField.startsWith("-") ? cleanSortField.slice(1) : cleanSortField;
    const order = cleanSortField.startsWith("-") ? "descending" : "ascending";
    return ` sorted by ${fieldName}, ${order}`;
  
}