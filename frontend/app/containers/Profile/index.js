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
import { selectProfile} from '../App/selectors';
import { selectRole } from './selectors';
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
    borderRadius: '15px',
    color: 'black',
    backgroundColor: '#eeeeee',
    borderRadius: '15px',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '##f5f5f5',
    },
  }
});

class Profile extends React.PureComponent {
  componentDidMount() {
    this.props.getProfileData();
  }

  state = {
    activeTab: 0,
    isAdmin: true,
    edit: false,
    open: false,
  };

  handleChange = (event, value) => {
    this.setState({ activeTab: value });
    this.setState({ edit: false });
  };

  handleClickEdit = (event, value) => {
    this.setState({
      edit: true,
    });
  };

  saveProfile = (profile) => {
    this.props.saveProfile(profile);
    this.setState({
      edit: false,
    });
  }

  cancelEdit = () => {
    this.setState({
      edit: false,
    });
  }

  handleClose = event => {
    this.setState({ open: false });
  }

  handleOpen = event => {
    this.setState({ open: true });
  }

  render() {
    const { activeTab, isAdmin, edit, open } = this.state;
    const { classes, role, profile } = this.props;

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
          <ChangePasswordDialog open={open} profile={profile} handleClose={this.handleClose} />
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
                    onClick={this.handleOpen}>
                    Change Password
                  </Button>
                  </div>
              )}
            {activeTab === 0 &&
              isAdmin &&
              !edit && (
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
                    onClick={this.handleOpen}>
                    Change Password
                  </Button>
                </div>
              )}
            {activeTab === 0 &&
              isAdmin &&
              edit && (
                <EmployeeEditForm
                  profile={profile}
                  saveProfile={this.saveProfile}
                  cancelEdit={this.cancelEdit}
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
