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
    marginTop: '40px',
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
    this.salaryFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }

  getStatus() {
    switch (this.props.profile.status) {
      case 0:
        return 'Inactive';
      case 1:
        return 'Active';
      case 2:
        return 'Onboarding';
      case 3:
        return 'Probation';
      default:
        return '';
    }
  }

  render() {
    const { classes, profile, isAdmin, roleName } = this.props;

    return (
      <div className="profile-card">
        <Typography variant="h5" className={classes.title}>
          {profile.firstname} {profile.lastname}
        </Typography>
        <Typography
          className={classes.subHeading}
          variant="subtitle1"
          color="textSecondary"
        >
          Employee Information
        </Typography>
        <Table className={classes.displayTable}>
          <TableBody>
            {isAdmin && (
              <TableRow className={classes.row}>
                <TableCell className={classes.leftCell} align="left">
                  <Typography variant="caption">STATUS</Typography>
                </TableCell>
                <TableCell align="left">{this.getStatus()}</TableCell>
              </TableRow>
            )}
            <TableRow className={classes.row}>
              <TableCell className={classes.leftCell} align="left">
                <Typography variant="caption">EMPLOYEE ID</Typography>
              </TableCell>
              <TableCell align="left">{profile.id}</TableCell>
            </TableRow>
            <TableRow className={classes.row}>
              <TableCell align="left">
                <Typography variant="caption">SIN</Typography>
              </TableCell>
              <TableCell align="left">{profile.sin}</TableCell>
            </TableRow>
            <TableRow className={classes.row}>
              <TableCell className={classes.leftCell} align="left">
                <Typography variant="caption">POSITION</Typography>
              </TableCell>
              <TableCell align="left">{roleName}</TableCell>
            </TableRow>
            <TableRow className={classes.row}>
              <TableCell className={classes.leftCell} align="left">
                <Typography variant="caption">SALARY</Typography>
              </TableCell>
              <TableCell align="left">{this.salaryFormatter.format(profile.salary)}</TableCell>
            </TableRow>
            <TableRow className={classes.row}>
              <TableCell className={classes.leftCell} align="left">
                <Typography variant="caption">DIRECT REPORT</Typography>
              </TableCell>
              <TableCell align="left">{profile.manager}</TableCell>
            </TableRow>
            <TableRow className={classes.row}>
              <TableCell className={classes.leftCell} align="left">
                <Typography variant="caption">EMPLOYEE TYPE</Typography>
              </TableCell>
              <TableCell align="left">{profile.fte === 0 ? 'Part time' : 'Full time'}</TableCell>
            </TableRow>
            <TableRow className={classes.row}>
              <TableCell className={classes.leftCell} align="left">
                <Typography variant="caption">
                  VACATION DAYS REMAINING
                </Typography>
              </TableCell>
              <TableCell align="left">
                {profile.remainingVacationDays}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Typography
          className={classes.subHeading}
          variant="subtitle1"
          color="textSecondary"
        >
          Contact Information
        </Typography>
        <Table className={classes.displayTable}>
          <TableBody>
            <TableRow className={classes.row}>
              <TableCell className={classes.leftCell} align="left">
                <Typography variant="caption">ADDRESS</Typography>
              </TableCell>
              <TableCell align="left">{profile.address}</TableCell>
            </TableRow>
            <TableRow className={classes.row}>
              <TableCell className={classes.leftCell} align="left">
                <Typography variant="caption">PHONE NUMBER</Typography>
              </TableCell>
              <TableCell align="left">{profile.phoneNumber}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

EmployeeDisplay.propTypes = {
  classes: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  profile: PropTypes.object,
  roleName: PropTypes.string,
};

export default withStyles(styles)(EmployeeDisplay);
