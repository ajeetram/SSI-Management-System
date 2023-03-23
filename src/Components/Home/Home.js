import React from 'react'
import { Link } from 'react-router-dom'
import video from '../../assets/earth.mp4'
import hero from '../../assets/hero.png'
import './home.css'
const Home = () => {
  return (
    <div className='container'>
    <div className='col-1'>
    <img src={hero}></img>
    </div>
    <div className='col-2'>
      <h1>Decentralized Identity</h1>
      <h1>Management System</h1>
      <div className='about'>
        <p>This is a Decentralized Identity Management System. We can used it to Issue, Verify and store the Credentials without any fear of privacy leak</p>
      </div>
      <div className='btn'>
      <Link to="/issuer" className="button">Issue A Credential</Link>
      </div>
    </div>
    </div>
  )
}

export default Home