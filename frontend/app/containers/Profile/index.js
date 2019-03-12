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
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '95%',
    marginTop: theme.spacing.unit * 3,
    marginLeft: '2.5%',
    paddingBottom: '30px',
  },
  tabsIndicator: {
    display: 'inline-block',
    backgroundColor: '#ff5000',
  },
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

  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value }  = this.state;
    const { classes, profile } = this.props;
    if (!profile) return null;
    return (
      <div>
        <h1>{profile.firstname} {profile.lastname}</h1>
        <Paper className={classes.root}>
          <AppBar position="static" className={classes.appBar}>
            <Tabs value={value} classes={{ indicator: classes.tabsIndicator }}
                  onChange={this.handleChange}>
              <Tab disableRipple label="Employee Information" />
              <Tab disableRipple label="Contact Information" />
            </Tabs>
           </AppBar>
           { value == 0 ?
            (<div className="profile-card">
            <Table className="profile-card-table">
              <TableBody>
                <TableRow>
                  <TableCell align="left"><Typography variant="caption">EMPLOYEE ID</Typography></TableCell>
                  <TableCell align="left">{profile.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left"><Typography variant="caption">SIN</Typography></TableCell>
                  <TableCell align="left">{profile.sin}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left"><Typography variant="caption">POSITION</Typography></TableCell>
                  <TableCell align="left">{profile.role.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left"><Typography variant="caption">VACATION DAYS REMAINING</Typography></TableCell>
                  <TableCell align="left">{profile.remainingVacationDays}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left"><Typography variant="caption">EMPLOYEE TYPE</Typography></TableCell>
                  <TableCell align="left">FT</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left"><Typography variant="caption">STATUS</Typography></TableCell>
                  <TableCell align="left">Active</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            </div>) :
            (<div className="profile-card">
            <Table className="profile-card-table">
              <TableBody>
                <TableRow>
                  <TableCell align="left"><Typography variant="caption">ADDRESS</Typography></TableCell>
                  <TableCell align="left">
                    {profile.address}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left"><Typography variant="caption">PHONE NUMBER</Typography></TableCell>
                  <TableCell align="left">{}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            </div>)
          }
     </Paper>
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
