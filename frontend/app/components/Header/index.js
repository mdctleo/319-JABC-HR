/*
 *
 * Header
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import logo from 'images/jabc-wide-logo.png';
import colourbar from 'images/jabc-colour-bar.png';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.PureComponent {
  render() {
    return (
      <div id="nav-bar">
        <img src={logo} id="jabc-nav-logo"/>
        <div id="nav-link-container">
          <Link class="nav-link" to="/profile">My Profile</Link>
          <Link class="nav-link" to="/performance">Performance</Link>
          <Link class="nav-link" to="/onboarding">Onboarding</Link>
          <Link class="nav-link" id="nav-link-logout" to="/">Logout</Link>
        </div>
        <img src={colourbar} id="jabc-nav-colour-bar"/>
      </div>
    );
  }
}

Header.propTypes = {};

export default Header;
