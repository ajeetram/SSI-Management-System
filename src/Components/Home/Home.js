import React from 'react'
import { Link } from 'react-router-dom'
import hero from '../../assets/hero.png'
import './home.css'
const Home = () => {
  return (
    <div className='container'>
    <div className='col-1'>
    <img src={hero} alt="hero"></img>
    </div>
    <div className='col-2'>
      <h1>Self-Sovereign Identity</h1>
      <h1>Management System</h1>
      <div className='about'>
        <p>Self-sovereign identity (SSI) is a concept that allows individuals to control their own personal data and identity without relying on a centralized authority or third-party.</p>
      </div>
      <div className='btn'>
      <Link to="/issuer" className="button">Issue A Credential</Link>
      </div>
    </div>

    </div>
  )
}

export default Home
