/**
 *
 * EmployeeDisplay
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


const styles = theme => ({
  title: {
    display: 'inline',
  },
  subHeading: {
    marginTop: '40px'
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
});

class EmployeeDisplay extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, state } = this.props;

    var profile = state.profile;

    return (
        <div className="profile-card">
          <Typography variant="h5" className={classes.title}>{profile.firstname} {profile.lastname}</Typography>
          <Typography className={classes.subHeading} variant="subtitle1" color="textSecondary">Employee Information</Typography>
        <Table className={classes.displayTable}>
          <TableBody>
          {state.loginCred == 1 &&
          <TableRow className={classes.row}>
              <TableCell className={classes.leftCell} align="left"><Typography variant="caption">STATUS</Typography></TableCell>
              <TableCell align="left">{profile.status}</TableCell>
            </TableRow>}
            <TableRow className={classes.row}>
              <TableCell className={classes.leftCell} align="left"><Typography variant="caption">EMPLOYEE ID</Typography></TableCell>
              <TableCell align="left">{profile.id}</TableCell>
            </TableRow>
            <TableRow className={classes.row}>
            <TableCell align="left"><Typography variant="caption">SIN</Typography></TableCell>
              <TableCell align="left">{profile.sin}</TableCell>
            </TableRow>
            <TableRow className={classes.row}>
              <TableCell className={classes.leftCell} align="left"><Typography variant="caption">POSITION</Typography></TableCell>
              <TableCell align="left">{profile.role.name}</TableCell>
            </TableRow>
            <TableRow className={classes.row}>
              <TableCell className={classes.leftCell} align="left"><Typography variant="caption">SALARY</Typography></TableCell>
              <TableCell align="left">{profile.salary}</TableCell>
            </TableRow>
            <TableRow className={classes.row}>
              <TableCell className={classes.leftCell} align="left"><Typography variant="caption">DIRECT REPORT</Typography></TableCell>
              <TableCell align="left">{profile.manager}</TableCell>
            </TableRow>
            <TableRow className={classes.row}>
              <TableCell className={classes.leftCell} align="left"><Typography variant="caption">EMPLOYEE TYPE</Typography></TableCell>
              <TableCell align="left">{profile.type}</TableCell>
            </TableRow>
            <TableRow className={classes.row}>
              <TableCell className={classes.leftCell} align="left"><Typography variant="caption">VACATION DAYS REMAINING</Typography></TableCell>
              <TableCell align="left">{profile.remainingVacationDays}</TableCell>
            </TableRow>
            </TableBody>
            </Table>
            <Typography className={classes.subHeading} variant="subtitle1" color="textSecondary">Contact Information</Typography>
            <Table className={classes.displayTable}>
              <TableBody>
            <TableRow className={classes.row}>
              <TableCell className={classes.leftCell} align="left"><Typography variant="caption">ADDRESS</Typography></TableCell>
              <TableCell align="left">
                {profile.address}
              </TableCell>
            </TableRow>
            <TableRow className={classes.row}>
              <TableCell className={classes.leftCell} align="left"><Typography variant="caption">PHONE NUMBER</Typography></TableCell>
              <TableCell align="left">{profile.phone}</TableCell>
            </TableRow>
          </TableBody>
        </Table> 
        </div>
    );
  }
}

EmployeeDisplay.propTypes = {
  classes: PropTypes.object.isRequired,
  state: PropTypes.object,
};

export default withStyles(styles)(EmployeeDisplay);
