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
    addDialog: false,
    profile: {firstname: "firstname", lastname: "lastname", id: "1", sin: "777 777 777", role: {name: "Developer"}, status: "Active", salary: 60000, manager: "Sarah James", type: "FT", vacation: 12, address: "Box 123", phone: "555-5555"},
    workPlans: {},
    performanceReviews: {},
    currentYears: 0,
    value: 0,
    edit: 0,
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
  };

  handleClickEdit = (event, value) => {
    this.setState({
      edit: 1,
    });
  };

  handleCancel = (event, value) => {
    this.setState({ edit: 0});
  }

  handleSelect = (event, value) => {
    if (event.target.value == 0) {
      this.setState({ addDialog: true });
    } else {
      this.setState({ currentYears: event.target.value });
    }
  }

  handleClose = (event, value) => {
    this.setState({ addDialog: false });
    this.setState({ edit: 1 });
  }

  handleYearsDialog = (event, value) => {
    var newYears = document.getElementById("years-dialog").value;
    this.setState({ currentYears: newYears});
    var newWP = { date: "", section1: { rows: [{ column1: "", column2: ""}]}, section2: { rows: [{ column1: "", column2: ""}]}, section3: { rows: [{ column1: "", column2: ""}]}, section4: { rows: [{ column1: "", column2: ""}]}, section5: { rows: [{ column1: "", column2: ""}]}, section6: { rows: [{ column1: "", column2: "", column3: ""}]}};
    var newPR = { date: "", section1: { rows: [{ column1: "", column2: "", column3: ""}]}, section2: { rows: [{ column1: "", column2: "", column3: ""}]}, section3: { rows: [{ column1: "", column2: "", column3: ""}]}, section4: { rows: [{ column1: "", column2: "", column3: ""}]}, section5: { rows: [{ column1: "", column2: "", column3: ""}]}, section6: { rows: [{ column1: "", column2: "", column3: ""}]}};
    var prCopy = this.state.performanceReviews;
    prCopy[newYears] = newPR;
    var wpCopy = this.state.workPlans;
    wpCopy[newYears] = newWP;
    this.setState({ workPlans: wpCopy });
    this.setState({ performanceReviews: prCopy });
    this.setState({ addDialog: false});
    this.setState({ edit: 1 });

  }

  updatePlan = (event, value) => {
    var date = document.getElementById("wpf-date").value ? document.getElementById("wpf-date").value : document.getElementById("wpf-date").defaultValue;
    var section1 = { rows: []};
    var section1s = document.getElementsByClassName("wpf-rows-1");
    console.log(section1s[1].firstChild.firstChild);
    for (var i = 0; i < section1s.length; i++) {
      var input = section1s[i].firstChild.firstChild;
      if (i % 2 == 0) {
        input.value ? section1.rows.push({ column1: input.value }) : section1.rows.push({ column1: input.defaultValue });
        console.log(input.value);
        console.log(section1.rows);
      } else {
        console.log(Math.floor(i/2));
        section1.rows[Math.floor(i/2)].column2 = input.value ? input.value : input.defaultValue;
      }
    }

    var section2 = { rows: []};
    var section2s = document.getElementsByClassName("wpf-rows-2");
    for (var i = 0; i < section2s.length; i++) {
      var input = section2s[i].firstChild.firstChild;
      if (i % 2 == 0) {
        input.value ? section2.rows.push({ column1: input.value }) : section2.rows.push({ column1: input.defaultValue });
      } else {
        section2.rows[Math.floor(i/2)].column2 = input.value ? input.value : input.defaultValue;
      }
    }

    var section3 = { rows: []};
    var section3s = document.getElementsByClassName("wpf-rows-3");
    for (var i = 0; i < section3s.length; i++) {
      var input = section3s[i].firstChild.firstChild;
      if (i % 2 == 0) {
        input.value ? section3.rows.push({ column1: input.value }) : section3.rows.push({ column1: input.defaualue });
      } else {
        section3.rows[Math.floor(i/2)].column2 = input.value ? input.value : input.defaultValue;
      }
    }

    var section4 = { rows: []};
    var section4s = document.getElementsByClassName("wpf-rows-4");
    for (var i = 0; i < section4s.length; i++) {
      var input = section4s[i].firstChild.firstChild;
      if (i % 2 == 0) {
        input.value  ? section4.rows.push({ column1: input.value }) : section4.rows.push({ column1: input.defaultValue });
      } else {
        section4.rows[Math.floor(i/2)].column2 = input.value ? input.value : input.defaultValue;
      }
    }

    var section5 = { rows: []};
    var section5s = document.getElementsByClassName("wpf-rows-5");
    for (var i = 0; i < section5s.length; i++) {
      var input = section5s[i].firstChild.firstChild;
      if (i % 2 == 0) {
        input.value ? section5.rows.push({ column1: input.value }) : section5.rows.push({ column1: input.defaultValue });
      } else {
        section5.rows[Math.floor(i/2)].column2 = input.value ? input.value : input.defaultValue;
      }
    }

    var section6 = { rows: []};
    var section6s = document.getElementsByClassName("wpf-rows-6");
    for (var i = 0; i < section6s.length; i++) {
      var input = section6s[i].firstChild.firstChild;
      if (i % 3 == 0) {
        input.value ? section6.rows.push({ column1: input.value }) : section6.rows.push({ column1: input.defaultValue });
      } else if (i % 3 == 1) {
        section6.rows[Math.floor(i/3)].column2 = input.value ? input.value : input.defaultValue;
      } else {
        section6.rows[Math.floor(i/3)].column3 = input.value ? input.value  : input.defaultValue;
      }
    }
    var workPlansCopy = this.state.workPlans;
    workPlansCopy[this.state.currentYears] = { date: date, section1: section1, section2: section2, section3: section3, section4: section4, section5: section5, section6: section6};
    this.setState({ workPlans: workPlansCopy });
    var prCopy = this.state.performanceReviews;
    prCopy[this.state.currentYears] = { date: prCopy[this.state.currentYears].date, section1: workPlansCopy[this.state.currentYears].section1, section2: workPlansCopy[this.state.currentYears].section2, section3: workPlansCopy[this.state.currentYears].section3, section4: workPlansCopy[this.state.currentYears].section4, section5: workPlansCopy[this.state.currentYears].section5, section6: workPlansCopy[this.state.currentYears].section6};
    this.setState({ performanceReviews: prCopy });
    this.setState({ edit: 0 });
}

