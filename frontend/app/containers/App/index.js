/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import HomePage from 'containers/HomePage/Loadable';
import Profile from 'containers/Profile/Loadable';
import Performance from 'containers/Performance/Loadable';
import Onboarding from 'containers/Onboarding/Loadable';
import Employees from 'containers/Employees/Loadable';
import Roles from 'containers/Roles/Loadable';

import NotFoundPage from 'containers/NotFoundPage/Loadable';

import Login from 'containers/Login';

import styled from 'styled-components';
import GlobalStyle from '../../global-styles';
import Header from '../../components/Header';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router';

import { makeSelectGlobal } from './selectors';
import actions from './actions';

const Contents = styled.div`
  margin-top: 90px;
  padding: 20px;
`;

export class App extends React.PureComponent {
  render() {
    const mainApp = (
      <div>
        <Header
          userRole={this.props.data.user && this.props.data.user.role}
          logout={this.props.logout}
        />
        <Contents>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/profile" component={Profile} />
            <Route path="/performance" component={Performance} />
            <Route path="/onboarding" component={Onboarding} />
            <Route path="/employees" component={Employees} />
            <Route path="/roles" component={Roles} />
            <Route component={NotFoundPage} />
          </Switch>
        </Contents>
      </div>
    );

    const loginPage = <Login />;

    return (
      <div>
        {this.props.data.user ? mainApp : loginPage}
        <GlobalStyle />
      </div>
    );
  }
}

App.propTypes = {
  data: PropTypes.object,
  logout: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectGlobal(),
});

const mapDispatchToProps = {
  ...actions,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(App);
