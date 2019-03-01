/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../App/selectors';

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {
  render() {
    return (
      <div>
        <h1>Welcome, {this.props.user && this.props.user.name}!</h1>
      </div>
    );
  }
}

HomePage.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: selectUser(),
});

const mapDispatchToProps = {};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
