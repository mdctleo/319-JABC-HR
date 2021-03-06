/**
 *
 * EmployeeOnboarding
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import actions from './actions';
import reducer from './reducer';
import saga from './saga';
import Typography from '@material-ui/core/Typography/Typography';
import Button from '@material-ui/core/Button/Button';
import DocumentsContainer from '../Employees/DocumentsContainer'
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import TextField from '@material-ui/core/TextField/TextField';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import MenuItem from '@material-ui/core/MenuItem';
import orange from '@material-ui/core/colors/orange';
import { withStyles } from '@material-ui/core';
import {selectTasks, selectAllDocTypes} from './selectors';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';

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
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

/* eslint-disable react/prefer-stateless-function */
export class EmployeeOnboarding extends React.PureComponent {
  state = {
    addOIDialog: false,
    editOIDialog: false,
    selectedDocType: "",
    requireDoc: "0"
  };

  componentDidMount() {
    this.props.getAllDocTypes();
    this.props.getTasks(this.props.selectedEmployee.id);
  }

  handleChange = event => {
    const { value } = event.target;
    this.setState( {selectedDocType: value} );
  };

  handleChangeRequiredDoc = event => {
    const { value } = event.target;
    this.setState( {selectedDocType: "", requireDoc: value} );
  };

  handleAddOI = () => {
    this.setState({ addOIDialog: true });
  };

  handleAddOIDialog = () => {
    const id = this.props.tasks.length;
    const description = document.getElementById('addOI-dialog-description').value;
    const dueDate = document.getElementById('addOI-dialog-dueDate').value || undefined;

    const onboardingTask = {
      id,
      name,
      description,
      dueDate,
      fkDocumentType: this.state.selectedDocType,
      fkEmployee: this.props.selectedEmployee.id,
      requireDoc: this.state.requireDoc,
      status: 0
    };

    this.props.createTask(this.props.selectedEmployee.id, onboardingTask);
    this.handleCloseAddOIDialog();
  };

  handleCloseAddOIDialog = () => {
    this.setState({addOIDialog: false, selectedDocType: "", requireDoc: 0 });
  };

  render() {
    const { allDocTypes, classes, tasks } = this.props;
    const { requireDoc, selectedDocType, addOIDialog, editOIDialog } = this.state;

    return (
      <div className="profile-card">
        <div className={classes.onBoardingHeader}>
          <Typography className={classes.employeeName} variant="h5">
            Onboarding Items
          </Typography>
          <Button className={classes.addOIButton} onClick={this.handleAddOI}>
            Add Onboarding Item
          </Button>
        </div>
        <DocumentsContainer tasks={tasks}
                        downloadFile={this.props.downloadFile} />

        <Dialog
          open={addOIDialog}
          onClose={this.handleCloseAddOIDialog}
          aria-labelledby="addOI-dialog-title"
        >
          <DialogTitle id="addOI-dialog-title">Add Onboarding Item</DialogTitle>
          <DialogContent>
            <FormLabel component="legend">Onboarding Type</FormLabel>
            <RadioGroup
              aria-label="Onboarding Type"
              name="onboardingType"
              className={classes.group}
              value={requireDoc}
              onChange={this.handleChangeRequiredDoc}
            >
              <FormControlLabel
                value="0"
                control={<Radio color="primary" />}
                label="Task"
              />
              <FormControlLabel
                value="1"
                control={<Radio color="primary" />}
                label="Document"
              />
            </RadioGroup>
            {/* requireDoc === "1" && <TextField
              select
              label="Document Type"
              className={classes.addOIDialogField}
              margin="normal"
              variant="outlined"
              value={selectedDocType}
              id="addOI-dialog-fkDocType"
              fullWidth
              onChange={this.handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {allDocTypes &&
              allDocTypes.map(docType => (
                <MenuItem key={docType.id} value={docType.id}>
                  {docType.name}
                </MenuItem>
              ))}
            </TextField> */}
            <TextField
              margin="dense"
              className={classes.addOIDialogField}
              id="addOI-dialog-description"
              label="Description"
              fullWidth
            />
            <TextField
              label="Due Date"
              id="addOI-dialog-dueDate"
              className={classes.addOIDialogField}
              fullWidth
              placeholder="2019-01-31"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseAddOIDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleAddOIDialog} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>


        <Dialog
          open={editOIDialog}
          onClose={this.handleCloseEditOIDialog}
          aria-labelledby="editOI-dialog-title"
        >
          <DialogTitle id="editOI-dialog-title">
            Edit Onboarding Item
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              className={classes.editOIDialogField}
              id="editOI-dialog-name"
              label="Name"
              fullWidth
            />
            <TextField
              margin="dense"
              className={classes.editOIDialogField}
              id="editOI-dialog-description"
              label="Description"
              fullWidth
            />
            <TextField
              margin="dense"
              className={classes.editOIDialogField}
              id="editOI-dialog-date"
              label="Due Date"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseEditOIDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleEditOIDialog} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

EmployeeOnboarding.propTypes = {
  selectedEmployee: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  getTasks: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
  downloadFile: PropTypes.func.isRequired,
  createTask: PropTypes.func.isRequired,
  allDocTypes: PropTypes.array,
  getAllDocTypes: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  tasks: selectTasks,
  allDocTypes: selectAllDocTypes,
});

const mapDispatchToProps = {
  ...actions,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'employeeOnboarding', reducer });
const withSaga = injectSaga({ key: 'employeeOnboarding', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(EmployeeOnboarding);
