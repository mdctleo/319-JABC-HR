import Typography from '@material-ui/core/Typography/Typography';
import FormControl from '@material-ui/core/FormControl/FormControl';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Tabs from '@material-ui/core/Tabs/Tabs';
import Tab from '@material-ui/core/Tab/Tab';
import Button from '@material-ui/core/Button/Button';
import WorkPlanDisplay from 'components/WorkPlanDisplay/index';
import WorkPlanForm from 'components/WorkPlanForm/index';
import PerformanceReviewDisplay from 'components/PerformanceReviewDisplay/index';
import PerformanceReviewForm from 'components/PerformanceReviewForm/index';
import orange from '@material-ui/core/colors/orange';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

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

class EmployeePerformance extends React.PureComponent {
  state = {
    miniTabValue: 0,
    sampleWorkPlan: {
      date: 'September 16, 2019',
      section1: {
        rows: [
          { column1: 'Department X', column2: 'Goal X' },
          { column1: 'Department Y', column2: 'Goal Y' },
        ],
      },
      section2: {
        rows: [
          { column1: 'Program X', column2: 'Goal X' },
          { column1: 'Program Y', column2: 'Goal Y' },
        ],
      },
      section3: {
        rows: [
          { column1: 'Competency X', column2: 'Explanation X' },
          { column1: 'Competency Y', column2: 'Explanation Y' },
        ],
      },
      section4: {
        rows: [
          { column1: 'Objective X', column2: 'Support X' },
          { column1: 'Objective Y', column2: 'Support Y' },
        ],
      },
      section5: {
        rows: [
          { column1: 'Goal X', column2: 'Activity X' },
          { column1: 'Goal Y', column2: 'Activity Y' },
        ],
      },
      section6: {
        rows: [
          { column1: 'Goal X', column2: 'Activity X', column3: 'Comment X' },
          { column1: 'Goal Y', column2: 'Activity Y', column3: 'Comment Y' },
        ],
      },
    },
    samplePR: {
      date: 'September 16, 2019',
      section1: {
        rows: [
          { column1: 'Goal X', column2: 'Activity X', column3: 'Comment X' },
          { column1: 'Goal Y', column2: 'Activity Y', column3: 'Comment Y' },
        ],
      },
      section2: {
        rows: [
          { column1: 'Goal X', column2: 'Activity X', column3: 'Comment X' },
          { column1: 'Goal Y', column2: 'Activity Y', column3: 'Comment Y' },
        ],
      },
      section3: {
        rows: [
          { column1: 'Goal X', column2: 'Activity X', column3: 'Comment X' },
          { column1: 'Goal Y', column2: 'Activity Y', column3: 'Comment Y' },
        ],
      },
      section4: {
        rows: [
          { column1: 'Goal X', column2: 'Activity X', column3: 'Comment X' },
          { column1: 'Goal Y', column2: 'Activity Y', column3: 'Comment Y' },
        ],
      },
      section5: {
        rows: [
          { column1: 'Goal X', column2: 'Activity X', column3: 'Comment X' },
          { column1: 'Goal Y', column2: 'Activity Y', column3: 'Comment Y' },
        ],
      },
      section6: {
        rows: [
          { column1: 'Goal X', column2: 'Activity X', column3: 'Comment X' },
          { column1: 'Goal Y', column2: 'Activity Y', column3: 'Comment Y' },
        ],
      },
    },
  };

  handleMiniTabChange = (event, value) => {
    this.setState({ miniTabValue: value });
    this.props.setEditing(false);
  };

  render() {
    const { classes, selectedEmployee, editing, role } = this.props;
    const { miniTabValue, samplePR, sampleWorkPlan } = this.state;

    return (
      <div className="profile-card">
        <Typography className={classes.employeeName} variant="h5">
          {selectedEmployee.firstname} {selectedEmployee.lastname}
        </Typography>
        <FormControl className={classes.formControl}>
          <InputLabel>Year</InputLabel>
          <Select onChange={this.handleSelect}>
            <MenuItem value={0}>2019-2020</MenuItem>
            <MenuItem value={1}>2018-2019</MenuItem>
          </Select>
          {/* {this.generateDropdown()} */}
        </FormControl>
        <AppBar position="static" className={classes.appBar}>
          <Tabs
            value={miniTabValue}
            classes={{
              root: classes.miniTabs,
              indicator: classes.tabsIndicator,
            }}
            indicatorColor="#ff5000"
            textColor="white"
            onChange={this.handleMiniTabChange}
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
        {miniTabValue === 0 &&
          !editing && (
            <div className={classes.docDisplay}>
              <Button
                className={classes.editWPButton}
                onClick={this.handleClickEdit}
              >
                Edit
              </Button>
              <WorkPlanDisplay
                form={sampleWorkPlan}
                years="2019-2020"
                profile={selectedEmployee}
                role={role}
              />
            </div>
          )}
        {miniTabValue === 0 &&
          editing && (
            <div>
              <WorkPlanForm
                form={sampleWorkPlan}
                years="2019-2020"
                profile={selectedEmployee}
                role={role}
              />
              <Button
                className={classes.cancelButton}
                onClick={this.cancelEdit}
              >
                Cancel
              </Button>
              <Button
                className={classes.saveButton}
                onClick={this.updateReview}
              >
                Save
              </Button>
            </div>
          )}
        {miniTabValue === 1 &&
          !editing && (
            <div className={classes.docDisplay}>
              <Button
                className={classes.editWPButton}
                onClick={this.handleClickEdit}
              >
                Edit
              </Button>
              <PerformanceReviewDisplay
                form={samplePR}
                years="2019-2020"
                profile={selectedEmployee}
              />
            </div>
          )}
        {miniTabValue === 1 &&
          editing && (
            <div>
              <PerformanceReviewForm
                form={samplePR}
                years="2019-2020"
                profile={selectedEmployee}
                role={role}
              />
              <Button
                className={classes.cancelButton}
                onClick={this.cancelEdit}
              >
                Cancel
              </Button>
              <Button
                className={classes.saveButton}
                onClick={this.updateReview}
              >
                Save
              </Button>
            </div>
          )}
      </div>
    );
  }
}

EmployeePerformance.propTypes = {
  classes: PropTypes.object.isRequired,
  setEditing: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
  selectedEmployee: PropTypes.object.isRequired,
  role: PropTypes.object,
};

export default withStyles(styles)(EmployeePerformance);
