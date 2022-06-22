import React from 'react'

const Display = ({ id, field, operation, term, replaceField, replaceTerm }) => {
  return (
    <>
      <span>Match: <i>{field}</i> <b>{operation}</b> "{term}"</span>
      <br />
      <span>Set: <i>{replaceField}</i> to "{replaceTerm}"</span>
    </>
  )
}

export default Display
