/**
 *
 * ContactTab
 *
 */

import React from 'react';
import Table from '@material-ui/core/Table/Table';
import TableBody from '@material-ui/core/TableBody/TableBody';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import Typography from '@material-ui/core/Typography/Typography';
import PropTypes from 'prop-types';

class ContactTab extends React.PureComponent {
  render() {
    const { profile } = this.props;
    return (
      <div className="profile-card">
        <Table className="profile-card-table">
          <TableBody>
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

ContactTab.propTypes = {
  profile: PropTypes.object,
};

export default ContactTab;
