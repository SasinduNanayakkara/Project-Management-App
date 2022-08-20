import React from 'react'
import logo from '../asserts/logo.png';

const Header = () => {
  return (
    <nav className='navbar bg-light mb-4 p-0'>
        <div className='container'>
            <a href="/" className='navbar-brand'>
                <div className='d-flex'>
                    <img src={logo} alt="" className='mr-2' height="50"/>
                    <div>
                        <h1>GraphQL Project Management</h1>
                    </div>
                </div>
            </a>
        </div>
    </nav>
  )
}

export default Header;