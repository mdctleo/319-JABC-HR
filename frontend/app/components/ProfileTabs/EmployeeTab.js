/**
 *
 * EmployeeTab
 *
 */

import React from 'react';
import Table from '@material-ui/core/Table/Table';
import TableBody from '@material-ui/core/TableBody/TableBody';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import Typography from '@material-ui/core/Typography/Typography';
import PropTypes from 'prop-types';

class EmployeeTab extends React.PureComponent {
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
    const { profile, role } = this.props;
    return (
      <div className="profile-card">
        <Table className="profile-card-table">
          <TableBody>
            <TableRow>
              <TableCell align="left">
                <Typography variant="caption">EMPLOYEE ID</Typography>
              </TableCell>
              <TableCell align="left">{profile.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">
                <Typography variant="caption">SIN</Typography>
              </TableCell>
              <TableCell align="left">{profile.sin}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">
                <Typography variant="caption">POSITION</Typography>
              </TableCell>
              <TableCell align="left">{role && role.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">
                <Typography variant="caption">
                  VACATION DAYS REMAINING
                </Typography>
              </TableCell>
              <TableCell align="left">
                {profile.remainingVacationDays}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">
                <Typography variant="caption">EMPLOYEE TYPE</Typography>
              </TableCell>
              <TableCell align="left">
                {profile.fte === 0 ? 'Part time' : 'Full time'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">
                <Typography variant="caption">STATUS</Typography>
              </TableCell>
              <TableCell align="left">{this.getStatus()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">
                <Typography variant="caption">SALARY</Typography>
              </TableCell>
              <TableCell align="left">{this.salaryFormatter.format(profile.salary)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">
                <Typography variant="caption">DIRECT REPORT</Typography>
              </TableCell>
              <TableCell align="left">Sarah James</TableCell> {/* TODO */}
            </TableRow>
            <TableRow>
              <TableCell align="left">
                <Typography variant="caption">ADDRESS</Typography>
              </TableCell>
              <TableCell align="left">{profile.address}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">
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

EmployeeTab.propTypes = {
  profile: PropTypes.object,
  role: PropTypes.object,
};

export default EmployeeTab;
