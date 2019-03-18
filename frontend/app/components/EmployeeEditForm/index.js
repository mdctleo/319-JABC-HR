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

const styles = theme => ({
  title: {
    display: 'inline',
  },
  subHeading: {
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
});

class EmployeeEditForm extends React.PureComponent {
  state = {
    profile: this.props.profile,
  };

  handleChange = name => event => {
    const { value } = event.target;
    this.setState(prevState => ({
      profile: {
        ...prevState.profile,
        [name]: value,
      },
    }));
  };

  render() {
    const { classes, saveProfile, cancelEdit } = this.props;
    const { profile } = this.state;

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
          </Grid>
        </Grid>
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
  cancelEdit: PropTypes.func.isRequired,
};

export default withStyles(styles)(EmployeeEditForm);
