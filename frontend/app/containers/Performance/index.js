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
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
let uniqid = require('uniqid');


const styles = theme => ({
  root: {
    width: '95%',
    marginTop: theme.spacing.unit * 3,
    marginLeft: '2.5%',
    paddingBottom: '20px',
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
  constructor(props) {
    super(props);

    this.state = {
      profile: {firstname: "Justin", lastname: "Case", id: "1", sin: "777 777 777", role: {name: "Developer"}, status: "Active", salary: 60000, manager: "Sarah James", type: "FT", vacation: 12, address: "Box 123", phone: "555-5555"},
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
                  id: uniqid(),
                  "Column 1": "Data for column 1",
                  "Column 2": "Data for column 2",
                  "Column 3": "Data for column 3"
                },
                {
                  id: uniqid(),
                  "Column 1": "2 Data for column 1",
                  "Column 2": "2 Data for column 2",
                  "Column 3": "2 Data for column 3"
                },
                {
                  id: uniqid(),
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
                  id: uniqid(),
                  "Column 1": "Data for column 1",
                  "Column 2": "Data for column 2"
                },
                {
                  id: uniqid(),
                  "Column 1": "2 Data for column 1",
                  "Column 2": "2 Data for column 2"
                },
                {
                  id: uniqid(),
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
                  id: uniqid(),
                  "Column 1": "Data for column 1"
                },
                {
                  id: uniqid(),
                  "Column 1": "2 Data for column 1"
                },
                {
                  id: uniqid(),
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
                    id: uniqid(),
                    "Column 1": "Data for column 1",
                    "Column 2": "Data for column 2",
                    "Column 3": "Data for column 3"
                  },
                  {
                    id: uniqid(),
                    "Column 1": "2 Data for column 1",
                    "Column 2": "2 Data for column 2",
                    "Column 3": "2 Data for column 3"
                  },
                  {
                    id: uniqid(),
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
                    id: uniqid(),
                    "Column 1": "Data for column 1",
                    "Column 2": "Data for column 2"
                  },
                  {
                    id: uniqid(),
                    "Column 1": "2 Data for column 1",
                    "Column 2": "2 Data for column 2"
                  },
                  {
                    id: uniqid(),
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
                    id: uniqid(),
                    "Column 1": "Data for column 1"
                  },
                  {
                    id: uniqid(),
                    "Column 1": "2 Data for column 1"
                  },
                  {
                    id: uniqid(),
                    "Column 1": "3 Data for column 1"
                  }
                ]
              },
            ]
          }
        }
      ],
      selectedYear: "",
      value: 0,
      openNewSectionDialog: false,
      openNewReviewSectionDialog: false,
      openNewPerformancePlanDialog: false,
      columnsForNewSection: [0]
    };
  }

  // state = {
  //   profile: {firstname: "Justin", lastname: "Case", id: "1", sin: "777 777 777", role: {name: "Developer"}, status: "Active", salary: 60000, manager: "Sarah James", type: "FT", vacation: 12, address: "Box 123", phone: "555-5555"},
  //   performancePlans: [
  //     {
  //       year: "2019",
  //       sections: [
  //         {
  //           sectionId: 1,
  //           sectionName: "First Section",
  //           columns: ["Column 1", "Column 2", "Column 3"],
  //           data: [
  //             {
  //               "Column 1": "Data for column 1",
  //               "Column 2": "Data for column 2",
  //               "Column 3": "Data for column 3"
  //             },
  //             {
  //               "Column 1": "2 Data for column 1",
  //               "Column 2": "2 Data for column 2",
  //               "Column 3": "2 Data for column 3"
  //             },
  //             {
  //               "Column 1": "3 Data for column 1",
  //               "Column 2": "3 Data for column 2",
  //               "Column 3": "3 Data for column 3"
  //             }
  //           ]
  //         },
  //         {
  //           sectionId: 2,
  //           sectionName: "Second Section",
  //           columns: ["Column 1", "Column 2"],
  //           data: [
  //             {
  //               "Column 1": "Data for column 1",
  //               "Column 2": "Data for column 2"
  //             },
  //             {
  //               "Column 1": "2 Data for column 1",
  //               "Column 2": "2 Data for column 2"
  //             },
  //             {
  //               "Column 1": "3 Data for column 1",
  //               "Column 2": "3 Data for column 2"
  //             }
  //           ]
  //         },
  //         {
  //           sectionId: 3,
  //           sectionName: "Third Section",
  //           columns: ["Column 1"],
  //           data: [
  //             {
  //               "Column 1": "Data for column 1"
  //             },
  //             {
  //               "Column 1": "2 Data for column 1"
  //             },
  //             {
  //               "Column 1": "3 Data for column 1"
  //             }
  //           ]
  //         },
  //       ],
  //       performanceReview: {
  //         year: "2019",
  //         sections: [
  //           {
  //             sectionId: 1,
  //             sectionName: "First Section",
  //             columns: ["Column 1", "Column 2", "Column 3"],
  //             data: [
  //               {
  //                 "Column 1": "Data for column 1",
  //                 "Column 2": "Data for column 2",
  //                 "Column 3": "Data for column 3"
  //               },
  //               {
  //                 "Column 1": "2 Data for column 1",
  //                 "Column 2": "2 Data for column 2",
  //                 "Column 3": "2 Data for column 3"
  //               },
  //               {
  //                 "Column 1": "3 Data for column 1",
  //                 "Column 2": "3 Data for column 2",
  //                 "Column 3": "3 Data for column 3"
  //               }
  //             ]
  //           },
  //           {
  //             sectionId: 2,
  //             sectionName: "Second Section",
  //             columns: ["Column 1", "Column 2"],
  //             data: [
  //               {
  //                 "Column 1": "Data for column 1",
  //                 "Column 2": "Data for column 2"
  //               },
  //               {
  //                 "Column 1": "2 Data for column 1",
  //                 "Column 2": "2 Data for column 2"
  //               },
  //               {
  //                 "Column 1": "3 Data for column 1",
  //                 "Column 2": "3 Data for column 2"
  //               }
  //             ]
  //           },
  //           {
  //             sectionId: 3,
  //             sectionName: "Third Section",
  //             columns: ["Column 1"],
  //             data: [
  //               {
  //                 "Column 1": "Data for column 1"
  //               },
  //               {
  //                 "Column 1": "2 Data for column 1"
  //               },
  //               {
  //                 "Column 1": "3 Data for column 1"
  //               }
  //             ]
  //           },
  //         ]
  //       }
  //     }
  //   ],
  //   selectedYear: "",
  //   value: 0,
  //   openNewSectionDialog: false,
  //   openNewReviewSectionDialog: false,
  //   openNewPerformancePlanDialog: false,
  //   columnsForNewSection: [0]
  // };

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
  handleDeleteRowsInPlan = (sectionId, ids) => {
    let selectedPlan = this.getPerformancePlanOfSelectedYear();

    let performancePlans = this.state.performancePlans;
    for (let plan of performancePlans) {
      if (plan === selectedPlan) {
        for (let section of plan.sections) {
          if (section.sectionId === sectionId) {
            for (let id of ids) {
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
  };

  // Delete data in the given section for review
  handleDeleteRowsInReview = (sectionId, ids) => {
    let selectedPlan = this.getPerformancePlanOfSelectedYear();

    let performancePlans = this.state.performancePlans;
    for (let plan of performancePlans) {
      if (plan === selectedPlan) {
        for (let section of plan.performanceReview.sections) {
          if (section.sectionId === sectionId) {
            for (let id of ids) {
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
        <WorkPlanDisplay sections={selectedPerformancePlan.sections}
                         profile={profile}
                         year = {selectedPerformancePlan.year}
                         handleAddRow={this.handleAddRow}
                         handleDeleteRows={this.handleDeleteRowsInPlan}/>
        </div>}
      { selectedPerformancePlan !== null && value === 1 &&
        selectedPerformancePlan.hasOwnProperty("performanceReview") && selectedPerformancePlan["performanceReview"] &&
      <div className="profile-card">
        <Button className={classes.editButton} onClick={this.saveWorkPlan}>Save</Button>
        <Button className={classes.editButton} onClick={this.openNewSectionReviewDialog}>Add Section</Button>
        <PerformanceReviewDisplay sections={selectedPerformancePlan.performanceReview.sections}
                                  year = {selectedPerformancePlan.performanceReview.year}
                                  profile={profile}
                                  handleAddRow={this.handleAddReviewRow}
                                  handleDeleteRows={this.handleDeleteRowsInReview}/>
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


PerformacePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PerformacePage);