updateReview = (event, value) => {
  var date = document.getElementById("prf-date").value ? document.getElementById("prf-date").value : document.getElementById("prf-date").defaultValue;
  var section1 = { rows: []};
  var section1s = document.getElementsByClassName("prf-rows-1");
  console.log(section1s[1].firstChild.firstChild);
  for (var i = 0; i < section1s.length; i++) {
    var input = section1s[i].firstChild.firstChild;
    if (i % 2 == 0) {
      input.value ? section1.rows.push({ column1: input.value }) : section1.rows.push({ column1: input.defaultValue });
      console.log(input.value);
      console.log(section1.rows);
    } else {
      console.log(Math.floor(i/2));
      section1.rows[Math.floor(i/2)].column2 = input.value ? input.value : input.defaultValue;
    }
  }

  var section2 = { rows: []};
  var section2s = document.getElementsByClassName("wpf-rows-2");
  for (var i = 0; i < section2s.length; i++) {
    var input = section2s[i].firstChild.firstChild;
    if (i % 3 == 0) {
      input.value ? section2.rows.push({ column1: input.value }) : section2.rows.push({ column1: input.defaultValue });
    } else if (i % 3 == 1) {
      section2.rows[Math.floor(i/3)].column2 = input.value ? input.value : input.defaultValue;
    } else {
      section2.rows[Math.floor(i/3)].column3 = input.value ? input.value  : input.defaultValue;
    }
  }

  var section3 = { rows: []};
  var section3s = document.getElementsByClassName("wpf-rows-3");
  for (var i = 0; i < section3s.length; i++) {
    var input = section3s[i].firstChild.firstChild;
    if (i % 3 == 0) {
      input.value ? section3.rows.push({ column1: input.value }) : section3.rows.push({ column1: input.defaultValue });
    } else if (i % 3 == 1) {
      section3.rows[Math.floor(i/3)].column2 = input.value ? input.value : input.defaultValue;
    } else {
      section3.rows[Math.floor(i/3)].column3 = input.value ? input.value  : input.defaultValue;
    }
  }

  var section4 = { rows: []};
  var section4s = document.getElementsByClassName("wpf-rows-4");
  for (var i = 0; i < section4s.length; i++) {
    var input = section4s[i].firstChild.firstChild;
    if (i % 3 == 0) {
      input.value ? section4.rows.push({ column1: input.value }) : section4.rows.push({ column1: input.defaultValue });
    } else if (i % 3 == 1) {
      section4.rows[Math.floor(i/3)].column2 = input.value ? input.value : input.defaultValue;
    } else {
      section4.rows[Math.floor(i/3)].column3 = input.value ? input.value  : input.defaultValue;
    }
  }

  var section5 = { rows: []};
  var section5s = document.getElementsByClassName("wpf-rows-5");
  for (var i = 0; i < section5s.length; i++) {
    var input = section5s[i].firstChild.firstChild;
    if (i % 3 == 0) {
      input.value ? section5.rows.push({ column1: input.value }) : section5.rows.push({ column1: input.defaultValue });
    } else if (i % 3 == 1) {
      section5.rows[Math.floor(i/3)].column2 = input.value ? input.value : input.defaultValue;
    } else {
      section5.rows[Math.floor(i/3)].column3 = input.value ? input.value  : input.defaultValue;
    }
  }

  var section6 = { rows: []};
  var section6s = document.getElementsByClassName("wpf-rows-6");
  for (var i = 0; i < section6s.length; i++) {
    var input = section6s[i].firstChild.firstChild;
    if (i % 3 == 0) {
      input.value ? section6.rows.push({ column1: input.value }) : section6.rows.push({ column1: input.defaultValue });
    } else if (i % 3 == 1) {
      section6.rows[Math.floor(i/3)].column2 = input.value ? input.value : input.defaultValue;
    } else {
      section6.rows[Math.floor(i/3)].column3 = input.value ? input.value  : input.defaultValue;
    }
  }
  var prCopy = this.state.performanceReviews;
  prCopy[this.state.currentYears] = { date: date, section1: section1, section2: section2, section3: section3, section4: section4, section5: section5, section6: section6};
  this.setState({ performanceReviews: prCopy });
  this.setState({ edit: 0 });
}

