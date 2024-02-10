import React from 'react'

function Loader({text}) {
  return (
    <div className='loader'>
      <img src={`${process.env.PUBLIC_URL}/images/loader.gif`} className="loader-img" alt="" />
      <h5>{text}</h5>
    </div>
  )
}

export default Loader
