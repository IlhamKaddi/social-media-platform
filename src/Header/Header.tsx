import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Header.css';

function Header() {
    return (
        <div className='header'> 
        <li>
        <i className="bi bi-bell"></i>
        </li>
        </div>
    );
}

export default Header;