/*
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from 'images/jabc-wide-logo.png';
import colourbar from 'images/jabc-colour-bar.png';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.PureComponent {
  render() {
    return (
      <div id="nav-bar">
        <Link to="/">
          <img src={logo} id="jabc-nav-logo" />
        </Link>
        <div id="nav-link-container">
          <Link className="nav-link" to="/profile">
            My Profile
          </Link>
          <Link className="nav-link" to="/performance">
            Performance
          </Link>
          <Link className="nav-link" to="/onboarding">
            Onboarding
          </Link>
          {this.props.userRole >= 2 && (
            <Link className="nav-link" to="/employees">
              Employees
            </Link>
          )}
          {this.props.userRole >= 3 && (
            <Link className="nav-link" to="/roles">
              Roles
            </Link>
          )}
          <Link className="nav-link" id="nav-link-logout" to="/">
            Logout
          </Link>
        </div>
        <img src={colourbar} id="jabc-nav-colour-bar" />
      </div>
    );
  }
}

Header.propTypes = {
  userRole: PropTypes.number,
};

export default Header;
