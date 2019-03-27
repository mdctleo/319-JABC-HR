/**
 *
 * Employees
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import orange from '@material-ui/core/colors/orange';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Paper from '@material-ui/core/Paper/Paper';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Tabs from '@material-ui/core/Tabs/Tabs';
import Tab from '@material-ui/core/Tab/Tab';

import AddEmployeePage from './AddEmployeePage';
import EmployeeTable from './EmployeeTable';
import EmployeeViewPage from './EmployeeView/EmployeeViewPage';
import GenerateReport from 'components/GenerateReport';
import actions from './actions';
import connect from 'react-redux/es/connect/connect';
import reducer from './reducer';
import saga from './saga';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  selectAllEmployees,
  selectSelectedEmployee,
  selectEmployeeDomainJS,
  selectAllRoles,
  selectSelectedEmployees,
  selectEmployees, 
  selectManagers,
} from './selectors';
import { selectProfile } from '../App/selectors'

const styles = theme => ({
  root: {
    width: '95%',
    marginTop: theme.spacing.unit * 3,
    marginLeft: '2.5%',
    paddingBottom: '100px',
  },
  addButton: {
    display: 'inline',
    float: 'right',
    marginTop: '50px',
    marginRight: '2.5%',
    color: 'white',
    width: '150px',
    backgroundColor: '#ff6600',
    borderRadius: '15px',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#ff944d',
    },
  },
  formButtons: {
    float: 'right',
    display: 'inline',
    color: 'white',
    width: '100px',
    marginRight: '2.5%',
    backgroundColor: '#ff6600',
    borderRadius: '15px',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#ff944d',
    },
  },
  table: {
    minWidth: 800,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  tabsIndicator: {
    backgroundColor: '#ff5000',
  },
  miniTabs: {
    backgroundColor: 'white',
  },
  typography: {
    padding: theme.spacing.unit * 3,
  },
  container: {
    width: '75%',
    marginTop: '50px',
    marginLeft: '5%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  employeeName: {
    display: 'inline',
    marginTop: '30px',
    marginBottom: '30px',
  },
  topFieldContainer: {
    marginTop: '30px',
  },
  textField: {
    width: '90%',
  },
  fieldContainer: {
    width: '100%',
    marginBottom: '15px',
  },
  positionName: {
    marginTop: '30px',
  },
  formSubheading: {
    marginTop: '30px',
  },
  card: {
    width: '75%',
  },
  fab: {
    marginTop: '30px',
    marginBottom: '30px',
    marginLeft: '37.5%',
    display: 'inline',
    backgroundColor: ' #00954D',
    color: 'white',
  },
  formControl: {
    float: 'right',
    marginRight: '2.5%',
    marginBottom: '30px',
    width: '200px',
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
  editWPButton: {
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
  docDisplay: {
    marginTop: '30px',
    marginLeft: '30px',
  },
  saveButton: {
    float: 'right',
    display: 'inline',
    color: 'white',
    height: '40px',
    width: '100px',
    marginTop: '30px',
    marginRight: '20px',
    backgroundColor: '#ff6600',
    borderRadius: '15px',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#ff944d',
    },
  },
  cancelButton: {
    float: 'right',
    display: 'inline',
    height: '40px',
    width: '100px',
    marginTop: '30px',
    marginLeft: '20px',
    borderRadius: '15px',
  },
  colorSwitchBase: {
    color: orange[300],
    '&$colorChecked': {
      color: orange[500],
      '& + $colorBar': {
        backgroundColor: orange[500],
      },
    },
  },
  colorBar: {},
  colorChecked: {},
  switch: {
    float: 'right',
    display: 'inline',
  },
  addOIButton: {
    float: 'right',
    color: 'white',
    width: '250px',
    padding: '0',
    height: '40px',
    backgroundColor: '#ff6600',
    borderRadius: '15px',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#ff944d',
    },
  },
  onBoardingHeader: {
    height: '50px',
    width: '100%',
  },
  addOIDialogField: {
    marginBottom: '30px',
  },
});

class EnhancedTable extends React.Component {
  componentDidMount() {
    this.props.getAllEmployees();
  }

  componentWillMount() {
    this.unlisten = this.props.history.listen(() => {
      this.handleBackButton();
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  handleBackButton = () => {
    this.props.selectEmployee(null);
    this.props.setEditing(false);
    this.props.setGeneratingReport(false);
    window.scrollTo(0, 0);
  };

  handleAddButton = (event, value) => {
    this.props.setEditing(true);
  };

  handleCloseAddOIDialog = event => {
    this.setState({ addOIDialog: false });
  };

  selectProfile = profile => {
    this.props.selectEmployee(profile.id);
  };

  addProfile = profile => {
    this.props.addEmployee(profile);
  };

  cancelEdit = () => {
    this.props.setEditing(false);
  };

  generateReport = () => {
    this.props.setGeneratingReport(true);
  };

  render() {
    const {
      classes,
      employeeDomain,
      allEmployees,
      allRoles,
      selectedEmployee,
      selectedEmployeeList,
    } = this.props;
    const { tableSettings, editing, generatingReport } = employeeDomain;

    const body = generatingReport ? (
      <Paper className={classes.root}>
        <AppBar position="static" width="100%">
          <Tabs
            value={0}
            classes={{
              indicator: classes.tabsIndicator,
            }}
          >
            <Tab
              disableRipple
              classes={{ selected: classes.tabSelected }}
              onClick={this.handleBackButton}
              label="<  Back"
            />
          </Tabs>
        </AppBar>
        <GenerateReport employees={selectedEmployeeList} classes={classes} />
      </Paper>
    ) : (
      <React.Fragment>
        {!selectedEmployee && (
          <Button className={classes.addButton} onClick={this.handleAddButton}>
            Add Employee
          </Button>
        )}
        {!selectedEmployee &&
          editing && (
            <AddEmployeePage
              handleBackButton={this.handleBackButton}
              addProfile={this.addProfile}
              allRoles={allRoles}
            />
          )}
        {!selectedEmployee &&
          !editing && (
            <EmployeeTable
              allEmployees={allEmployees}
              allRoles={allRoles}
              selectProfile={this.selectProfile}
              tableSettings={tableSettings}
              updateTableSettings={this.props.updateTableSettings}
              generateReport={this.generateReport}
              getEmployeeData={this.props.getEmployeeData}
            />
          )}
        {selectedEmployee && (
          <EmployeeViewPage
            selectedEmployee={selectedEmployee}
            currentEmployee={this.props.currentEmployee}
            allEmployees={this.props.allEmployees}
            managers={this.props.managers}
            employees={this.props.employees}
            allRoles={allRoles}
            handleBackButton={this.handleBackButton}
            editing={editing}
            setEditing={this.props.setEditing}
            saveProfile={profile => this.props.saveEmployee(profile)}
            updatePassword={this.props.updatePassword}
          />
        )}
      </React.Fragment>
    );

    return (
      <div>
        <h1>Manage Employees</h1>
        {body}
      </div>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  allEmployees: PropTypes.array,
  allRoles: PropTypes.object,
  employeeDomain: PropTypes.object.isRequired,
  updateTableSettings: PropTypes.func.isRequired,
  getAllEmployees: PropTypes.func.isRequired,
  selectEmployee: PropTypes.func.isRequired,
  setEditing: PropTypes.func.isRequired,
  selectedEmployee: PropTypes.object,
  addEmployee: PropTypes.func.isRequired,
  saveEmployee: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
  setGeneratingReport: PropTypes.func.isRequired,
  selectedEmployeeList: PropTypes.array.isRequired,
  history: PropTypes.object,
  getEmployeeData: PropTypes.func,
  currentEmployee: PropTypes.object,
  managers: PropTypes.array,
  employees: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  allEmployees: selectAllEmployees,
  allRoles: selectAllRoles,
  selectedEmployee: selectSelectedEmployee,
  employeeDomain: selectEmployeeDomainJS,
  selectedEmployeeList: selectSelectedEmployees,
  currentEmployee: selectProfile,
  managers: selectManagers,
  employees: selectEmployees,
});

const mapDispatchToProps = {
  ...actions,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'employees', reducer });
const withSaga = injectSaga({ key: 'employees', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(EnhancedTable);
