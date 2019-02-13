import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import PerformanceObjComp from './PerformanceObjComp'
import Grid from "@material-ui/core/Grid/Grid";
import Divider from "@material-ui/core/Divider/Divider";
import PerformanceComment from "./PerformanceComment";
import PerformanceCommentPrompt from "./PerformanceCommentPrompt";
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '87vh',
    overflow: 'scroll'
  },
  title: {
    marginLeft: '2.5%',
  },
  card: {
    marginLeft: '2.5%',
    marginBottom: '20px',
    paddingTop: '5px',
    paddingBottom: '5px',
    width: '95%',
    backgroundColor: '#ceefaa',
  }
});

/* eslint-disable react/prefer-stateless-function */
class PerformanceMain extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {classes} = this.props;

    return (
      <div>
        <Card className={classes.card}>
          <Typography className={classes.title} variant="h5">2018</Typography>
        </Card>
        <div className={classes.root}>
          <PerformanceObjComp
            type={'Objective'}
            description={'Host at least two youth conference in a year'}
            comment={'The previous conference was a huge success!'}
            rating={'10/10'}/>
          <PerformanceObjComp
            type={'Objective'}
            description={'Outreach to rural communities'}
            comment={'Need a little work on this'}
            rating={'7/10'}/>
          <PerformanceObjComp
            type={'Objective'}
            description={'Recruit 500 volunteers'}
            comment={'You have exceeded the targeted value, great work!'}
            rating={'10/10'}/>
          <PerformanceObjComp
            type={'Competency'}
            description={'Trust the natural Recursion'}
            comment={'You used iteration instead of recursion'}
            rating={'0/5'}/>
          <PerformanceObjComp
            type={'Competency'}
            description={'Follow the recipe'}
            comment={'Missing stubs'}
            rating={'2/5'}/>
          <Divider variant="middle" />
          <h3>Comments</h3>
          <PerformanceComment
            comment={"Overall great work! I look forward to working with you in the upcoming year!"}
            path={"test"}
          />
          <PerformanceCommentPrompt/>
        </div>
      </div>
    );
  }
}

Performance.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PerformanceMain);
