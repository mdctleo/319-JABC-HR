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
import FormControl from "@material-ui/core/FormControl";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import WorkPlanDisplay from '../../components/WorkPlanDisplay';
import PerformanceReviewDisplay from '../../components/PerformanceReviewDisplay';
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
    }
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
  deleteWPButton: {
    float: 'right',
    display: 'inline',
    color: 'black',
    width: '150px',
    marginLeft: '15px',
    backgroundColor: '#e5e5e5',
    borderRadius: '15px',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#efefef',
    }
  },
  saveButton: {
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
    }
  }
});


class PerformanceModule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: props.profile,
      performancePlans: props.performancePlans,
      selectedYear: "",
      value: 0,
      openNewSectionDialog: false,
      openNewReviewSectionDialog: false,
      openNewPerformancePlanDialog: false,
      columnsForNewSection: [0],
      openCheckDeleteDocDialog: false,
      openDeleteRowsDialog: false,
      openDeleteSectionDialog: false,
      sectionIDToDelete: 0,
      rowIDSToDelete: [],
    };
  }

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

  // Delete data in the given section for work plan
  // TODO: There's probably a better way of doing this
  handleDeleteRowsInPlan = () => {
    let selectedPlan = this.getPerformancePlanOfSelectedYear();

    let performancePlans = this.state.performancePlans;
    for (let plan of performancePlans) {
      if (plan === selectedPlan) {
        for (let section of plan.sections) {
          if (section.sectionId === this.state.sectionIDToDelete) {
            for (let id of this.state.rowIDSToDelete) {
              for (let i = 0; i < section.data.length; i++) {
                let data = section.data[i];

                if (data.id === id) {
                  section.data.splice(i, 1);
                }
              }
            }
          }
        }
      }
    }

    this.setState( { performancePlans: [...performancePlans] } );
    this.setState({ openDeleteRowsDialog: false});
  };

  // Delete data in the given section for review
  // TODO: There's probably a better way of doing this
  handleDeleteRowsInReview = () => {
    let selectedPlan = this.getPerformancePlanOfSelectedYear();

    let performancePlans = this.state.performancePlans;
    for (let plan of performancePlans) {
      if (plan === selectedPlan) {
        for (let section of plan.performanceReview.sections) {
          if (section.sectionId === this.state.sectionIDToDelete) {
            for (let id of this.state.rowIDSToDelete) {
              for (let i = 0; i < section.data.length; i++) {
                let data = section.data[i];

                if (data.id === id) {
                  section.data.splice(i, 1);
                }
              }
            }
          }
        }
      }
    }

    this.setState( { performancePlans: [...performancePlans] } );
    this.setState({ openDeleteRowsDialog: false});
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
      <Select value={0} onChange = {this.handleSelect}>
        {
          years.map(function(yearSpan, index) {
            return <MenuItem key={index} value={yearSpan}>{yearSpan}</MenuItem>
          })
        }
        <MenuItem key={-1} value={0}>Add Year</MenuItem>
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
        const maxId = plan.sections.length > 0 ? Math.max(...plan.sections.map(s => parseInt(s.sectionId, 10))) : 0;
        section.sectionId = maxId + 1;

        plan.sections = [...plan.sections, section];
        this.setState( { performancePlans: [...performancePlans], openNewSectionDialog: false, columnsForNewSection: [0] });
      }
    }
  };

  // Build a Section from the fields filled out in the Dialog Box
  // Then, add it to the collection of Sections
  // TODO: Validate column names are unique
  saveSection = () => {
    let newCols = this.state.columnsForNewSection;
    let section = {};
    let columns = [];

    for (let newCol of newCols) {
      columns.push(document.getElementById("col-name".concat(newCol)).value);
    }

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
        const maxId = plan.performanceReview.sections.length > 0 ? Math.max(...plan.performanceReview.sections.map(s => parseInt(s.sectionId, 10))) : 0;
        section.sectionId = maxId + 1;

        plan.performanceReview.sections = [...plan.performanceReview.sections, section];
        this.setState( { performancePlans: [...performancePlans], openNewReviewSectionDialog: false, columnsForNewSection: [0] });
      }
    }
  };

  // Build a Performance Review Section from the fields filled out in the Dialog Box
  // Then, add it to the collection of Sections
  // TODO: Validate column names are unique
  saveReviewSection = () => {
    let newCols = this.state.columnsForNewSection;
    let section = {};
    let columns = [];

    for (let newCol of newCols) {
      columns.push(document.getElementById("col-name".concat(newCol)).value);
    }

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

    this.setState( { performancePlans: [...performancePlans, plan], openNewPerformancePlanDialog: false, selectedYear: year, value: 0 });
  };

  makeReview = () => {
    let selectedPlan = this.getPerformancePlanOfSelectedYear();

    let performancePlans = this.state.performancePlans;
    for (let plan of performancePlans) {
      if (plan === selectedPlan) {
        plan.performanceReview = {};
        plan.performanceReview.sections = [];
        plan.performanceReview.year = plan.year;
        this.setState( { performancePlans: [...performancePlans], value: 1 });
      }
    }
  };

  openNewSectionDialog = () => {
    this.setState({openNewSectionDialog: true});
  };

  closeNewSectionDialog = () => {
    this.setState({ openNewSectionDialog: false, columnsForNewSection: [0] });
  };

  openNewSectionReviewDialog = () => {
    this.setState({openNewReviewSectionDialog: true});
  };

  closeNewSectionReviewDialog = () => {
    this.setState({ openNewReviewSectionDialog: false, columnsForNewSection: [0] });
  };

  openNewPlanDialog = () => {
    this.setState({openNewPerformancePlanDialog: true});
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

  openDeleteSectionDialog = (sectionId) => {
    this.setState({ openDeleteSectionDialog: true });
    this.setState({ sectionIDToDelete: sectionId });
  };

  closeDeleteSectionDialog = (sectionId, ids) => {
    this.setState({ openDeleteSectionDialog: false });
  };

  handleDeletePlanSection = () => {
    let selectedPlan = this.getPerformancePlanOfSelectedYear();

    let performancePlans = this.state.performancePlans;
    for (let plan of performancePlans) {
      if (plan === selectedPlan) {
        for (let i = 0; i < plan.sections.length; i++) {
          let section = plan.sections[i];

          if (section.sectionId === this.state.sectionIDToDelete) {
            plan.sections.splice(i, 1);
          }
        }
      }
    }

    this.setState( { performancePlans: [...performancePlans] } );
    this.setState({ openDeleteSectionDialog: false});
  };

  handleDeleteReviewSection = () => {
    let selectedPlan = this.getPerformancePlanOfSelectedYear();

    let performancePlans = this.state.performancePlans;
    for (let plan of performancePlans) {
      if (plan === selectedPlan) {
        for (let i = 0; i < plan.performanceReview.sections.length; i++) {
          let section = plan.performanceReview.sections[i];

          if (section.sectionId === this.state.sectionIDToDelete) {
            plan.performanceReview.sections.splice(i, 1);
          }
        }
      }
    }

    this.setState( { performancePlans: [...performancePlans] } );
    this.setState({ openDeleteSectionDialog: false});
  };

  handleDeletePlan = () => {
    let selectedPlan = this.getPerformancePlanOfSelectedYear();

    let performancePlans = this.state.performancePlans;
    for (let i = 0; i < performancePlans.length; i++) {
      let plan = performancePlans[i];
      if (plan === selectedPlan) {
        performancePlans.splice(i, 1);
      }
    }

    this.setState( { performancePlans: [...performancePlans], selectedYear: "" } );
    this.setState({ openCheckDeleteDocDialog: false});
  };

  handleDeleteReview = () => {
    let selectedPlan = this.getPerformancePlanOfSelectedYear();

    let performancePlans = this.state.performancePlans;
    for (let i = 0; i < performancePlans.length; i++) {
      let plan = performancePlans[i];
      if (plan === selectedPlan) {
        performancePlans[i].performanceReview = null;
      }
    }

    this.setState( { performancePlans: [...performancePlans] } );
    this.setState({ openCheckDeleteDocDialog: false});
  };

  render() {
    const { classes } = this.props;
    const { selectedYear, performancePlans, columnsForNewSection, profile, value } = this.state;

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
              <DialogTitle id="form-dialog-title">Enter the year of your new performance documents:</DialogTitle>
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
              open={this.state.openCheckDeleteDocDialog}
              onClose={this.closeDeleteDocDialog}
              aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Are you sure you want to delete this { value == 0 ? " work plan?" : " performance review?"}</DialogTitle>
              <DialogActions>
                <Button onClick={this.closeDeleteDocDialog} color="primary">
                  No
                </Button>
                {value == 0 ?
                  <Button onClick={this.handleDeletePlan} color="primary">
                    Yes
                  </Button> :
                  <Button onClick={this.handleDeleteReview} color="primary">
                    Yes
                  </Button>}
              </DialogActions>
            </Dialog>

            <Dialog
              open={this.state.openDeleteRowsDialog}
              onClose={this.closeDeleteRowsDialog}
              aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Are you sure you want to delete these rows?</DialogTitle>
              <DialogActions>
                <Button onClick={this.closeDeleteRowsDialog} color="primary">
                  No
                </Button>
                {value === 0 ?
                  <Button onClick={this.handleDeleteRowsInPlan} color="primary">
                    Yes
                  </Button> :
                  <Button onClick={this.handleDeleteRowsInReview} color="primary">
                    Yes
                  </Button>}
              </DialogActions>
            </Dialog>

            <Dialog
              open={this.state.openDeleteSectionDialog}
              onClose={this.closeDeleteSectionDialog}
              aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Are you sure you want to delete this section?</DialogTitle>
              <DialogActions>
                <Button onClick={this.closeDeleteSectionDialog} color="primary">
                  No
                </Button>
                {value === 0 ?
                  <Button onClick={this.handleDeletePlanSection} color="primary">
                    Yes
                  </Button> :
                  <Button onClick={this.handleDeleteReviewSection} color="primary">
                    Yes
                  </Button>}
              </DialogActions>
            </Dialog>

            <Dialog
              open={this.state.openNewSectionDialog}
              onClose={this.closeNewSectionDialog}
              aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Add new Section</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="sectionName"
                  label="Section Name"
                  fullWidth
                />
                {columnsForNewSection.map(function(column, i) {
                  return <TextField
                    autoFocus
                    key={i}
                    margin="dense"
                    id={"col-name".concat(column)}
                    label="Column Name"
                    fullWidth
                  />
                })}
                <Button className={classes.addColButton} onClick={this.incNumColumnsForNewSection}>Add Column</Button>
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
                <TextField
                  autoFocus
                  margin="dense"
                  id="sectionName"
                  label="Section Name"
                  fullWidth
                />
                {columnsForNewSection.map(function(column, i) {
                  return <TextField
                    autoFocus
                    key={i}
                    margin="dense"
                    id={"col-name".concat(column)}
                    label="Column Name"
                    fullWidth
                  />
                })}
                <Button className={classes.addColButton} onClick={this.incNumColumnsForNewSection}>Add Column</Button>
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
                <Button className={classes.deleteWPButton} onClick={this.openCheckDeleteDocDialog}>Delete Plan</Button>
                <Button className={classes.saveButton} onClick={this.saveWorkPlan}>Save</Button>
                <WorkPlanDisplay sections={selectedPerformancePlan.sections}
                                 profile={profile}
                                 year = {selectedPerformancePlan.year}
                                 handleDeleteSection={this.openDeleteSectionDialog}
                                 handleAddRow={this.handleAddRow}
                                 handleDeleteRows={this.openDeleteRowsDialog}/>
                <Button className={classes.sectionButton} onClick={this.openNewSectionDialog}>Add Section</Button>
              </div>}
              { selectedPerformancePlan !== null && value === 1 &&
              selectedPerformancePlan.hasOwnProperty("performanceReview") && selectedPerformancePlan["performanceReview"] &&
              <div className="profile-card">
                <Button className={classes.deleteWPButton} onClick={this.openCheckDeleteDocDialog}>Delete Review</Button>
                <Button className={classes.saveButton} onClick={this.saveWorkPlan}>Save</Button>
                <PerformanceReviewDisplay sections={selectedPerformancePlan.performanceReview.sections}
                                          year = {selectedPerformancePlan.performanceReview.year}
                                          profile={profile}
                                          handleDeleteSection={this.openDeleteSectionDialog}
                                          handleAddRow={this.handleAddReviewRow}
                                          handleDeleteRows={this.openDeleteRowsDialog}/>
                <Button className={classes.sectionButton} onClick={this.openNewSectionReviewDialog}>Add Section</Button>
              </div>}
              { selectedPerformancePlan !== null && value === 1 &&
              !(selectedPerformancePlan.hasOwnProperty("performanceReview") && selectedPerformancePlan["performanceReview"]) &&
              <div className="profile-card">
                <Typography>You currently have no performance review for this work plan. Click on the button below to add a performance review for this plan: </Typography>
                <Button className={classes.addDocButton} value={0} onClick={this.makeReview}>Add Review</Button>
              </div>}
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}


PerformanceModule.propTypes = {
  classes: PropTypes.object.isRequired,
  performancePlans: PropTypes.object.isRequired,
  profile:PropTypes.object.isRequired
};

export default withStyles(styles)(PerformanceModule);
