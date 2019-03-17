/**
 *
 * EmployeeEditForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  title: {
    display: 'inline',
  },
  subHeading: {
    marginTop: '40px',
    marginBottom: '20px'
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
   }
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
});

class EmployeeEditForm extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  state = {
    status: this.props.state.profile.status,
    type: this.props.state.profile.type,
    labelWidth: 0,
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value})
  }

  render() {
    const { classes, state } = this.props;
    var profile = state.profile;

    return (
      <Grid container spacing={24}>
        <Grid item xs={18} sm={12}>
        <Typography variant="h5" className={classes.title}>Edit Profile</Typography>
        <Typography className={classes.subHeading} variant="subtitle1" color="textSecondary">Name</Typography>
        <div className={classes.fieldContainer}>
            <TextField
              id="edit-prof-fname"
              defaultValue={profile.firstname}
              label="First Name"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              fullWidth>
            </TextField>
         </div>
         <div className={classes.fieldContainer}>
            <TextField
              id="edit-prof-lname"
              defaultValue={profile.lastname}
              label="Last Name"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              fullWidth>
            </TextField>
         </div>
         <Typography className={classes.subHeading} variant="subtitle1" color="textSecondary">Employee Information</Typography>
         <div className={classes.fieldContainer}>
         <FormControl variant="outlined" id={classes.dropdown} fullWidth>
           <InputLabel>
             Status
           </InputLabel>
           <Select
             name='status'
             value={this.state.status}
             onChange={this.handleChange}
             input={
               <OutlinedInput
               labelWidth={this.state.labelWidth}
               id="edit-prof-status"/>
             }>
             <MenuItem value="Onboarding">Onboarding</MenuItem>
             <MenuItem value="Active">Active</MenuItem>
           </Select>
         </FormControl>
         </div>
        <div className={classes.fieldContainer}>
            <TextField
              id="edit-prof-id"
              defaultValue={profile.id}
              label="Employee ID"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              fullWidth>
            </TextField>
         </div>
         <div className={classes.fieldContainer}>
            <TextField
              id="edit-prof-sin"
              defaultValue={profile.sin}
              label="SIN"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              fullWidth>
            </TextField>
         </div>
         <div className={classes.fieldContainer}>
            <TextField
              id="edit-prof-position"
              defaultValue={profile.role.name}
              label="Position"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              fullWidth>
            </TextField>
         </div>
         <div className={classes.fieldContainer}>
            <TextField
              id="edit-prof-salary"
              defaultValue={profile.salary}
              label="Salary"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              fullWidth>
            </TextField>
         </div>
         <div className={classes.fieldContainer}>
            <TextField
              id="edit-prof-manager"
              defaultValue={profile.manager}
              label="Direct Report"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              fullWidth>
            </TextField>
         </div>
         <div className={classes.fieldContainer}>
         <FormControl variant="outlined" id={classes.dropdown} fullWidth>
           <InputLabel>
             Employee Type
           </InputLabel>
           <Select
              name='type'
              value={this.state.type}
              onChange={this.handleChange}
              input={
               <OutlinedInput
               labelWidth={this.state.labelWidth}
                id="edit-prof-type"/>
             }>
             <MenuItem value="FT">FT</MenuItem>
             <MenuItem value="PT">PT</MenuItem>
           </Select>
         </FormControl>
         </div>
         <div className={classes.fieldContainer}>
            <TextField
              id="edit-prof-vacation"
              defaultValue={profile.vacation}
              label="Vacation Days Remaining"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              fullWidth>
            </TextField>
         </div>
         <Typography className={classes.subHeading} variant="subtitle1" color="textSecondary">Employee Information</Typography>
         <div className={classes.fieldContainer}>
            <TextField
              id="edit-prof-address"
              defaultValue={profile.address}
              multiline
              rows="4"
              label="Address"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              fullWidth>
            </TextField>
         </div>
         <div className={classes.fieldContainer}>
            <TextField
              id="edit-prof-phone"
              defaultValue={profile.phone}
              label="Phone Number"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              fullWidth>
            </TextField>
         </div>
        </Grid>
       </Grid>);
    }
}

EmployeeEditForm.propTypes = {
  classes: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmployeeEditForm);