handleChange = (event, value) => {
  this.setState({ value });
};

generateDropdown() {
    var years = Object.keys(this.state.workPlans);
    return (<Select
              onChange={this.handleSelect}>
              {years.map(function(yearSpan, index){
                return <MenuItem value={yearSpan}>{yearSpan}</MenuItem>})}
              <MenuItem value={0}>Add Year</MenuItem>
          </Select>)
}

  handleAddRow = (sectionId) => {
    console.log(sectionId);

    let sections = this.state.sections;
    for (let section of sections) {
      if (section.sectionId === sectionId) {
        section.sectionName = "Blarg";
        section.data = [...section.data, {"Column 1": "Data for column 1"}];
      }
    }

    this.setState( { sections: sections});
  };

  render() {
    const { classes } = this.props;
    const { sections, profile, workPlans, performanceReviews, currentYears, value, edit } = this.state;

    console.log("rendering performance");
    console.log("Number of data for section 1: " + sections[0].data.length);
    // return (
    //   <div>
    //   <h1>Performance</h1>
    //   <FormControl className={classes.formControl}>
    //       <InputLabel>
    //         Year
    //       </InputLabel>
    //       {this.generateDropdown()}
    //     </FormControl>
    //     <Paper className={classes.root}>
    //       <div>
    //       <AppBar position="static" className={classes.appBar}>
    //       <Tabs value={value} classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
    //             onChange={this.handleChange}>
    //         <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
    //              label="Work Plan" />
    //         <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
    //              label="Performance Review" />
    //     </Tabs>
    //      </AppBar>
    //      <Dialog
    //       open={this.state.addDialog}
    //       onClose={this.handleClose}
    //       aria-labelledby="form-dialog-title"
    //     >
    //       <DialogTitle id="form-dialog-title">Enter Year Span</DialogTitle>
    //       <DialogContent>
    //         <DialogContentText>
    //           Enter the span of years for the new performance documents:
    //         </DialogContentText>
    //         <TextField
    //           autoFocus
    //           margin="dense"
    //           id="years-dialog"
    //           label="Year Span"
    //           fullWidth
    //         />
    //       </DialogContent>
    //       <DialogActions>
    //         <Button onClick={this.handleClose} color="primary">
    //           Cancel
    //         </Button>
    //         <Button onClick={this.handleYearsDialog} color="primary">
    //           OK
    //         </Button>
    //       </DialogActions>
    //     </Dialog>
    //   <div>
    //   { currentYears == 0 &&
    //     <div className="profile-card">
    //       <Typography>You currently have no performance documents. Click on the button below to add your first Performance Documents for a given year: </Typography>
    //       <Button className={classes.addDocButton} value={0} onClick={this.handleSelect}>Add Year</Button>
    //     </div> }
    //   { currentYears !== 0 && value == 0 && edit == 0 &&
    //   <div className="profile-card">
    //     <Button className={classes.editButton} onClick={this.handleClickEdit}>Edit</Button>
    //     <WorkPlanDisplay sections={sections} year={currentYears} profile={profile} handleAddRow={this.handleAddRow}/>
    //     </div>}
    //   { currentYears !== 0 && value == 0 && edit == 1 &&
    //     <div>
    //       <WorkPlanForm form={workPlans[currentYears]} years={currentYears} profile={profile}/>
    //       <Button className={classes.formButton} onClick={this.updatePlan}>Submit</Button>
    //       <Button className={classes.formButton} onClick={this.handleCancel}>Cancel</Button>
    //     </div>}
    //   { currentYears !== 0 && value == 1 && edit == 0 &&
    //   <div className="profile-card">
    //     <Button className={classes.editButton} onClick={this.handleClickEdit}>Edit</Button>
    //     <PerformanceReviewDisplay form={performanceReviews[currentYears]} years={currentYears} profile={profile}/>
    //   </div>}
    //   { currentYears !== 0 && value == 1 && edit == 1 &&
    //     <div>
    //       <PerformanceReviewForm form={performanceReviews[currentYears]} years={currentYears} profile={profile}/>
    //       <Button className={classes.formButton} onClick={this.updateReview}>Submit</Button>
    //       <Button className={classes.formButton} onClick={this.handleCancel}>Cancel</Button>
    //     </div>}
    //      </div>
    //      </div>
    //       </Paper>
    //   </div>
    // );

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
              open={this.state.addDialog}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Enter Year Span</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Enter the span of years for the new performance documents:
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="years-dialog"
                  label="Year Span"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleYearsDialog} color="primary">
                  OK
                </Button>
              </DialogActions>
            </Dialog>
            <div>
              <div className="profile-card">
                <Button className={classes.editButton} onClick={this.handleClickEdit}>Edit</Button>
                <WorkPlanDisplay sections={sections} year={currentYears} profile={profile} handleAddRow={this.handleAddRow}/>
              </div>
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
