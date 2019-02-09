/**
 *
 * Login
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLogin from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';

import LoginForm from 'components/LoginForm';

export class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleText = this.handleText.bind(this);
  }

  render() {
    return (
      <LoginForm
        changeText={this.handleText}
        email={this.state.email}
        password={this.state.password}
        login={() => this.props.login(this.state.email, this.state.password)}
        loggingIn={this.props.data.loggingIn}
        errorMessage={this.props.data.errorMessage}
      />
    );
  }

  handleText(e) {
    const { target } = e;
    const { id } = target;
    this.setState({
      [id]: target.value,
    });
  }
}

Login.propTypes = {
  login: PropTypes.func,
  data: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectLogin(),
});

const mapDispatchToProps = {
  ...actions,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Login);
