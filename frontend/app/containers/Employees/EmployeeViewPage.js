import Paper from '@material-ui/core/Paper/Paper';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Tabs from '@material-ui/core/Tabs/Tabs';
import Tab from '@material-ui/core/Tab/Tab';
import Button from '@material-ui/core/Button/Button';
import EmployeeDisplay from '../../components/EmployeeDisplay';
import EmployeeEditForm from '../../components/EmployeeEditForm';
import Typography from '@material-ui/core/Typography/Typography';
import DocumentsContainer from './DocumentsContainer';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText';
import TextField from '@material-ui/core/TextField/TextField';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import orange from '@material-ui/core/colors/orange';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

import EmployeePerformance from './EmployeePerformance';

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

class EmployeeViewPage extends React.PureComponent {
  state = {
    currentTab: 1,
    active: true,
    addOIDialog: false,
    editOIDialog: false,
  };

  handleTabChange = (event, value) => {
    this.setState({ currentTab: value });
    this.props.setEditing(false);
  };

  render() {
    const { classes, editing, selectedEmployee, handleBackButton, role } = this.props;
    const { currentTab } = this.state;
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
            </Tabs>
          </AppBar>
          {currentTab === 1 &&
            !editing && (
              <div>
                <Button
                  className={classes.editButton}
                  onClick={this.handleClickEdit}
                >
                  Edit
                </Button>
                <EmployeeDisplay
                  isAdmin
                  profile={selectedEmployee}
                  roleName={role}
                />
              </div>
            )}
          {currentTab === 1 &&
            editing && (
              <div className="profile-card">
                <EmployeeEditForm
                  profile={selectedEmployee}
                  saveProfile={this.saveProfile}
                  cancelEdit={this.cancelEdit}
                />
              </div>
            )}
          {currentTab === 2 && <EmployeePerformance />}
          {currentTab === 3 && (
            <div className={classes.container}>
              <div className={classes.onBoardingHeader}>
                <Typography className={classes.employeeName} variant="h5">
                  Onboarding Items
                </Typography>
                <Button
                  className={classes.addOIButton}
                  onClick={this.handleAddOI}
                >
                  Add Onboarding Item
                </Button>
              </div>
              <DocumentsContainer documents={this.documents} />
              <Dialog
                open={addOIDialog}
                onClose={this.handleCloseAddOIDialog}
                aria-labelledby="addOI-dialog-title"
              >
                <DialogTitle id="addOI-dialog-title">
                  Add Onboarding Item
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Enter the information for the new onbording item:
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    className={classes.addOIDialogField}
                    id="addOI-dialog-name"
                    label="Name"
                    fullWidth
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    className={classes.addOIDialogField}
                    id="addOI-dialog-description"
                    label="Description"
                    fullWidth
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    className={classes.addOIDialogField}
                    id="addOI-dialog-date"
                    label="Due Date"
                    fullWidth
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
                    autoFocus
                    margin="dense"
                    className={classes.editOIDialogField}
                    id="editOI-dialog-description"
                    label="Description"
                    fullWidth
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    className={classes.editOIDialogField}
                    id="editOI-dialog-date"
                    label="Due Date"
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={this.handleCloseEditOIDialog}
                    color="primary"
                  >
                    Cancel
                  </Button>
                  <Button onClick={this.handleEditOIDialog} color="primary">
                    OK
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
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
  role: PropTypes.object,
};

export default withStyles(styles)(EmployeeViewPage);
