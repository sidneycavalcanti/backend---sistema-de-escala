import React from 'react';
import { FaHome, FaUserNurse, FaWalking, FaUserAlt } from 'react-icons/fa';
import Logo from '../../../assets/logo cimnc.png';
import './style.css';

function NavBar() {
  return (
    <div className="navbar">
    <div className="navbar-container">
    <img src={Logo}  width="40" className="navbar-logo"/>
      <ul className="navbar-menu">
        <li className="navbar-item">
          <a href="/principal" className="navbar-link">
            <FaHome />
            <span>Inicio</span>
          </a>
        </li>
        <li className="navbar-item">
          <a href="/militar" className="navbar-link">
            <FaUserNurse />
            <span>Militar</span>
          </a>
        </li>
        <li className="navbar-item">
          <a href="/user" className="navbar-link">
            <FaUserAlt />
            <span>Usuario</span>
          </a>
        </li>
        <li className="navbar-item">
          <a href="/" className="navbar-link">
            <FaWalking />
            <span>Exit</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
  );
}

export default NavBar;
