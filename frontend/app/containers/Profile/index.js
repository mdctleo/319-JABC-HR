/**
 *
 * Profile
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { selectProfile, selectRole } from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import { EmployeeTab, RoleTab } from 'components/ProfileTabs';

const styles = theme => ({
  root: {
    width: '95%',
    marginTop: theme.spacing.unit * 3,
    marginLeft: '2.5%',
    paddingBottom: '30px',
  },
  tabsIndicator: {
    display: 'inline-block',
    backgroundColor: '#ff5000',
  },
});

class Profile extends React.PureComponent {
  componentDidMount() {
    this.props.getProfileData();
  }

  state = {
    currentTab: 0,
  };

  handleChange = (event, value) => {
    this.setState({ currentTab: value });
  };

  render() {
    const { currentTab } = this.state;
    const { classes, profile, role } = this.props;
    if (!profile) return null;
    return (
      <div>
        <h1>
          {profile.firstname} {profile.lastname}
        </h1>
        <Paper className={classes.root}>
          <AppBar position="static" className={classes.appBar}>
            <Tabs
              value={currentTab}
              classes={{ indicator: classes.tabsIndicator }}
              onChange={this.handleChange}
            >
              <Tab disableRipple label="Employee Information" />
              {role && <Tab disableRipple label="Your role" />}
            </Tabs>
          </AppBar>
          {currentTab === 0 && <EmployeeTab profile={profile} role={role} />}
          {currentTab === 1 && <RoleTab role={role} />}
        </Paper>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object,
  role: PropTypes.object,
  getProfileData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  profile: selectProfile,
  role: selectRole,
});

const mapDispatchToProps = {
  ...actions,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'profile', reducer });
const withSaga = injectSaga({ key: 'profile', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(Profile);
