/**
 *
 * Header
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.PureComponent {
  render() {
    return (
      <div>
        <Link to="/">JABC</Link>
        <Link to="/profile">My Profile</Link>
        <Link to="/performance">Performance</Link>
        <Link to="/onboarding">Onboarding</Link>
        <Link to="/">Logout</Link>
      </div>
    );
  }
}

Header.propTypes = {};

export default Header;
