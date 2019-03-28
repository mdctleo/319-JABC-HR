/**
 *
 * Performance Module
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import WorkPlanDisplay from '../WorkPlanDisplay';
import PerformanceReviewDisplay from '../PerformanceReviewDisplay';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: '95%',
    marginTop: theme.spacing.unit * 3,
    marginLeft: '2.5%',
    paddingBottom: '100px',
  },
  sectionButton: {
    display: 'block',
    color: 'white',
    width: '150px',
    margin: 'auto',
    marginTop: '20px',
    backgroundColor: '#ff6600',
    borderRadius: '15px',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#ff944d',
    },
  },
  editButton: {
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
  deleteWPButton: {
    float: 'right',
    display: 'inline',
    color: 'black',
    width: '150px',
    marginLeft: '5px',
    backgroundColor: '#e5e5e5',
    borderRadius: '15px',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#efefef',
    },
  },
  saveButton: {
    float: 'right',
    display: 'inline',
    color: 'white',
    width: '150px',
    marginLeft: '5px',
    backgroundColor: '#ff6600',
    borderRadius: '15px',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#ff944d',
    },
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  tabsIndicator: {
    display: 'inline-block',
    backgroundColor: '#ff5000',
  },
  container: {
    width: '95%',
    marginLeft: '2.5%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    float: 'right',
    marginTop: '50px',
    marginRight: '2.5%',
    width: '200px',
  },
  appBar: {
    width: '100%',
  },
  buttonStyle: {
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
  formButton: {
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
  addDocButton: {
    display: 'inline',
    color: 'white',
    height: '40px',
    width: '200px',
    marginTop: '30px',
    marginRight: '20px',
    backgroundColor: '#ff6600',
    borderRadius: '15px',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#ff944d',
    },
  },
  addColButton: {
    float: 'left',
    display: 'inline',
    color: 'black',
    width: '150px',
    marginTop: '15px',
    backgroundColor: '#e5e5e5',
    borderRadius: '15px',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#fefefe',
    },
  },
});

class PerformanceModule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: props.profile,
      value: 0,
      openNewSectionDialog: false,
      openNewPerformancePlanDialog: false,
      columnsForNewSection: [0],
      openCheckDeleteDocDialog: false,
      openDeleteRowsDialog: false,
      openDeleteSectionDialog: false,
      sectionIDToDelete: 0,
      rowIDSToDelete: [],
      newPerformanceEnd: '',
      newPerformanceStart: '',
    };
  }

  // Add more columns when making a new section
  incNumColumnsForNewSection = () => {
    this.setState(prevState => ({
      columnsForNewSection: [
        ...prevState.columnsForNewSection,
        prevState.columnsForNewSection.length,
      ],
    }));
  };

  // Delete data in the given section for work plan
  handleDeleteRows = isPlan => () => {
    const { sectionIDToDelete, rowIDSToDelete } = this.state;
    this.props.deleteRows(sectionIDToDelete, rowIDSToDelete, isPlan);
    this.setState({ openDeleteRowsDialog: false });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  // Generate a dropdown list depending on what years of performance plans
  // are available.
  generateDropdown() {
    const { planList, selectedPlan } = this.props;

    return (
      <Select
        value={selectedPlan ? selectedPlan.id : 0}
        onChange={this.selectYear}
      >
        <MenuItem key={-1} value={0}>
          Add Year
        </MenuItem>
        {planList.map(plan => (
          <MenuItem key={plan.id} value={plan.id}>
            {plan.startYear +
              (plan.endYear && plan.endYear !== plan.startYear
                ? `/${plan.endYear}`
                : '')}
          </MenuItem>
        ))}
      </Select>
    );
  }

  selectYear = event => {
    if (event.target.value === 0) {
      this.openNewPlanDialog();
    } else {
      this.props.selectPlan(event.target.value);
    }
  };

  // Build a Section from the fields filled out in the Dialog Box
  // Then, add it to the collection of Sections
  saveSection = isPlan => {
    const newCols = this.state.columnsForNewSection;
    const section = {};
    const columns = [];

    for (const newCol of newCols) {
      columns.push(document.getElementById('col-name'.concat(newCol)).value);
    }

    for (let i = 0; i < columns.length; i++) {
      for (let j = i + 1; j < columns.length; j++) {
        if (columns[i] === columns[j]) {
          this.setState({
            addSectionError: 'Columns must have different names',
          });
          return;
        }
      }
    }
    this.setState({
      addSectionError: null,
    });

    section.sectionName = document.getElementById('sectionName').value;
    section.data = {};
    section.data.columns = columns;
    section.data.rows = [];
    this.setState({
      openNewSectionDialog: false,
      columnsForNewSection: [0],
    });

    this.props.addSection(section, isPlan);
  };

  // Make a performance plan with the given plan year
  makePlan = () => {
    const d = new Date();
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = d.getFullYear();
    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    const createDate = [year, month, day].join('-');
    const plan = {
      fkEmployee: this.props.profile.id,
      startYear: this.state.newPerformanceStart,
      endYear:
        this.state.newPerformanceEnd === ''
          ? this.state.newPerformanceStart
          : this.state.newPerformanceEnd,
      status: 0,
      createDate,
    };

    this.props.createPlan(plan);

    this.setState({
      openNewPerformancePlanDialog: false,
      newPerformanceStart: '',
      newPerformanceEnd: '',
      value: 0,
    });
  };

  makeReview = () => {
    const d = new Date();
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = d.getFullYear();
    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    const createDate = [year, month, day].join('-');
    const review = {
      fkEmployee: this.props.profile.id,
      status: 0,
      createDate,
      fkPerformancePlan: this.props.selectedPlan.id,
    };

    this.props.createReview(review);
  };

  openNewSectionDialog = () => {
    this.setState({ openNewSectionDialog: true });
  };

  closeNewSectionDialog = () => {
    this.setState({ openNewSectionDialog: false, columnsForNewSection: [0] });
  };

  openNewPlanDialog = () => {
    this.setState({ openNewPerformancePlanDialog: true });
  };

  closeNewPlanDialog = () => {
    this.setState({ openNewPerformancePlanDialog: false });
  };

  openCheckDeleteDocDialog = () => {
    this.setState({ openCheckDeleteDocDialog: true });
  };

  closeDeleteDocDialog = () => {
    this.setState({ openCheckDeleteDocDialog: false });
  };

  openDeleteRowsDialog = (sectionId, ids) => {
    this.setState({ openDeleteRowsDialog: true });
    this.setState({ sectionIDToDelete: sectionId });
    this.setState({ rowIDSToDelete: ids });
  };

  closeDeleteRowsDialog = (sectionId, ids) => {
    this.setState({ openDeleteRowsDialog: false });
  };

  openDeleteSectionDialog = sectionId => {
    this.setState({ openDeleteSectionDialog: true });
    this.setState({ sectionIDToDelete: sectionId });
  };

  closeDeleteSectionDialog = (sectionId, ids) => {
    this.setState({ openDeleteSectionDialog: false });
  };

  handleDeleteSection = isPlan => {
    this.setState({ openDeleteSectionDialog: false });
    this.props.deleteSection(this.state.sectionIDToDelete, isPlan);
  };

  handleDeletePerformance = isPlan => {
    this.props.deletePerformance(isPlan);
    this.setState({ openCheckDeleteDocDialog: false });
  };

  render() {
    const { classes, selectedPlan, selectedReview, planList } = this.props;
    const {
      columnsForNewSection,
      profile,
      value,
      addSectionError,
    } = this.state;
    const selectedPlanYear =
      selectedPlan &&
      selectedPlan.startYear +
        (selectedPlan.endYear && selectedPlan.endYear !== selectedPlan.startYear
          ? `/${selectedPlan.endYear}`
          : '');

    return (
      <div>
        <h1>Performance</h1>
        <FormControl className={classes.formControl}>
          <InputLabel>Year</InputLabel>
          {this.generateDropdown()}
        </FormControl>
        <Paper className={classes.root}>
          <div>
            <AppBar position="static" className={classes.appBar}>
              <Tabs
                value={value}
                classes={{
                  root: classes.tabsRoot,
                  indicator: classes.tabsIndicator,
                }}
                onChange={this.handleChange}
              >
                <Tab
                  disableRipple
                  classes={{
                    root: classes.tabRoot,
                    selected: classes.tabSelected,
                  }}
                  label="Work Plan"
                />
                <Tab
                  disableRipple
                  classes={{
                    root: classes.tabRoot,
                    selected: classes.tabSelected,
                  }}
                  label="Performance Review"
                />
              </Tabs>
            </AppBar>
            <Dialog
              open={this.state.openNewPerformancePlanDialog}
              onClose={this.closeNewPlanDialog}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">
                Enter the year of your new performance documents:
              </DialogTitle>
              <DialogContent>
                <TextField
                  required
                  margin="dense"
                  label="Start Year"
                  fullWidth
                  placeholder="2018"
                  value={this.state.newPerformanceStart}
                  onChange={event =>
                    this.setState({ newPerformanceStart: event.target.value })
                  }
                  type="number"
                />
                <TextField
                  margin="dense"
                  label="End Year"
                  fullWidth
                  placeholder="2019"
                  value={this.state.newPerformanceEnd}
                  onChange={event =>
                    this.setState({ newPerformanceEnd: event.target.value })
                  }
                  type="number"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.closeNewPlanDialog} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.makePlan} color="primary">
                  OK
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={this.state.openCheckDeleteDocDialog}
              onClose={this.closeDeleteDocDialog}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">
                Are you sure you want to delete this{' '}
                {value === 0 ? ' work plan?' : ' performance review?'}
              </DialogTitle>
              <DialogActions>
                <Button onClick={this.closeDeleteDocDialog} color="primary">
                  No
                </Button>
                {value === 0 ? (
                  <Button
                    onClick={() => this.handleDeletePerformance(true)}
                    color="primary"
                  >
                    Yes
                  </Button>
                ) : (
                  <Button
                    onClick={() => this.handleDeletePerformance(false)}
                    color="primary"
                  >
                    Yes
                  </Button>
                )}
              </DialogActions>
            </Dialog>

            <Dialog
              open={this.state.openDeleteRowsDialog}
              onClose={this.closeDeleteRowsDialog}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">
                Are you sure you want to delete these rows?
              </DialogTitle>
              <DialogActions>
                <Button onClick={this.closeDeleteRowsDialog} color="primary">
                  No
                </Button>
                {value === 0 ? (
                  <Button onClick={this.handleDeleteRows(true)} color="primary">
                    Yes
                  </Button>
                ) : (
                  <Button
                    onClick={this.handleDeleteRows(false)}
                    color="primary"
                  >
                    Yes
                  </Button>
                )}
              </DialogActions>
            </Dialog>

            <Dialog
              open={this.state.openDeleteSectionDialog}
              onClose={this.closeDeleteSectionDialog}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">
                Are you sure you want to delete this section?
              </DialogTitle>
              <DialogActions>
                <Button onClick={this.closeDeleteSectionDialog} color="primary">
                  No
                </Button>
                {value === 0 ? (
                  <Button
                    onClick={() => this.handleDeleteSection(true)}
                    color="primary"
                  >
                    Yes
                  </Button>
                ) : (
                  <Button
                    onClick={() => this.handleDeleteSection(false)}
                    color="primary"
                  >
                    Yes
                  </Button>
                )}
              </DialogActions>
            </Dialog>

            <Dialog
              open={this.state.openNewSectionDialog}
              onClose={this.closeNewSectionDialog}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Add Section</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="sectionName"
                  label="Section Name"
                  fullWidth
                />
                {columnsForNewSection.map((column, i) => (
                  <TextField
                    key={i}
                    margin="dense"
                    id={'col-name'.concat(column)}
                    label="Column Name"
                    fullWidth
                  />
                ))}
                <Button
                  className={classes.addColButton}
                  onClick={this.incNumColumnsForNewSection}
                >
                  Add Column
                </Button>
              </DialogContent>
              <DialogActions>
                {addSectionError && (
                  <Typography color="error" variant="body2">
                    {addSectionError}
                  </Typography>
                )}
                <Button onClick={this.closeNewSectionDialog} color="primary">
                  Cancel
                </Button>
                {value === 0 ? (
                  <Button
                    onClick={() => this.saveSection(true)}
                    color="primary"
                  >
                    OK
                  </Button>
                ) : (
                  <Button
                    onClick={() => this.saveSection(false)}
                    color="primary"
                  >
                    OK
                  </Button>
                )}
              </DialogActions>
            </Dialog>
            <div>
              {!selectedPlan &&
                planList.length === 0 && (
                  <div className="profile-card">
                    <Typography>
                      You currently have no performance documents. Click on the
                      button below to add your first Performance Documents for a
                      given year:{' '}
                    </Typography>
                    <Button
                      className={classes.addDocButton}
                      value={0}
                      onClick={this.openNewPlanDialog}
                    >
                      Add Year
                    </Button>
                  </div>
                )}
              {!selectedPlan &&
                planList.length !== 0 && (
                  <div className="profile-card">
                    <Typography>
                      Click on the button below to add a Performance Document
                      for a given year or select a year in the drop down above.{' '}
                    </Typography>
                    <Button
                      className={classes.addDocButton}
                      value={0}
                      onClick={this.openNewPlanDialog}
                    >
                      Add Year
                    </Button>
                  </div>
                )}
              {selectedPlan &&
                value === 0 && (
                  <div className="profile-card">
                    <Button
                      className={classes.deleteWPButton}
                      onClick={this.openCheckDeleteDocDialog}
                    >
                      Delete Plan
                    </Button>
                    <Button
                      className={classes.saveButton}
                      onClick={() => this.props.savePlan(false)}
                    >
                      Save Draft
                    </Button>
                    <Button
                      className={classes.saveButton}
                      onClick={() => this.props.savePlan(true)}
                    >
                      Publish
                    </Button>
                    <WorkPlanDisplay
                      sections={selectedPlan.sections}
                      profile={profile}
                      year={selectedPlanYear}
                      handleDeleteSection={this.openDeleteSectionDialog}
                      handleAddRow={(sectionId, row) =>
                        this.props.addRow(sectionId, row, true)
                      }
                      handleDeleteRows={this.openDeleteRowsDialog}
                      updateSection={this.props.updateSection}
                    />
                    <Button
                      className={classes.sectionButton}
                      onClick={this.openNewSectionDialog}
                    >
                      Add Section
                    </Button>
                  </div>
                )}
              {selectedReview &&
                value === 1 && (
                  <div className="profile-card">
                    <Button
                      className={classes.deleteWPButton}
                      onClick={this.openCheckDeleteDocDialog}
                    >
                      Delete Review
                    </Button>
                    <Button
                      className={classes.saveButton}
                      onClick={() => this.props.saveReview(false)}
                    >
                      Save Draft
                    </Button>
                    <Button
                      className={classes.saveButton}
                      onClick={() => this.props.saveReview(true)}
                    >
                      Publish
                    </Button>
                    <PerformanceReviewDisplay
                      sections={selectedReview.sections}
                      year={selectedPlanYear}
                      profile={profile}
                      handleDeleteSection={this.openDeleteSectionDialog}
                      handleAddRow={(sectionId, row) =>
                        this.props.addRow(sectionId, row, false)
                      }
                      handleDeleteRows={this.openDeleteRowsDialog}
                    />
                    <Button
                      className={classes.sectionButton}
                      onClick={this.openNewSectionDialog}
                    >
                      Add Section
                    </Button>
                  </div>
                )}
              {selectedPlan &&
                value === 1 &&
                !selectedReview && (
                  <div className="profile-card">
                    <Typography>
                      You currently have no performance review for this work
                      plan. Click on the button below to add a performance
                      review for this plan:{' '}
                    </Typography>
                    <Button
                      className={classes.addDocButton}
                      value={0}
                      onClick={this.makeReview}
                    >
                      Add Review
                    </Button>
                  </div>
                )}
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

PerformanceModule.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  planList: PropTypes.array.isRequired,
  selectedPlan: PropTypes.object,
  selectedReview: PropTypes.object,
  deleteRows: PropTypes.func.isRequired,
  addRow: PropTypes.func.isRequired,
  addSection: PropTypes.func.isRequired,
  deleteSection: PropTypes.func.isRequired,
  deletePerformance: PropTypes.func.isRequired,
  selectPlan: PropTypes.func.isRequired,
  createPlan: PropTypes.func.isRequired,
  createReview: PropTypes.func.isRequired,
  savePlan: PropTypes.func.isRequired,
  saveReview: PropTypes.func.isRequired,
  updateSection: PropTypes.func.isRequired
};

export default withStyles(styles)(PerformanceModule);
