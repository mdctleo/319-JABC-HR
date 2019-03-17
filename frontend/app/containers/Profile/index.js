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
import EmployeeDisplay from '../../components/EmployeeDisplay';
import RoleDisplay from '../../components/RoleDisplay';
import EmployeeEditForm from '../../components/EmployeeEditForm';
import Button from '@material-ui/core/Button';

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
  formButton: {
    float: 'right',
    display: 'inline',
    color: 'white',
    height: '40px',
    width: '100px',
    marginTop: '30px',
    marginLeft: '20px',
    backgroundColor: '#ff6600',
    borderRadius: '15px',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#ff944d',
    },
  },
});

class Profile extends React.PureComponent {
  componentDidMount() {
    this.props.getProfileData();
  }

  state = {
    activeTab: 0,
    isAdmin: true,
    edit: false,
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

  handleClose = value => {
    this.setState({
      edit: false,
    });
    this.state.profile = value;
  };

  updateProfile = (event, value) => {
    const firstname = document.getElementById('edit-prof-fname').value;
    const id = document.getElementById('edit-prof-id').value;
    const sin = document.getElementById('edit-prof-sin').value;
    const name = document.getElementById('edit-prof-position').value;
    const remainingVacationDays = document.getElementById('edit-prof-vacation')
      .value;
    const address = document.getElementById('edit-prof-address').value;
    const lastname = document.getElementById('edit-prof-lname').value;
    const status = document.getElementById('edit-prof-status').value;
    const salary = document.getElementById('edit-prof-salary').value;
    const manager = document.getElementById('edit-prof-manager').value;
    const type = document.getElementById('edit-prof-type').value;
    const phone = document.getElementById('edit-prof-phone').value;
    this.setState({
      profile: {
        firstname,
        lastname,
        id,
        sin,
        role: { name },
        status,
        salary,
        manager,
        type,
        vacation: remainingVacationDays,
        address,
        phone,
      },
    });
    console.log('made it into fn');
    this.setState({ edit: false });
  };

  static getDerivedStateFromProps(props, state) {
    if (props.profile && !state.profile) {
      return {
        profile: props.profile,
      };
    }
    return null;
  }

  render() {
    const { activeTab, isAdmin, edit, profile } = this.state;
    const state = this.state;
    const { classes, role } = this.props;

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
            {activeTab === 0 &&
              !isAdmin && (
                <EmployeeDisplay
                  profile={profile}
                  roleName={role && role.name}
                  isAdmin={isAdmin}
                />
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
                </div>
              )}
            {activeTab === 0 &&
              isAdmin &&
              edit && (
                <div>
                  <EmployeeEditForm state={state} />
                  <Button
                    className={classes.formButton}
                    onClick={this.updateProfile}
                  >
                    Submit
                  </Button>
                  <Button
                    className={classes.formButton}
                    onClick={this.updateProfile}
                  >
                    Save
                  </Button>
                </div>
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
