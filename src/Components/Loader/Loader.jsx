import React from 'react'
import './loader.css'
import loader from '../../assets/loader.gif'
const Loader = () => {
  return (
    <div className='Loader'>
      <div className='Loader_box'>
        <img src={loader} alt="loader" style={{width:"100px", height:"100px"}}></img>
      </div>
    </div>
  )
}

export default Loader