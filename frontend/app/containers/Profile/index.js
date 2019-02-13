/**
 *
 * Profile
 *
 */

import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  title: {
    marginLeft: '2.5%',
  },
  card: {
    marginLeft: '30px',
    marginBottom: '20px',
    paddingTop: '5px',
    paddingBottom: '5px',
    width: '75%',
    backgroundColor: '#ceefaa',
  }
});


/* eslint-disable react/prefer-stateless-function */
class Profile extends React.PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <h1>Jane Smith</h1>
        <Card className={classes.card}>
          <Typography className={classes.title} variant="h5">Employee Information</Typography>
        </Card>
        <Card className="profile-card">
          <CardContent>
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
                <TableRow>
                  <TableCell align="left">Vacation Days:</TableCell>
                  <TableCell align="left">XXX</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">FTE:</TableCell>
                  <TableCell align="left">XXX</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <div className="profile-card-spacer" />
        <Card className={classes.card}>
          <Typography className={classes.title} variant="h5">Contact Information</Typography>
        </Card>
        <Card className="profile-card">
          <CardContent>
            <Table className="profile-card-table">
              <TableBody>
                <TableRow>
                  <TableCell align="left">Address:</TableCell>
                  <TableCell align="left">
                    1234 Something Lane, Somecity, BC, V5T 3D4
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Phone Number:</TableCell>
                  <TableCell align="left">(604) 555-5555</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }
}

Performance.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);
