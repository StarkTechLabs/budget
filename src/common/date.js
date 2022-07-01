import dayjs from 'dayjs'

export const formatDate = date => {
  return dayjs(date).format('MMM YYYY')
}

export const parseDate = date => {
  return dayjs(date, 'MMM YYYY').toString()
}

export const findDateOpts = (depth = 7) => {
  const dates = range(dayjs(), depth, 'month', false) // [dayjs(), dayjs().subtract(1, 'month'), dayjs().subtract(2, 'month')]
  return dates.map(date => ({
    key: formatDate(date),
    value: formatDate(date)
  }))
}

export const range = (start, amount, unit, isFuture) => {
  const results = [start]
  for (let i = 1; i <= amount; i++) {
    if (isFuture) {
      results.push(start.add(i, unit))
    } else {
      results.push(start.subtract(i, unit))
    }
  }
  return results
}

export const inRange = (start, end, val) => {
  return (
    (val.isBefore(end, 'day') && val.isAfter(start, 'day')) ||
    val.isSame(start, 'day') ||
    val.isSame(end, 'day')
  )
}
