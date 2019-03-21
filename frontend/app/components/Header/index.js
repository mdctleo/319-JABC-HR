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
          {this.props.onboarding ? (
            <Link className="nav-link" to="/onboarding">
              Onboarding
            </Link>
          ) : (
            <Link className="nav-link" to="/documents">
              Documents
            </Link>
          )}
          {this.props.adminLevel >= 1 && (
            <Link className="nav-link" to="/employees">
              Employees
            </Link>
          )}
          {this.props.adminLevel >= 2 && (
            <Link className="nav-link" to="/roles">
              Roles
            </Link>
          )}
          <a
            href="#"
            className="nav-link"
            id="nav-link-logout"
            onClick={this.props.logout}
          >
            Logout
          </a>
        </div>
        <img src={colourbar} id="jabc-nav-colour-bar" />
      </div>
    );
  }
}

Header.propTypes = {
  adminLevel: PropTypes.number,
  logout: PropTypes.func,
  onboarding: PropTypes.bool.isRequired,
};

export default Header;
