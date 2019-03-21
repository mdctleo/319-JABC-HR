/**
 *
 * Performance
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import WorkPlanDisplay from '../../components/WorkPlanDisplay';
import PerformanceReviewDisplay from '../../components/PerformanceReviewDisplay';
import PerformanceReviewForm from '../../components/PerformanceReviewForm';
import WorkPlanForm from '../../components/WorkPlanForm';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
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
    }
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
    }
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
    }
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
    }
  },
});


class PerformacePage extends React.Component {
  state = {
    profile: {firstname: "Justin", lastname: "Case", id: "1", sin: "777 777 777", role: {name: "Developer"}, status: "Active", salary: 60000, manager: "Sarah James", type: "FT", vacation: 12, address: "Box 123", phone: "555-5555"},
    workPlans: {},
    performanceReviews: {},
    performancePlans: [
      {
        year: "2019",
        sections: [
          {
            sectionId: 1,
            sectionName: "First Section",
            columns: ["Column 1", "Column 2", "Column 3"],
            data: [
              {
                "Column 1": "Data for column 1",
                "Column 2": "Data for column 2",
                "Column 3": "Data for column 3"
              },
              {
                "Column 1": "2 Data for column 1",
                "Column 2": "2 Data for column 2",
                "Column 3": "2 Data for column 3"
              },
              {
                "Column 1": "3 Data for column 1",
                "Column 2": "3 Data for column 2",
                "Column 3": "3 Data for column 3"
              }
            ]
          },
          {
            sectionId: 2,
            sectionName: "Second Section",
            columns: ["Column 1", "Column 2"],
            data: [
              {
                "Column 1": "Data for column 1",
                "Column 2": "Data for column 2"
              },
              {
                "Column 1": "2 Data for column 1",
                "Column 2": "2 Data for column 2"
              },
              {
                "Column 1": "3 Data for column 1",
                "Column 2": "3 Data for column 2"
              }
            ]
          },
          {
            sectionId: 3,
            sectionName: "Third Section",
            columns: ["Column 1"],
            data: [
              {
                "Column 1": "Data for column 1"
              },
              {
                "Column 1": "2 Data for column 1"
              },
              {
                "Column 1": "3 Data for column 1"
              }
            ]
          },
        ],
        performanceReview: {
          year: "2019",
          sections: [
            {
              sectionId: 1,
              sectionName: "First Section",
              columns: ["Column 1", "Column 2", "Column 3"],
              data: [
                {
                  "Column 1": "Data for column 1",
                  "Column 2": "Data for column 2",
                  "Column 3": "Data for column 3"
                },
                {
                  "Column 1": "2 Data for column 1",
                  "Column 2": "2 Data for column 2",
                  "Column 3": "2 Data for column 3"
                },
                {
                  "Column 1": "3 Data for column 1",
                  "Column 2": "3 Data for column 2",
                  "Column 3": "3 Data for column 3"
                }
              ]
            },
            {
              sectionId: 2,
              sectionName: "Second Section",
              columns: ["Column 1", "Column 2"],
              data: [
                {
                  "Column 1": "Data for column 1",
                  "Column 2": "Data for column 2"
                },
                {
                  "Column 1": "2 Data for column 1",
                  "Column 2": "2 Data for column 2"
                },
                {
                  "Column 1": "3 Data for column 1",
                  "Column 2": "3 Data for column 2"
                }
              ]
            },
            {
              sectionId: 3,
              sectionName: "Third Section",
              columns: ["Column 1"],
              data: [
                {
                  "Column 1": "Data for column 1"
                },
                {
                  "Column 1": "2 Data for column 1"
                },
                {
                  "Column 1": "3 Data for column 1"
                }
              ]
            },
          ]
        }
      }
    ],
    selectedYear: "",
    currentYears: 0,
    value: 0,
    edit: 0,
    changed: 0,
    openNewSectionDialog: 0,
    openNewReviewSectionDialog: 0,
    openNewPerformancePlanDialog: 0,
    openNewPerformanceReviewDialog: 0,
    columnsForNewSection: [0]
  };

  // Add more columns when making a new section
  incNumColumnsForNewSection = () => {
    let colsForNewSection = this.state.columnsForNewSection;
    this.setState({ columnsForNewSection: [...colsForNewSection, colsForNewSection.length] });
  };

  getPerformancePlanOfSelectedYear = () => {
    for (let performancePlan of this.state.performancePlans) {
      if (performancePlan.year === this.state.selectedYear) {
        return performancePlan;
      }
    }
    return null;
  };

  handleSelect = (event, value) => {
    if (event.target.value === 0) {
      this.openNewPlanDialog();
    } else {
      this.setState({ selectedYear: event.target.value });
    }
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  // Generate a dropdown list depending on what years of performance plans
  // are available.
  generateDropdown() {
    let years = [];
    for (let performancePlan of this.state.performancePlans) {
      if (performancePlan.hasOwnProperty('year') && performancePlan.year) {
        years.push(performancePlan.year);
      }
    }

    return (
      <Select onChange = {this.handleSelect}>
        {
          years.map(function(yearSpan, index) {
            return <MenuItem value={yearSpan}>{yearSpan}</MenuItem>
          })
        }
        <MenuItem value={0}>Add Year</MenuItem>
      </Select>
    );
  }

  // Called by child plan components to add a row to a
  // specific section, of the selected plan
  handleAddRow = (sectionId, row) => {
    let selectedPlan = this.getPerformancePlanOfSelectedYear();

    let performancePlans = this.state.performancePlans;
    for (let plan of performancePlans) {
      if (plan === selectedPlan) {
        for (let section of plan.sections) {
          if (section.sectionId === sectionId) {
            section.data = [...section.data, row];
          }
        }
      }
    }

    this.setState( { performancePlans: [...performancePlans] } );
  };

  // Add a section to the selected plan
  handleAddSection = (section) => {
    let selectedPlan = this.getPerformancePlanOfSelectedYear();

    let performancePlans = this.state.performancePlans;
    for (let plan of performancePlans) {
      if (plan === selectedPlan) {
        plan.sections = [...plan.sections, section];
        this.setState( { performancePlans: [...performancePlans], openNewSectionDialog: 0, columnsForNewSection: [] });
      }
    }
  };

  // Build a Section from the fields filled out in the Dialog Box
  // Then, add it to the collection of Sections
  saveSection = () => {
    let newCols = this.state.columnsForNewSection;
    let section = {};
    let columns = [];

    for (let newCol of newCols) {
      columns.push(document.getElementById("col-name".concat(newCol)).value);
    }

    section.sectionId = -1; // TODO: What should/can this be if its a new Section but yet to exist in db?
    section.sectionName = document.getElementById("sectionName").value;
    section.columns = columns;
    section.data = [];

    this.handleAddSection(section);
  };

  // ** START PERFORMANCE REVIEW TABLE EDITING

  // Called by child plan components to add a row to a
  // specific section, of the selected plan's performance review
  handleAddReviewRow = (sectionId, row) => {
    let selectedPlan = this.getPerformancePlanOfSelectedYear();

    let performancePlans = this.state.performancePlans;
    for (let plan of performancePlans) {
      if (plan === selectedPlan) {
        for (let section of plan.performanceReview.sections) {
          if (section.sectionId === sectionId) {
            section.data = [...section.data, row];
          }
        }
      }
    }

    this.setState( { performancePlans: [...performancePlans] } );
  };

  // Add a Performance Review section to the selected plan's performance review
  handleAddReviewSection = (section) => {
    let selectedPlan = this.getPerformancePlanOfSelectedYear();

    let performancePlans = this.state.performancePlans;
    for (let plan of performancePlans) {
      if (plan === selectedPlan) {
        plan.performanceReview.sections = [...plan.performanceReview.sections, section];
        this.setState( { performancePlans: [...performancePlans], openNewReviewSectionDialog: 0, columnsForNewSection: [] });
      }
    }
  };

  // Build a Performance Review Section from the fields filled out in the Dialog Box
  // Then, add it to the collection of Sections
  saveReviewSection = () => {
    let newCols = this.state.columnsForNewSection;
    let section = {};
    let columns = [];

    for (let newCol of newCols) {
      columns.push(document.getElementById("col-name".concat(newCol)).value);
    }

    section.sectionId = -1; // TODO: What should/can this be if its a new Section but yet to exist in db?
    section.sectionName = document.getElementById("sectionName").value;
    section.columns = columns;
    section.data = [];

    this.handleAddReviewSection(section);
  };

  // ** END PERFORMANCE REVIEW TABLE EDITING

  // Make a performance plan with the given plan year
  // TODO: Validate year inputted is valid and does not already exist
  makePlan = () => {
    let year = document.getElementById("planYear").value;

    let plan = {
      year: year,
      sections: []
    };

    let performancePlans = this.state.performancePlans;

    this.setState( { performancePlans: [...performancePlans, plan], openNewPerformancePlanDialog: 0, selectedYear: year });
  };

  makeReview = () => {
    let selectedPlan = this.getPerformancePlanOfSelectedYear();

    let performancePlans = this.state.performancePlans;
    for (let plan of performancePlans) {
      if (plan === selectedPlan) {
        plan.performanceReview = {};
        plan.performanceReview.sections = [];
        plan.performanceReview.year = plan.year;
        this.setState( { performancePlans: [...performancePlans] });
      }
    }
  };

  openNewSectionDialog = () => {
    this.setState({openNewSectionDialog: 1});
  };

  closeNewSectionDialog = () => {
    this.setState({ openNewSectionDialog: 0, columnsForNewSection: [0] });
  };

  openNewSectionReviewDialog = () => {
    this.setState({openNewReviewSectionDialog: 1});
  };

  closeNewSectionReviewDialog = () => {
    this.setState({ openNewReviewSectionDialog: 0, columnsForNewSection: [0] });
  };

  openNewPlanDialog = () => {
    this.setState({openNewPerformancePlanDialog: 1});
  };

  closeNewPlanDialog = () => {
    this.setState({ openNewPerformancePlanDialog: 0 });
  };

  openNewReviewDialog = () => {
    this.setState({openNewPerformanceReviewDialog: 1});
  };

  closeNewReviewDialog = () => {
    this.setState({ openNewPerformanceReviewDialog: 0 });
  };

  render() {
    const { classes } = this.props;
    const { selectedYear, performancePlans, columnsForNewSection, sections, profile, workPlans, performanceReviews, currentYears, value, edit } = this.state;

    let selectedPerformancePlan = this.getPerformancePlanOfSelectedYear(selectedYear);

    return (
      <div>
      <h1>Performance</h1>
      <FormControl className={classes.formControl}>
          <InputLabel>
            Year
          </InputLabel>
          {this.generateDropdown()}
        </FormControl>
        <Paper className={classes.root}>
          <div>
          <AppBar position="static" className={classes.appBar}>
          <Tabs value={value} classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                onChange={this.handleChange}>
            <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                 label="Work Plan" />
            <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                 label="Performance Review" />
        </Tabs>
         </AppBar>
            <Dialog
              open={this.state.openNewPerformancePlanDialog}
              onClose={this.closeNewPlanDialog}
              aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Enter year of your work plan</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="planYear"
                  label="Year"
                  fullWidth
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
              open={this.state.openNewSectionDialog}
              onClose={this.closeNewSectionDialog}
              aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Add new Section</DialogTitle>
              <DialogContent>
                <Button className={classes.editButton} onClick={this.incNumColumnsForNewSection}>Add Column</Button>
                <TextField
                  autoFocus
                  margin="dense"
                  id="sectionName"
                  label="Section Name"
                  fullWidth
                />
                {columnsForNewSection.map(function(column) {
                  return <TextField
                    autoFocus
                    margin="dense"
                    id={"col-name".concat(column)}
                    label="Column Name"
                    fullWidth
                  />
                })}
              </DialogContent>
              <DialogActions>
                <Button onClick={this.closeNewSectionDialog} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.saveSection} color="primary">
                  OK
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={this.state.openNewReviewSectionDialog}
              onClose={this.closeNewSectionReviewDialog}
              aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Add new Section</DialogTitle>
              <DialogContent>
                <Button className={classes.editButton} onClick={this.incNumColumnsForNewSection}>Add Column</Button>
                <TextField
                  autoFocus
                  margin="dense"
                  id="sectionName"
                  label="Section Name"
                  fullWidth
                />
                {columnsForNewSection.map(function(column) {
                  return <TextField
                    autoFocus
                    margin="dense"
                    id={"col-name".concat(column)}
                    label="Column Name"
                    fullWidth
                  />
                })}
              </DialogContent>
              <DialogActions>
                <Button onClick={this.closeNewSectionReviewDialog} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.saveReviewSection} color="primary">
                  OK
                </Button>
              </DialogActions>
            </Dialog>
      <div>
      { selectedPerformancePlan === null && performancePlans.length === 0 &&
        <div className="profile-card">
          <Typography>You currently have no performance documents. Click on the button below to add your first Performance Documents for a given year: </Typography>
          <Button className={classes.addDocButton} value={0} onClick={this.openNewPlanDialog}>Add Year</Button>
        </div> }
        { selectedPerformancePlan === null && performancePlans.length !== 0 &&
        <div className="profile-card">
          <Typography>Click on the button below to add a Performance Document for a given year or select a year in the drop down above. </Typography>
          <Button className={classes.addDocButton} value={0} onClick={this.openNewPlanDialog}>Add Year</Button>
        </div> }
      { selectedPerformancePlan !== null && value === 0 &&
      <div className="profile-card">
        <Button className={classes.editButton} onClick={this.saveWorkPlan}>Save</Button>
        <Button className={classes.editButton} onClick={this.openNewSectionDialog}>Add Section</Button>
        <WorkPlanDisplay sections={selectedPerformancePlan.sections} profile={profile} year = {selectedPerformancePlan.year} handleAddRow={this.handleAddRow}/>
        </div>}
      { selectedPerformancePlan !== null && value === 1 &&
        selectedPerformancePlan.hasOwnProperty("performanceReview") && selectedPerformancePlan["performanceReview"] &&
      <div className="profile-card">
        <Button className={classes.editButton} onClick={this.saveWorkPlan}>Save</Button>
        <Button className={classes.editButton} onClick={this.openNewSectionReviewDialog}>Add Section</Button>
        <PerformanceReviewDisplay sections={selectedPerformancePlan.performanceReview.sections} year = {selectedPerformancePlan.performanceReview.year} profile={profile} handleAddRow={this.handleAddReviewRow}/>
      </div>}
        { selectedPerformancePlan !== null && value === 1 &&
        !(selectedPerformancePlan.hasOwnProperty("performanceReview") && selectedPerformancePlan["performanceReview"]) &&
        <div className="profile-card">
          <Typography>You currently have no performance reviews for this work plan. Click on the button below to add your first performance review for this plan: </Typography>
          <Button className={classes.addDocButton} value={0} onClick={this.makeReview}>Add Review</Button>
        </div>}
         </div>
         </div>
          </Paper>
      </div>
    );
  }
}


PerformacePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PerformacePage);
