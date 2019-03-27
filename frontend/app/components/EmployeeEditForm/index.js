/**
 *
 * EmployeeEditForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button/Button';
import SetPasswordDialog from '../SetPasswordDialog';
import Select from 'react-select';

const HR_ADMIN = 2;
const MANAGER = 1;
const STAFF = 0;
const styles = theme => ({
  title: {
    display: 'inline',
  },
  subHeading: {
    display: 'block',
    marginTop: '40px',
    marginBottom: '20px',
  },
  displayTable: {
    marginTop: '20px',
  },
  leftCell: {
    width: '30%',
  },
  row: {
    width: '60%',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  textField: {
    width: '100%',
    display: 'block',
  },
  container: {
    width: '50%',
    marginLeft: '2.5%',
  },
  fieldContainer: {
    width: '100%',
    marginBottom: '15px',
  },
  dropdown: {
    marginTop: '70px',
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
  cancelButton: {
    float: 'right',
    display: 'inline',
    height: '40px',
    width: '100px',
    marginTop: '30px',
    marginLeft: '20px',
    borderRadius: '15px',
  },
  resetButton: {
    float: 'left',
    display: 'block',
    height: '40px',
    width: '200px',
    marginTop: '30px',
    color: 'black',
    backgroundColor: '#eeeeee',
    borderRadius: '15px',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '##f5f5f5',
    },
  },
});

class EmployeeEditForm extends React.PureComponent {
  constructor(props) {
    super(props);
    console.log(props.profile);
    console.log(props.currentEmployee);
    console.log(props.allEmployees);
    console.log(props.managers);
    console.log(props.employees);

    this.state = {
      profile: { ...props.profile, fkRole: props.profile.fkRole || '' },
      dialog: false,
      managers: props.managers.map(this.toSelectOption),
      employees: props.employees.map(this.toSelectOption),
    };
    
    this.selectionEmployees = props.allEmployees.filter(employee => {
     return employee.adminLevel == STAFF
    }).map(this.toSelectOption)
    this.selectionManagers = props.allEmployees.filter(employee => {
      return employee.adminLevel > STAFF
    }).concat(props.managers).map(this.toSelectOption)
  }

  toSelectOption = employee =>{
    return { value: employee.id, label: `${employee.firstname} ${employee.lastname}`}
  }

  handleChange = name => event => {
    const { value } = event.target;
    this.setState(prevState => ({
      profile: {
        ...prevState.profile,
        [name]: value,
      },
    }));
  };

  handleClose = () => {
    this.setState({ dialog: false });
  };

  handleOpen = () => {
    this.setState({ dialog: true });
  };

  updatePassword = newPassword => {
    const newProfile = { ...this.props.profile, password: newPassword };
    this.props.updatePassword(newProfile);
  };

  handleEmployees = employees => {
    console.log(employees)
    this.setState({employees: employees})
  }

  handleManagers = managers => {
    console.log(managers)
    this.setState({managers: managers})
  }

  render() {
    const { classes, saveProfile, cancelEdit, allRoles, add, currentEmployee } = this.props;
    const { profile, dialog, managers, employees } = this.state;

    return (
      <div>
        <Grid container spacing={24}>
          <Grid item sm={12}>
            <Typography variant="h5" className={classes.title}>
              Edit Profile
            </Typography>
            <Typography
              className={classes.subHeading}
              variant="subtitle1"
              color="textSecondary"
            >
              Personal Information
            </Typography>
            <div className={classes.fieldContainer}>
              <TextField
                value={profile.firstname}
                label="First Name*"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={this.handleChange('firstname')}
              />
            </div>
            <div className={classes.fieldContainer}>
              <TextField
                value={profile.lastname}
                label="Last Name*"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={this.handleChange('lastname')}
              />
            </div>
            <div className={classes.fieldContainer}>
              <TextField
                required
                value={profile.email}
                label="Email"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={this.handleChange('email')}
              />
            </div>
            <div className={classes.fieldContainer}>
              <TextField
                required
                value={profile.sin}
                label="SIN"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={this.handleChange('sin')}
                type="number"
              />
            </div>
            <div className={classes.fieldContainer}>
              <TextField
                value={profile.birthdate}
                label="Birth Date"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={this.handleChange('birthdate')}
                placeholder="2019-01-31"
              />
            </div>
            <div className={classes.fieldContainer}>
              <TextField
                value={profile.address}
                multiline
                rows="4"
                label="Address"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={this.handleChange('address')}
              />
            </div>
            <div className={classes.fieldContainer}>
              <TextField
                defaultValue={profile.phoneNumber}
                label="Phone Number"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={this.handleChange('phoneNumber')}
              />
            </div>
            <Typography
              className={classes.subHeading}
              variant="subtitle1"
              color="textSecondary"
            >
              Employee Information
            </Typography>
            <div className={classes.fieldContainer}>
              <TextField
                value={profile.dateJoined}
                label="Date Joined"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={this.handleChange('dateJoined')}
                placeholder="2019-01-31"
              />
            </div>
            <div className={classes.fieldContainer}>
              <TextField
                required
                select
                value={profile.status}
                label="Status"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={this.handleChange('status')}
              >
                <MenuItem key={1} value={1}>
                  Active
                </MenuItem>
                <MenuItem key={0} value={0}>
                  Inactive
                </MenuItem>
                <MenuItem key={2} value={2}>
                  Onboarding
                </MenuItem>
                <MenuItem key={3} value={3}>
                  Probation
                </MenuItem>
              </TextField>
            </div>
            <div className={classes.fieldContainer}>
              <TextField
                select
                value={profile.fkRole}
                label="Role"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={this.handleChange('fkRole')}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {allRoles &&
                  allRoles.map(role => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.name}
                    </MenuItem>
                  ))}
              </TextField>
            </div>
            <div className={classes.fieldContainer}>
              <TextField
                value={profile.salary}
                label="Salary"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={this.handleChange('salary')}
                type="number"
              />
            </div>
            <div className={classes.fieldContainer}>
              <TextField
                required
                select
                value={profile.fte}
                label="Employee Type"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={this.handleChange('fte')}
              >
                <MenuItem key={1} value={1}>
                  Full time
                </MenuItem>
                <MenuItem key={0} value={0}>
                  Part time
                </MenuItem>
              </TextField>
            </div>
            <div className={classes.fieldContainer}>
              <TextField
                value={profile.vacationDays}
                label="Annual Number of Vacation Days"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth
                type="number"
                onChange={this.handleChange('vacationDays')}
              />
            </div>
            <div className={classes.fieldContainer}>
              <TextField
                value={profile.vacationDays}
                label="Vacation Days Remaining"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth
                type="number"
                onChange={this.handleChange('remainingVacationDays')}
              />
            </div>
            <div className={classes.fieldContainer}>
              <TextField
                required
                select
                value={profile.adminLevel}
                label="Admin Level"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={this.handleChange('adminLevel')}
              >
                <MenuItem key={STAFF} value={STAFF}>
                  Employee
                </MenuItem>
                <MenuItem key={MANAGER} value={MANAGER}>
                  Manager
                </MenuItem>
                <MenuItem key={HR_ADMIN} value={HR_ADMIN}>
                  Admin
                </MenuItem>
              </TextField>
            </div>
            {(profile.adminLevel == STAFF && (this.selectionManagers.length > 0 || currentEmployee.adminLevel == STAFF))  && (
              <div>
                {this.selectionManagers.length == 0  && (
                  <Typography
                    className={classes.subHeading}
                    variant="subtitle1"
                    color="textSecondary"
                  >
                    No Manager(s)
                  </Typography>
                )}
                {this.selectionManagers.length > 0  && (
                  <div>
                    <Typography
                      className={classes.subHeading}
                      variant="subtitle1"
                      color="textSecondary"
                    >
                      Manager(s)
                    </Typography>
                    <div className={classes.fieldContainer}>
                      <Select
                        defaultValue={[]}
                        isDisabled={currentEmployee.adminLevel != HR_ADMIN}
                        isMulti
                        name="managers"
                        value={managers}
                        options={this.selectionManagers}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={this.handleManagers}
                        theme={theme => ({
                          ...theme,
                          colors: {
                            ...theme.colors,
                            primary25: 'orange',
                            primary: 'orange',
                          },
                        })}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
            {(currentEmployee.adminLevel > STAFF && profile.adminLevel > STAFF) && (
              <div>
                {(this.selectionEmployees.length == 0  && currentEmployee.adminLevel == MANAGER) && (
                  <Typography
                    className={classes.subHeading}
                    variant="subtitle1"
                    color="textSecondary"
                  >
                    No managed employee(s)
                  </Typography>
                )}
                {(this.selectionEmployees.length > 0 || currentEmployee.adminLevel == HR_ADMIN) && (
                  <div>
                    <Typography
                      className={classes.subHeading}
                      variant="subtitle1"
                      color="textSecondary"
                    >
                      Managed Employee(s)
                    </Typography>
                    <div className={classes.fieldContainer}>
                      <Select
                        isDisabled={currentEmployee.adminLevel != HR_ADMIN}
                        defaultValue={[]}
                        isMulti
                        name="employees"
                        value={employees}
                        options={this.selectionEmployees}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={this.handleEmployees}
                        theme={theme => ({
                          ...theme,
                          colors: {
                            ...theme.colors,
                            primary25: 'orange',
                            primary: 'orange',
                          },
                        })}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </Grid>
        </Grid>
        {!add && (
          <Button className={classes.resetButton} onClick={this.handleOpen}>
            Reset Password
          </Button>
        )}
        <SetPasswordDialog
          open={dialog}
          handleClose={this.handleClose}
          updatePassword={this.updatePassword}
        />
        <Button className={classes.cancelButton} onClick={cancelEdit}>
          Cancel
        </Button>
        <Button
          className={classes.formButton}
          onClick={() => saveProfile(profile)}
        >
          Save
        </Button>
      </div>
    );
  }
}

EmployeeEditForm.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  saveProfile: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  allRoles: PropTypes.array,
  add: PropTypes.bool,
  currentEmployee: PropTypes.object.isRequired,
  allEmployees: PropTypes.array.isRequired,
  managers: PropTypes.array.isRequired,
  employees: PropTypes.array.isRequired,
};

export default withStyles(styles)(EmployeeEditForm);
