import React from 'react'

const Display = ({ id, field, operation, term }) => {
  return (
    <>
      <span><i>{field}</i> <b>{operation}</b> "{term}"</span>
    </>
  )
}

export default Display
