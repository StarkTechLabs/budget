
export const filterMatch = (filter, item) => {
  switch (filter.operation) {
    case 'equals':
      return filter.term === item[filter.field]
    case 'contains':
      return typeof item[filter.field] === 'string' && item[filter.field].includes(filter.term)
    case 'does not contain':
      return typeof item[filter.field] === 'string' && !item[filter.field].includes(filter.term)
    case 'does not equal':
      return filter.term !== item[filter.field]
    default:
      return false
  }
}

export const processFilters = filters => {
  return item => {
    for (const filter of filters) {
      if (!filterMatch(filter, item)) {
        return false
      }
    }
    return true
  }
}
