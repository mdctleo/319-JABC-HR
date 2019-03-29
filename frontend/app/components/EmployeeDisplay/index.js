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
    wordWrap: 'break-word',
  },
  titleWrapper: {
    width: '75%',
  },
  subHeading: {
    marginTop: '40px',
  },
  displayTable: {
    marginTop: '20px',
    tableLayout: 'fixed',
    width: '100%',
  },
  leftCell: {
    width: '50%',
  },
  row: {
    width: '60%',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  rightCell: {
    wordWrap: 'break-word',
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

  getAdminLevel() {
    switch (this.props.profile.adminLevel) {
      case 0:
        return 'Employee';
      case 1:
        return 'Manager';
      case 2:
        return 'Admin';
      default:
        return '';
    }
  }

  render() {
    const {
      classes,
      profile,
      isAdmin,
      roleName,
      managers,
      employees,
    } = this.props;

    return (
      <div className="profile-card">
        <div className={classes.titleWrapper}>
          <Typography variant="h5" className={classes.title}>
            {profile.firstname} {profile.lastname}
          </Typography>
        </div>
        <Typography
          className={classes.subHeading}
          variant="subtitle1"
          color="textSecondary"
        >
          Personal Information
        </Typography>
        <Table className={classes.displayTable}>
          <TableBody>
            <TableRow className={classes.row}>
              <TableCell align="left" className={classes.rightCell}>
                <Typography variant="caption">EMAIL</Typography>
              </TableCell>
              <TableCell align="left" className={classes.rightCell}>
                {profile.email}
              </TableCell>
            </TableRow>
            <TableRow className={classes.row}>
              <TableCell align="left" className={classes.rightCell}>
                <Typography variant="caption">SIN</Typography>
              </TableCell>
              <TableCell align="left" className={classes.rightCell}>
                {profile.sin}
              </TableCell>
            </TableRow>
            <TableRow className={classes.row}>
              <TableCell className={classes.leftCell} align="left">
                <Typography variant="caption">BIRTH DATE</Typography>
              </TableCell>
              <TableCell align="left" className={classes.rightCell}>
                {profile.birthdate}
              </TableCell>
            </TableRow>
            <TableRow className={classes.row}>
              <TableCell className={classes.leftCell} align="left">
                <Typography variant="caption">ADDRESS</Typography>
              </TableCell>
              <TableCell align="left" className={classes.rightCell}>
                {profile.address}
              </TableCell>
            </TableRow>
            <TableRow className={classes.row}>
              <TableCell className={classes.leftCell} align="left">
                <Typography variant="caption">PHONE NUMBER</Typography>
              </TableCell>
              <TableCell align="left" className={classes.rightCell}>
                {profile.phoneNumber}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
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
                  <Typography variant="caption">DATE JOINED</Typography>
                </TableCell>
                <TableCell align="left" className={classes.rightCell}>
                  {profile.dateJoined}
                </TableCell>
              </TableRow>
            )}
            {isAdmin && (
              <TableRow className={classes.row}>
                <TableCell className={classes.leftCell} align="left">
                  <Typography variant="caption">STATUS</Typography>
                </TableCell>
                <TableCell align="left" className={classes.rightCell}>
                  {this.getStatus()}
                </TableCell>
              </TableRow>
            )}
            <TableRow className={classes.row}>
              <TableCell className={classes.leftCell} align="left">
                <Typography variant="caption">POSITION</Typography>
              </TableCell>
              <TableCell align="left" className={classes.rightCell}>
                {roleName}
              </TableCell>
            </TableRow>
            <TableRow className={classes.row}>
              <TableCell className={classes.leftCell} align="left">
                <Typography variant="caption">SALARY</Typography>
              </TableCell>
              <TableCell align="left" className={classes.rightCell}>
                {!isNaN(profile.salary) &&
                  this.salaryFormatter.format(profile.salary)}
              </TableCell>
            </TableRow>
            <TableRow className={classes.row}>
              <TableCell className={classes.leftCell} align="left">
                <Typography variant="caption">EMPLOYEE TYPE</Typography>
              </TableCell>
              <TableCell align="left" className={classes.rightCell}>
                {profile.fte === 0 ? 'Part time' : 'Full time'}
              </TableCell>
            </TableRow>
            <TableRow className={classes.row}>
              <TableCell className={classes.leftCell} align="left">
                <Typography variant="caption">ANNUAL VACATION DAYS</Typography>
              </TableCell>
              <TableCell align="left" className={classes.rightCell}>
                {profile.vacationDays}
              </TableCell>
            </TableRow>
            <TableRow className={classes.row}>
              <TableCell className={classes.leftCell} align="left">
                <Typography variant="caption">
                  VACATION DAYS REMAINING
                </Typography>
              </TableCell>
              <TableCell align="left" className={classes.rightCell}>
                {profile.remainingVacationDays}
              </TableCell>
            </TableRow>
            <TableRow className={classes.row}>
              <TableCell className={classes.leftCell} align="left">
                <Typography variant="caption">ADMIN LEVEL</Typography>
              </TableCell>
              <TableCell align="left" className={classes.rightCell}>
                {this.getAdminLevel()}
              </TableCell>
            </TableRow>
            {managers &&
              managers.length > 0 && (
                <TableRow className={classes.row}>
                  <TableCell className={classes.leftCell} align="left">
                    <Typography variant="caption">MANAGER(S)</Typography>
                  </TableCell>
                  <TableCell align="left" className={classes.rightCell}>
                    {managers
                      .map(e => `${e.firstname} ${e.lastname}`)
                      .join(', ')}
                  </TableCell>
                </TableRow>
              )}
            {employees &&
              employees.length > 0 && (
                <TableRow className={classes.row}>
                  <TableCell className={classes.leftCell} align="left">
                    <Typography variant="caption">EMPLOYEE(S)</Typography>
                  </TableCell>
                  <TableCell align="left" className={classes.rightCell}>
                    {employees
                      .map(e => `${e.firstname} ${e.lastname}`)
                      .join(', ')}
                  </TableCell>
                </TableRow>
              )}
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
  managers: PropTypes.array.isRequired,
  employees: PropTypes.array.isRequired,
};

export default withStyles(styles)(EmployeeDisplay);
