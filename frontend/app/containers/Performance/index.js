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
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import WorkPlanDisplay from '../../components/WorkPlanDisplay';
import WorkPlanForm from '../../components/WorkPlanForm';
import Button from '@material-ui/core/Button';

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
});


class PerformacePage extends React.Component {


  state = {
    profile: {firstname: "firstname", lastname: "lastname", id: "1", sin: "777 777 777", role: {name: "Developer"}, status: "Active", salary: 60000, manager: "Sarah James", type: "FT", vacation: 12, address: "Box 123", phone: "555-5555"},
    form: {date: "January 16, 2017", section1: { rows: [{ column1: "Department X", column2: "Goal X"}, {column1: "Department Y", column2: "Goal Y"}]}, 
                                     section2: { rows: [{ column1: "Program X", column2: "Goal X"}, {column1: "Program Y", column2: "Goal Y"}]},
                                     section3: { rows: [{ column1: "Competency X", column2: "Explanation X"}, {column1: "Competency Y", column2: "Explanation Y"}]},
                                     section4: { rows: [{ column1: "Objective X", column2: "Support X"}, {column1: "Objective Y", column2: "Support Y"}]},
                                     section5: { rows: [{ column1: "Goal X", column2: "Activity X"}, {column1: "Goal Y", column2: "Activity Y"}]},
                                     section6: { rows: [{ column1: "Date X", column2: "Commenter X", column3: "Comment X"}, {column1: "Date Y", column2: "Commenter Y", column3: "Comment Y"}]}},
    years: "2019-2020",  
    value: 0,
    edit: 0,
  }

  handleClickEdit = (event, value) => {
    this.setState({
      edit: 1,
    });
  };

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
    this.setState({ form: { date: date, section1: section1, section2: section2, section3: section3, section4: section4, section5: section5, section6: section6}});
    console.log(this.state.form);
    this.setState({ edit: 0 });
}

  render() {
    const { classes } = this.props;
    const { profile, form, years, value, edit } = this.state;

    return (
      <div>
      <h1>Performance</h1>
      <FormControl className={classes.formControl}>
          <InputLabel>
            Year
          </InputLabel>
          <Select>
            <MenuItem value="2019-2020">
              <em>2019-2020</em>
            </MenuItem>
            <MenuItem value="2018-2019">2018-2019</MenuItem>
            <MenuItem value="2017-2018">2017-2018</MenuItem>
            <MenuItem value="2016-2017">2016-2017</MenuItem>
            <MenuItem value={0}>Add Year</MenuItem>
          </Select>
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
      <div>
      { value == 0 && edit == 0 &&
      <div className="profile-card">
        <Button className={classes.editButton} onClick={this.handleClickEdit}>Edit</Button> 
        <WorkPlanDisplay form={form} years={years} profile={profile}/>
        </div>}
      { value == 0 && edit == 1 && 
        <div>
          <WorkPlanForm form={form} years={years} profile={profile}/>
          <Button className={classes.formButton} onClick={this.updatePlan}>Submit</Button>
          <Button className={classes.formButton} onClick={this.updatePlan}>Save</Button>
        </div>}
      { value == 1 && edit == 0 &&
      <div className="profile-card">
        <Button className={classes.editButton} onClick={this.handleClickEdit}>Edit</Button> 
        <WorkPlanDisplay form={form} years={years} profile={profile}/>
      </div>}
      { value == 1 && edit == 1 && 
        <div>
          <WorkPlanForm form={form} years={years} profile={profile}/>
          <Button className={classes.formButton} onClick={this.updatePlan}>Submit</Button>
          <Button className={classes.formButton} onClick={this.updatePlan}>Save</Button>
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

