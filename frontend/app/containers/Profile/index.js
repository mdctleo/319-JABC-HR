/**
 *
 * Profile
 *
 */

import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Typography';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

/* eslint-disable react/prefer-stateless-function */
export default class Profile extends React.PureComponent {
  render() {
    return <div>
              <h1>Jane Smith</h1>
              <Card className="profile-card">
              <CardContent>
              <Typography variant="subtitle1" color="textSecondary">
              Employee Information</Typography>
              <Table className="profile-card-table">
                <TableBody>
                  <TableRow>
                    <TableCell align="left">Employee ID:</TableCell>
                    <TableCell align="left">123 456</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">SIN:</TableCell>
                    <TableCell align="left">123 456 789</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Position:</TableCell>
                    <TableCell align="left">Developer</TableCell>
                  </TableRow>
                </TableBody>
               </Table>
              </CardContent>
              </Card>
              <div className="profile-card-spacer"></div>
              <Card className="profile-card">
              <CardContent>
              <Typography variant="subtitle1" color="textSecondary">
              Contact Information</Typography>
              <Table className="profile-card-table">
                <TableBody>
                  <TableRow>
                    <TableCell align="left">Address:</TableCell>
                    <TableCell align="left">1234 Something Lane, Somecity, BC, V5T 3D4</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Phone Number:</TableCell>
                    <TableCell align="left">(604) 555-5555</TableCell>
                  </TableRow>
                </TableBody>
               </Table>
              </CardContent>
              </Card>
           </div>;
  }
}
