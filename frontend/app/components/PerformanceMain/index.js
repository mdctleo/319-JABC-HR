import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PerformanceObjComp from './PerformanceObjComp'



const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

/* eslint-disable react/prefer-stateless-function */
class PerformanceMain extends React.PureComponent {
  constructor(props){
    super(props);
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid md={9}>
            <PerformanceObjComp
              type={'Objective'}
              description={'Make 500 sales in a year'}
              comment={'WOW GOOD JOB!'}
              rating={10}/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Performance.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PerformanceMain);
