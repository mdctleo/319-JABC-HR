/**
 *
 * AddEmployeeForm
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
import NewEmployeeDialog from '../../components/NewEmployeeDialog';
import Select from 'react-select';

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

class AddEmployeeForm extends React.PureComponent {
  state = {
    profile: this.props.profile,
    dialog: false,
    adminLevel: 0,
  };

  people = [{ value: 'mikayla', label: 'Mikayla Preete' },
              { value: 'james', label: 'James Yoo' },
              { value: 'reed', label: 'Reed Esler' },
              { value: 'anita', label: 'Anita Tse' },
              { value: 'abraham', label: 'Abraham Torres' },
              { value: 'leo', label: 'Leo Lin' },
              { value: 'sam', label: 'Sam Veloso' }];

  handleChange = name => event => {
    if (name == 'adminLevel') this.setState({ adminLevel: event.target.value});
    const { value } = event.target;
    this.setState(prevState => ({
      profile: {
        ...prevState.profile,
        [name]: value,
      },
    }));
  };

  handleClose = profile => event => {
    this.setState({ dialog: false });
    this.props.saveProfile(profile)
  }

  handleOpen = event => {
    this.setState({ dialog: true });
  }

  render() {
    const { classes, saveProfile, cancelEdit } = this.props;
    const { profile, dialog, adminLevel } = this.state;

    return (
      <div>
        <Grid container spacing={24}>
          <Grid item sm={12}>
            <Typography variant="h5" className={classes.title}>
              Add Employee
            </Typography>
            <Typography
              className={classes.subHeading}
              variant="subtitle1"
              color="textSecondary"
            >
              Name
            </Typography>
            <div className={classes.fieldContainer}>
              <TextField
                value={profile.firstname}
                label="First Name"
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
                label="Last Name"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={this.handleChange('lastname')}
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
                value={profile.sin}
                label="SIN"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={this.handleChange('sin')}
              />
            </div>
            <div className={classes.fieldContainer}>
              <TextField
                label="Position"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth
              />
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
              />
            </div>
            <div className={classes.fieldContainer}>
              <TextField
                label="Direct Report"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className={classes.fieldContainer}>
              <TextField
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
                value={profile.remainingVacationDays}
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
                select
                value={profile.adminLevel}
                label="Admin Level"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={this.handleChange('adminLevel')}
              >
                <MenuItem key={0} value={0}>
                  Employee
                </MenuItem>
                <MenuItem key={1} value={1}>
                  Manager
                </MenuItem>
                <MenuItem key={2} value={2}>
                  Admin
                </MenuItem>
              </TextField>
            </div>
            <Typography
              className={classes.subHeading}
              variant="subtitle1"
              color="textSecondary"
            >
              Contact Information
            </Typography>
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
              Manager(s)
            </Typography>
            <div className={classes.fieldContainer}>
            <Select
                defaultValue={[]}
                isMulti
                name="managers"
                options={this.people}
                className="basic-multi-select"
                classNamePrefix="select"
                theme={(theme) => ({
                  ...theme,
                  colors: {
                  ...theme.colors,
                    primary25: 'orange',
                    primary: 'orange',
                  },
                })}
            />
            </div>
            { adminLevel == 1 &&
                <div>
                  <Typography
                    className={classes.subHeading}
                    variant="subtitle1"
                    color="textSecondary"
                  >
                    Employees
                  </Typography>
                  <div className={classes.fieldContainer}>
                  <Select
                      defaultValue={[]}
                      isMulti
                      name="employees"
                      options={this.people}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      theme={(theme) => ({
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
            }
          </Grid>
        </Grid>
        <NewEmployeeDialog profile={profile} open={dialog} handleClose={this.handleClose(profile)}/> 
        <Button className={classes.cancelButton} onClick={this.cancelEdit}>
          Cancel
        </Button>
        <Button
          className={classes.formButton}
          onClick={this.handleOpen}
        >
          Save
        </Button>
      </div>
    );
  }
}

AddEmployeeForm.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  saveProfile: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired
};

export default withStyles(styles)(AddEmployeeForm);
