import React from 'react'

import { formatCurrency } from '../../common/utils'

const Display = ({ id, category, amount }) => {
  return (
    <>
      <span>{category}: {formatCurrency(amount)}</span>
    </>
  )
}

export default Display
