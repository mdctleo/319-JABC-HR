/**
 *
 * WorkPlanDisplay
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import PerformanceSection from '../PerformanceSection/PerformanceSection';

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
    },
  },
  subHeading: {
    marginTop: '40px',
  },
  firstTopHeading: {
    marginTop: '40px',
  },
  topHeading: {
    marginTop: '10px',
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
  },
});

class WorkPlanDisplay extends React.Component {
  updateSection = (section) => {
    this.props.updateSection(section, true);
  };

  render() {
    const { classes, sections, profile, role } = this.props;
    const that = this;

    return (
      <div>
        <h4>Individual Work Plan {this.props.year}</h4>
        <Typography
          className={classes.firstTopHeading}
          variant="subtitle1"
          color="textPrimary"
        >
          Name: {profile.firstname} {profile.lastname}
        </Typography>
        <Typography
          className={classes.topHeading}
          variant="subtitle1"
          color="textPrimary"
        >
          Position: {role && role.name}
        </Typography>
        {sections &&
          sections.map(section => (
            <PerformanceSection
              key={section.id}
              classes={classes}
              section={section}
              handleDeleteSection={that.props.handleDeleteSection}
              handleAddRow={that.props.handleAddRow}
              handleDeleteRows={that.props.handleDeleteRows}
              updateSection={(newSection) => that.updateSection(newSection)}
              canEditReview
            />
          ))}
      </div>
    );
  }
}

WorkPlanDisplay.propTypes = {
  classes: PropTypes.object.isRequired,
  sections: PropTypes.array,
  profile: PropTypes.object.isRequired,
  year: PropTypes.string.isRequired,
  role: PropTypes.object,
  handleDeleteSection: PropTypes.func.isRequired,
  handleDeleteRows: PropTypes.func.isRequired,
  handleAddRow: PropTypes.func.isRequired,
  updateSection: PropTypes.func.isRequired,
};

export default withStyles(styles)(WorkPlanDisplay);
