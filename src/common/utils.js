
const THOUSAND = 1000
const MILL = 1000000

export const round = (num) => {
  return Math.round((num + Number.EPSILON) * 100) / 100
}

export const formatCount = count => {
  if (!count || typeof count !== 'number') return '0'

  if (count < THOUSAND) {
    return `${count}`
  }

  if (count < MILL) {
    return `${round(count / THOUSAND)}K`
  }

  if (count >= MILL) {
    return `${round(count / MILL)}M`
  }

  return '0'
}

export const group = (data, key = 'category', valKey = 'amount') => {
  const aggregate = {}
  data.forEach(transaction => {
    if (!(transaction[key] in aggregate)) {
      aggregate[transaction[key]] = 0
    }
    aggregate[transaction[key]] += (+transaction[valKey])
  })

  const chartData = []
  for (const key in aggregate) {
    chartData.push({
      id: key,
      value: round(aggregate[key])
    })
  }
  return chartData
}
