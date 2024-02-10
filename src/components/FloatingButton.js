import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom';

function FloatingButton({icon,text,to}) {
  return (
    <Link to={to} className='floating-button btn btn-success rounded-circle border border-light p-3' title={text}>
        {icon}
    </Link>
  )
}

export default FloatingButton
