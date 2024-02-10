import React from 'react'

function Detail({title,value}) {
  return (
    <div className='my-4 text-center'>
        <p className='fw-bold mx-1 my-0 py-0 h4'>{title}</p>
        <p className='display-6 '>{value}</p>
    </div>
  )
}

export default Detail
