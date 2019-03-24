import React from 'react';
import Paper from "@material-ui/core/Paper/Paper";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import withStyles from "@material-ui/core/es/styles/withStyles";
import * as PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  tabs: {
    width: '800px'
  },
  formControl: {
    minWidth: 120,
    float: 'right'
  },
});

class PerformanceTab extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    value: 0,
  };

  handleTabChange = (event, value) => {
    this.setState({value})
  };

  handleYearChange = (event, value) => {

  };

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <Paper>
          <Tabs
            value={this.state.value}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab disableRipple label="Individual Work Plan"/>
            <Tab disableRipple label="Performance Review"/>
            <Tab disableRipple label="Probation Review"/>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-simple">Age</InputLabel>
              <Select
                value={this.state.age}
                onChange={this.handleChange}
                inputProps={{
                  name: 'age',
                  id: 'age-simple',
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Tabs>
        </Paper>
        {this.state.value === 0 && <h1>Individual Work Plan</h1>}
        {this.state.value === 1 && <h1>Performance Review</h1>}
        {this.state.value === 2 && <h1>Probation Review</h1>}
      </div>

    );
  }
}

PerformanceTab.propTypes = {
  classes: PropTypes.object.isRequired,
  // tabname0: PropTypes.string.isRequired,
  // tabname1: PropTypes.string.isRequired,
  // tabname2: PropTypes.string.isRequired
};

export default withStyles(styles)(PerformanceTab);

