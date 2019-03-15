/**
 *
 * Profile
 *
 */

import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { selectProfile, selectRole} from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import CompetencyCard from '../../components/CompetencyCard';

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
  fieldContainer: {
    width: '100%',
    marginBottom: '15px',
  },
  positionName: {
    display: 'inline',
    marginTop: '30px',
  },
  formSubheading: {
    display: 'inline',
  },
  container: {
    width: '95%',
    marginLeft: '2.5%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  topFieldContainer: {
    width: '100%',
    marginBottom: '15px',
    marginTop: '50px',
  },
  textField: {
    width: '100%',
  },
});

class Profile extends React.PureComponent {
  componentDidMount() {
    this.props.getProfileData();
  }

  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const { classes, profile, role } = this.props;
    if (!profile) return null;
    return (
      <div>
        <h1>
          {profile.firstname} {profile.lastname}
        </h1>
        <Paper className={classes.root}>
          <AppBar position="static" className={classes.appBar}>
            <Tabs
              value={value}
              classes={{ indicator: classes.tabsIndicator }}
              onChange={this.handleChange}
            >
              <Tab disableRipple label="Employee Information" />
              <Tab disableRipple label="Contact Information" />
              <Tab disableRipple label="Role Information" />
            </Tabs>
          </AppBar>
          {value === 0 && (
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
                    <TableCell align="left">FT</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Typography variant="caption">STATUS</Typography>
                    </TableCell>
                    <TableCell align="left">Active</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}
          {value === 1 && (
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
          )}
          {value === 2 && (
            <div className="profile-card">
              <form
                className={classes.container}
                autoComplete="off"
              >
                <div className={classes.topFieldContainer}>
                  <Typography className={classes.positionName} variant="h5">
                    {role.name}
                  </Typography>
                </div>
                <div className={classes.fieldContainer}>
                  <Typography
                    className={classes.formSubheading}
                    variant="subtitle1"
                    color="textSecondary"
                  >
                    Description
                  </Typography>
                </div>
                <div className={classes.fieldContainer}>
                  <TextField
                    id="role-description"
                    multiline
                    rows="4"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    defaultValue={role.description}
                    InputProps={{ readOnly: true }}
                  />
                </div>
                <div className={classes.fieldContainer}>
                  <Typography
                    className={classes.formSubheading}
                    variant="subtitle1"
                    color="textSecondary"
                  >
                    Competencies
                  </Typography>
                </div>
                <CompetencyCard
                  dataObject={[{ name: '', description: '', rating: 0 }]}
                  disabled
                />
              </form>
            </div>
          )}
        </Paper>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object,
  role: PropTypes.object,
  getProfileData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  profile: selectProfile,
  role: selectRole,
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
