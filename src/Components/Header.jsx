import React from 'react';
import image from '../image/logo.png'

import User from './User';

const Header = () => {
  return (
    <div className='header'>
        <div className="logo-container">
            <span><img src={image} alt="logo" /></span>
            <span className='fat'>
                <span>F</span>
                <span>a</span>
                <span>t</span>
                <span>t</span>
            </span>
            <span className='finger'>
                <span>F</span>
                <span>i</span>
                <span>n</span>
                <span>g</span>
                <span>e</span>
                <span>r</span>
            </span>
        </div>
        <div className="userContainer">
            <User />
        </div>
    </div>
  )
}

export default Header;