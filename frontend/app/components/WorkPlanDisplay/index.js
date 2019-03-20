/**
 *
 * WorkPlanDisplay
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import PerformanceSection from "../PerformanceSection/PerformanceSection";


const styles = theme => ({
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
  subHeading: {
    marginTop: '40px'
  },
  firstTopHeading: {
    marginTop: '40px'
  },
  topHeading: {
    marginTop: '20px'
  },
  displayTable: {
    width: '100%',
    marginTop: '20px',
  },
  description: {
    marginTop: '20px',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  tableHead: {
      backgroundColor: '#e0e0e0',
      width: '100%',
  }
});

class WorkPlanDisplay extends React.PureComponent  {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, sections, year, profile } = this.props;

    return(
      <div>
        <Typography className={classes.firstTopHeading} variant="subtitle1" color="textPrimary">Name: {profile.firstname} {profile.lastname}</Typography>
        <Typography className={classes.topHeading} variant="subtitle1" color="textPrimary">Position: {profile.role.name}</Typography>
        {this.props.sections.map(function(section) {
          return <PerformanceSection classes = {classes} section = {section}/>
        })
        }
        </div>
    )
  }
}

WorkPlanDisplay.propTypes = {
  classes: PropTypes.object.isRequired,
  sections: PropTypes.array.isRequired,
  year: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired,
};

export default withStyles(styles)(WorkPlanDisplay);
