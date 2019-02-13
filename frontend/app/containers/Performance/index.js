/**
 *
 * Performance
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PerformanceSideNav from 'components/PerformanceSideNav'
import PerformanceMain from "../../components/PerformanceMain";



const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '88vh',
    padding: theme.spacing.unit
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

/* eslint-disable react/prefer-stateless-function */
class Performance extends React.PureComponent {
  constructor(props){
    super(props);
    document.body.style.overflow = 'hidden'
  }

  componentWillUnmount() {
    document.body.style.overflow = 'scroll'
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid className={classes.grid} container spacing={24}>
          <Grid xs={12} md={3}>
            <PerformanceSideNav/>
          </Grid>
          <Grid item xs={12} md={9}>
            <PerformanceMain/>
          </Grid>
        </Grid>
      </div> //
    );
  }
}

Performance.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Performance);
