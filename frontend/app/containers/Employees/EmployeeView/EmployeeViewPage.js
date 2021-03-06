import Paper from '@material-ui/core/Paper/Paper';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Tabs from '@material-ui/core/Tabs/Tabs';
import Tab from '@material-ui/core/Tab/Tab';
import Button from '@material-ui/core/Button/Button';
import EmployeeDisplay from 'components/EmployeeDisplay/index';
import EmployeeEditForm from 'components/EmployeeEditForm/index';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

import EmployeePerformance from '../../EmployeePerformance';
import EmployeeOnboarding from '../../EmployeeOnboarding/Loadable';
import EmployeeHistory from '../../EmployeeHistory/Loadable';

const styles = theme => ({
  root: {
    width: '95%',
    marginTop: theme.spacing.unit * 3,
    marginLeft: '2.5%',
    paddingBottom: '100px',
  },
  tabsIndicator: {
    backgroundColor: '#ff5000',
  },
  editButton: {
    marginRight: '25%',
    float: 'right',
    display: 'inline',
    color: 'white',
    width: '100px',
    backgroundColor: '#ff6600',
    borderRadius: '15px',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#ff944d',
    },
  },
});

class EmployeeViewPage extends React.PureComponent {
  state = {
    currentTab: 1,
  };

  handleTabChange = (event, value) => {
    this.setState({ currentTab: value });
    this.props.setEditing(false);
  };

  render() {
    const {
      classes,
      editing,
      selectedEmployee,
      handleBackButton,
      allRoles,
      currentEmployee,
    } = this.props;
    const { currentTab } = this.state;

    let role;
    if (
      selectedEmployee &&
      selectedEmployee.fkRole &&
      allRoles &&
      allRoles[selectedEmployee.fkRole]
    ) {
      role = allRoles[selectedEmployee.fkRole];
    }

    const sortedRoles =
      allRoles &&
      Object.keys(allRoles)
        .map(key => allRoles[key])
        .sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });

    return (
      <Paper className={classes.root}>
        <div>
          <AppBar position="static" width="100%">
            <Tabs
              value={currentTab}
              classes={{
                indicator: classes.tabsIndicator,
              }}
              onChange={this.handleTabChange}
            >
              <Tab
                disableRipple
                classes={{
                  selected: classes.tabSelected,
                }}
                onClick={handleBackButton}
                label="<  Back"
              />
              <Tab
                disableRipple
                classes={{
                  selected: classes.tabSelected,
                }}
                label="Profile"
              />
              <Tab
                disableRipple
                classes={{
                  selected: classes.tabSelected,
                }}
                label="Performance"
              />
              <Tab
                disableRipple
                classes={{
                  selected: classes.tabSelected,
                }}
                label="Onboarding"
              />
              <Tab
                disableRipple
                classes={{
                  selected: classes.tabSelected,
                }}
                label="History"
              />
            </Tabs>
          </AppBar>
          {currentTab === 1 &&
            !editing && (
              <div>
                {(currentEmployee.adminLevel >= 2 ||
                  currentEmployee.id !== selectedEmployee.id) && (
                  <Button
                    className={classes.editButton}
                    onClick={() => this.props.setEditing(true)}
                  >
                    Edit
                  </Button>
                )}
                <EmployeeDisplay
                  isAdmin
                  profile={selectedEmployee}
                  roleName={role && role.name}
                  managers={this.props.managers}
                  employees={this.props.employees}
                />
              </div>
            )}
          {currentTab === 1 &&
            editing && (
              <div className="profile-card">
                <EmployeeEditForm
                  profile={selectedEmployee}
                  currentEmployee={this.props.currentEmployee}
                  allEmployees={this.props.allEmployees}
                  managers={this.props.managers}
                  employees={this.props.employees}
                  saveProfile={this.props.saveProfile}
                  updatePassword={this.props.updatePassword}
                  cancelEdit={() => this.props.setEditing(false)}
                  allRoles={sortedRoles}
                />
              </div>
            )}
          {currentTab === 2 && (
            <EmployeePerformance selectedEmployee={selectedEmployee} />
          )}
          {currentTab === 3 && <EmployeeOnboarding selectedEmployee={selectedEmployee} />}
          {currentTab === 4 && (
            <EmployeeHistory selectedEmployee={selectedEmployee} />
          )}
        </div>
      </Paper>
    );
  }
}

EmployeeViewPage.propTypes = {
  classes: PropTypes.object.isRequired,
  setEditing: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
  selectedEmployee: PropTypes.object.isRequired,
  handleBackButton: PropTypes.func.isRequired,
  allRoles: PropTypes.object,
  saveProfile: PropTypes.func.isRequired,
  currentEmployee: PropTypes.object,
  allEmployees: PropTypes.array,
  managers: PropTypes.array,
  employees: PropTypes.array,
  updatePassword: PropTypes.func.isRequired,
};

export default withStyles(styles)(EmployeeViewPage);
