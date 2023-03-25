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
      <h1>Consent-Based Data</h1>
      <h1>Management System</h1>
      <div className='about'>
        <p>A consent-based application using a public blockchain provides users with more control over their data and ensures transparency and security in all transactions and data access.</p>
      </div>
      <div className='btn'>
      <Link to="/issuer" className="button">Issue A Credential</Link>
      </div>
    </div>
    </div>
  )
}

export default Home