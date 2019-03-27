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
import { selectProfile } from '../App/selectors';
import { selectRole, selectProfileDomainJS, selectAllRoles, selectAllEmployees, selectEmployees, selectManagers } from './selectors';
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
import EmployeeDisplay from '../../components/EmployeeDisplay';
import RoleDisplay from '../../components/RoleDisplay';
import EmployeeEditForm from '../../components/EmployeeEditForm';
import Button from '@material-ui/core/Button';
import ChangePasswordDialog from '../../components/ChangePasswordDialog';

const styles = theme => ({
  root: {
    width: '95%',
    marginTop: theme.spacing.unit * 3,
    marginLeft: '2.5%',
    paddingBottom: '100px',
  },
  tabsIndicator: {
    display: 'inline-block',
    backgroundColor: '#ff5000',
  },
  editButton: {
    float: 'right',
    display: 'inline',
    color: 'white',
    width: '100px',
    backgroundColor: '#ff6600',
    borderRadius: '15px',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#ff944d',
    },
  },
  resetButton: {
    float: 'left',
    display: 'block',
    height: '40px',
    width: '200px',
    marginTop: '50px',
    marginLeft: '30px',
    color: 'black',
    backgroundColor: '#eeeeee',
    borderRadius: '15px',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '##f5f5f5',
    },
  },
});

class Profile extends React.PureComponent {
  componentDidMount() {
    this.props.getProfileData();
  }

  componentWillMount() {
    this.unlisten = this.props.history.listen(() => {
      this.props.setEditing(false);
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  state = {
    activeTab: 0,
    isAdmin: true,
    showPasswordChange: false,
  };

  handleChange = (event, value) => {
    this.setState({ activeTab: value });
    this.props.setEditing(false);
  };

  handleClickEdit = () => {
    this.props.setEditing(true);
  };

  saveProfile = profile => {
    this.props.saveProfile(profile);
  };

  cancelEdit = () => {
    this.props.setEditing(false);
  };

  closePasswordChangeDialog = () => {
    this.setState({ showPasswordChange: false });
  };

  openPasswordChangeDialog = () => {
    this.setState({ showPasswordChange: true });
  };

  updatePassword = password => {
    const newProfile = { ...this.props.profile, password };
    this.props.updatePassword(newProfile);
  };

  render() {
    const { activeTab, isAdmin, showPasswordChange } = this.state;
    const { classes, role, profile, profileDomain, allRoles } = this.props;
    const { editing } = profileDomain;

    if (!profile) return null;
    return (
      <div>
        <h1>My Profile</h1>
        <Paper className={classes.root}>
          <AppBar position="static" className={classes.appBar}>
            <Tabs
              value={activeTab}
              classes={{ indicator: classes.tabsIndicator }}
              onChange={this.handleChange}
            >
              <Tab disableRipple label="Profile" />
              {role && <Tab disableRipple label="Role" />}
            </Tabs>
          </AppBar>
          <div className="profile-card">
            <ChangePasswordDialog
              open={showPasswordChange}
              profile={profile}
              handleClose={this.closePasswordChangeDialog}
              updatePassword={this.updatePassword}
            />
            {activeTab === 0 &&
              !isAdmin && (
                <div>
                  <EmployeeDisplay
                    profile={profile}
                    roleName={role && role.name}
                    isAdmin={isAdmin}
                  />
                  <Button
                    className={classes.resetButton}
                    onClick={this.openPasswordChangeDialog}
                  >
                    Change Password
                  </Button>
                </div>
              )}
            {activeTab === 0 &&
              isAdmin &&
              !editing && (
                <div>
                  <Button
                    className={classes.editButton}
                    onClick={this.handleClickEdit}
                  >
                    Edit
                  </Button>
                  <EmployeeDisplay
                    profile={profile}
                    roleName={role && role.name}
                    isAdmin={isAdmin}
                  />
                  <Button
                    className={classes.resetButton}
                    onClick={this.openPasswordChangeDialog}
                  >
                    Change Password
                  </Button>
                </div>
              )}
            {activeTab === 0 &&
              isAdmin &&
              editing && (
                <EmployeeEditForm
                  profile={profile}
                  currentEmployee={this.props.currentEmployee}
                  allEmployees={this.props.allEmployees}
                  managers={this.props.selectManagers}
                  employees={this.props.selectEmployees}
                  saveProfile={this.saveProfile}
                  cancelEdit={this.cancelEdit}
                  allRoles={allRoles}
                />
              )}
            {activeTab === 1 && <RoleDisplay role={role} />}
          </div>
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
  saveProfile: PropTypes.func,
  updatePassword: PropTypes.func,
  setEditing: PropTypes.func,
  profileDomain: PropTypes.object,
  allRoles: PropTypes.array,
  history: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  profile: selectProfile,
  role: selectRole,
  profileDomain: selectProfileDomainJS,
  allRoles: selectAllRoles,
  currentEmployee: selectProfile,
  allEmployees: selectAllEmployees,
  selectEmployees: selectEmployees,
  selectManagers: selectManagers,
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
