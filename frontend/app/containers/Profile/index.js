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
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import selectProfile from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions, {getData} from './actions';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';

const styles = theme => ({
  title: {
    marginLeft: '2.5%',
    color: 'white',
  },
  card: {
    marginLeft: '30px',
    marginBottom: '20px',
    paddingTop: '5px',
    paddingBottom: '5px',
    width: '75%',
    backgroundColor: '#00954D',
  },
});

class Profile extends React.PureComponent {
  componentDidMount() {
    this.props.getData();
  }

  render() {
    const { classes, profile } = this.props;
    if (!profile) return null;
    return (
      <div>
        <h1>{profile.name}</h1>
        <Card className={classes.card}>
          <Typography className={classes.title} variant="subheading">Employee Information</Typography>
        </Card>
        <Card className="profile-card">
          <CardContent>
            <Table className="profile-card-table">
              <TableBody>
                <TableRow>
                  <TableCell align="left">Employee ID:</TableCell>
                  <TableCell align="left">{profile.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">SIN:</TableCell>
                  <TableCell align="left">{profile.sin}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Position:</TableCell>
                  <TableCell align="left">{profile.role.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Vacation Days:</TableCell>
                  <TableCell align="left">{profile.remainingVacationDays}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">FTE:</TableCell>
                  <TableCell align="left">{profile.fte}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <div className="profile-card-spacer" />
        <Card className={classes.card}>
          <Typography className={classes.title} variant="subheading">Contact Information</Typography>
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

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object,
  getData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  profile: selectProfile(),
});

const mapDispatchToProps = {
  ...actions,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'profile', reducer });
const withSaga = injectSaga({ key: 'profile', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(Profile);
