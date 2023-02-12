import React from 'react'

export default function Items({data,onClick }) {

    const handleClick=()=> onClick(data)

  return (
    <button onClick={handleClick}>Button {data+1}</button>
  )
}
