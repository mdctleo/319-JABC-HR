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
  title: {
    marginLeft: '2.5%',
    color: 'white',
  },
  card: {
    marginLeft: '30px',
    marginBottom: '20px',
    paddingTop: '5px',
    paddingBottom: '5px',
    width: '75%',
    backgroundColor: '#00954D',
  },
  fieldContainer: {
    width: '100%',
    marginBottom: '15px',
  },
  positionName: {
    display: 'inline',
    marginTop: '30px',
  },
  formSubheading: {
    display: 'inline',
  },
  container: {
    width: '95%',
    marginLeft: '2.5%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  topFieldContainer: {
    width: '100%',
    marginBottom: '15px',
    marginTop: '50px',
  },
  textField: {
    width: '100%',
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
    }
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
    }
  },
});

class Profile extends React.PureComponent {
  componentDidMount() {
    this.props.getProfileData();
  }

  state = {
    value: 0,
    loginCred: 1,
    edit: 0,
    profile: {firstname: "firstname", lastname: "lastname", id: "1", sin: "777 777 777", role: {name: "Developer", description: "kasjdbaksbaksdjbcakjsdcakjsd", competencies: [{name: "C++", description: "Can code in C++", rating: 0 }]}, status: "Active", salary: 60000, manager: "Sarah James", type: "FT", vacation: 12, address: "Box 123", phone: "555-5555"},
  };

  handleChange = (event, value) => {
    this.setState({ value });
    this.setState({ edit: 0 });
  };

  handleClickEdit = (event, value) => {
    this.setState({
      edit: 1,
    });
  };

  handleClose = value => {
    this.setState({
      edit: 0,
    });
    this.state.profile = value;
  };

  updateProfile = (event, value) => {
    var firstname = document.getElementById("edit-prof-fname").value;
    var id = document.getElementById("edit-prof-id").value;
    var sin = document.getElementById("edit-prof-sin").value;
    var name = document.getElementById("edit-prof-position").value;
    var remainingVacationDays = document.getElementById("edit-prof-vacation").value;
    var address = document.getElementById("edit-prof-address").value;
    var lastname = document.getElementById("edit-prof-lname").value;
    var status = document.getElementById("edit-prof-status").value;
    var salary = document.getElementById("edit-prof-salary").value;
    var manager = document.getElementById("edit-prof-manager").value;
    var type = document.getElementById("edit-prof-type").value;
    var phone = document.getElementById("edit-prof-phone").value;
    this.setState({ profile: { firstname: firstname, lastname: lastname, id: id, sin: sin, role: {name: name}, status: status, salary: salary, manager: manager, type: type, vacation: remainingVacationDays, address: address, phone: phone }});
    console.log("made it into fn");
    this.setState({ edit: 0 });
}

  render() {
    const {value, loginCred, edit, profile} = this.state;
    const state = this.state;
    const { classes } = this.props;

    if (!profile) return null;
    return (
      <div>
        <h1>My Profile</h1>
        <Paper className={classes.root}>
          <AppBar position="static" className={classes.appBar}>
            <Tabs value={value} classes={{ indicator: classes.tabsIndicator }}
                  onChange={this.handleChange}>
              <Tab disableRipple label="Profile" />
              <Tab disableRipple label="Role" />
            </Tabs>
        </AppBar> 
           <div  className="profile-card">
           { value == 0 && loginCred == 0 && 
           <EmployeeDisplay state={state} /> }
           { value == 0 && loginCred == 1 && edit == 0 &&
            <div>
              <Button className={classes.editButton} onClick={this.handleClickEdit}>Edit</Button> 
              <EmployeeDisplay state={state} />
           </div> } 
           { value == 0 && loginCred == 1 && edit == 1 && 
           <div>
            <EmployeeEditForm state={state} />
            <Button className={classes.formButton} onClick={this.updateProfile}>Submit</Button>
            <Button className={classes.formButton} onClick={this.updateProfile}>Save</Button> 
           </div>}
           { value == 1 && <RoleDisplay role={profile.role} />}
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
