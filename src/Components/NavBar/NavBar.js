import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
const NavBar = () => {
  return (
    <div>
        <nav>
            <Link to='/'>Home</Link>
            <Link to='issuer'>Issuer</Link>
            <Link to='verifier'>Verifier</Link>
            <Link to='holder'>Holder</Link>
            <div className='animation start-home'></div>
        </nav>
    </div>
  )
}

export default NavBar