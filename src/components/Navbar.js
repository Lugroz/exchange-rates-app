import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Rates</Link></li>
        <li><Link to="/converter">Converter</Link></li>
        <li><Link to="/historical">Historical Chart</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
