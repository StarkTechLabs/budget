
const match = (filter, item) => {
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

const transform = (tf, item) => {
  return {
    ...item,
    [tf.replaceField]: tf.replaceTerm
  }
}

export const processFilters = filters => {
  return item => {
    for (const filter of filters) {
      if (!match(filter, item)) {
        return false
      }
    }
    return true
  }
}

export const processTransforms = transforms => {
  return item => {
    for (const tf of transforms) {
      if (match(tf, item)) {
        return transform(tf, item)
      }
    }
    return item
  }
}
