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

import HomePage from 'containers/HomePage/Loadable';
import Profile from 'containers/Profile/Loadable';
import Performance from 'containers/Performance/Loadable';
import Onboarding from 'containers/Onboarding/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import styled from 'styled-components';
import GlobalStyle from '../../global-styles';
import Header from '../../components/Header';

const Contents = styled.div`
  margin-top: 90px;
  padding: 20px;
`;

export default function App() {
  return (
    <div>
      <Header />
      <Contents>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/performance" component={Performance} />
          <Route exact path="/onboarding" component={Onboarding} />
          <Route component={NotFoundPage} />
        </Switch>
      </Contents>
      <GlobalStyle />
    </div>
  );
}
