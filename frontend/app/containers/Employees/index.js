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

import AddEmployeePage from './AddEmployeePage';
import EmployeeTable from './EmployeeTable';
import EmployeeViewPage from './EmployeeViewPage';
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
} from './selectors';

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

  saveProfile = profile => {
    const newData = this.state.data.concat(profile);
    this.setState({ data: newData });
  };

  handleBackButton = () => {
    this.props.selectEmployee(null);
    this.props.setEditing(false);
    window.scrollTo(0, 0);
  };

  handleAddButton = (event, value) => {
    this.props.setEditing(true);
  };

  handleAddOI = event => {
    this.setState({ addOIDialog: true });
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

  handleAddOIDialog = event => {
    const id = this.documents.length;
    const name = document.getElementById('addOI-dialog-name').value;
    const description = document.getElementById('addOI-dialog-description')
      .value;
    const date = document.getElementById('addOI-dialog-date').value;
    const newDoc = {
      id,
      name,
      description,
      dueDate: date,
      done: false,
      fileName: 'None',
    };
    this.documents.push(newDoc);
    this.setState({ addOIDialog: false });
  };

  documents = [
    {
      id: 1,
      name: 'Criminal record',
      description: 'Please upload your criminal record.',
      dueDate: '20/02/2019',
      done: false,
      fileName: 'None',
    },
    {
      id: 2,
      name: 'Visa',
      description: 'Please upload your visa.',
      dueDate: '20/02/2019',
      done: false,
      fileName: 'None',
    },
    {
      id: 3,
      name: 'Insurance form',
      description: 'Please upload your insurance form.',
      dueDate: '20/02/2019',
      done: true,
      fileName: 'None',
    },
  ];

  render() {
    const {
      classes,
      employeeDomain,
      allEmployees,
      allRoles,
      selectedEmployee,
    } = this.props;
    const { tableSettings, editing } = employeeDomain;

    return (
      <div>
        <h1>Manage Employees</h1>
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
              handleDeleteButton={this.handleDeleteButton}
              handleDeleteSingleButton={this.handleDeleteSingleButton}
            />
          )}
        {selectedEmployee && (
          <EmployeeViewPage
            selectedEmployee={selectedEmployee}
            allRoles={allRoles}
            handleBackButton={this.handleBackButton}
            editing={editing}
            setEditing={this.props.setEditing}
            saveProfile={profile => this.props.saveEmployee(profile)}
          />
        )}
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
};

const mapStateToProps = createStructuredSelector({
  allEmployees: selectAllEmployees,
  allRoles: selectAllRoles,
  selectedEmployee: selectSelectedEmployee,
  employeeDomain: selectEmployeeDomainJS,
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
