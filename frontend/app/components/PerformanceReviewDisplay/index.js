/**
 *
 * PerformanceReviewDisplay
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


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

class PerformanceReviewDisplay extends React.PureComponent  {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, form, years, profile, role } = this.props;

    function generate3ColumnTable(column1, column2, column3, section, sectionNum) {
        return (
          <div>
            <TableRow className={classes.tableHead}>
                <TableCell id={"prd-sec-head-1-"+sectionNum} align="left"><Typography variant="caption">{column1}</Typography></TableCell>
                <TableCell id={"prd-sec-head-2-"+sectionNum} align="left"><Typography variant="caption">{column2}</Typography></TableCell>
                <TableCell id={"prd-sec-head-3-"+sectionNum} align="left"><Typography variant="caption">{column3}</Typography></TableCell>
            </TableRow>
              {section.rows.map(function(row, index){
                  return <TableRow className={classes.row}>
                            <TableCell id={"prd-col-1-sec-"+sectionNum} align="left">{row.column1}</TableCell>
                            <TableCell id={"prd-col-2-sec-"+sectionNum} align="left">{row.column2}</TableCell>
                            <TableCell id={"prd-col-3-sec-"+sectionNum} align="left">{row.column3}</TableCell>
                         </TableRow>; })}
          </div>
        )};

    return (
        <div>
          <Typography variant="h5">JABC Performance Review {years}</Typography>
          <Typography className={classes.firstTopHeading} variant="subtitle1" color="textPrimary">Name: {profile.firstname} {profile.lastname}</Typography>
          <Typography className={classes.topHeading} variant="subtitle1" color="textPrimary">Position: {role && role.name}</Typography>
          <Typography className={classes.topHeading} variant="subtitle1" color="textPrimary">Date: {form.date}</Typography>
          <Typography className={classes.subHeading} variant="subtitle1" color="textSecondary">Section 1: JABC Goals</Typography>
          <Table className={classes.displayTable} fullWidth>
            <TableBody>
              {generate3ColumnTable("DEPARTMENT", "GOAL", "COMMENTS", form.section1, "1")}
            </TableBody>
          </Table> 
          <Typography className={classes.subHeading} variant="subtitle1" color="textSecondary">Section 2: Personal Targets</Typography>
          <Table className={classes.displayTable} fullWidth>
            <TableBody>
              {generate3ColumnTable("PROGRAM", "GOAL", "COMMENTS", form.section2, "2")}
            </TableBody>
          </Table> 
          <Typography className={classes.subHeading} variant="subtitle1" color="textSecondary">Section 3: Core competencies</Typography>
          <Table className={classes.displayTable} fullWidth>
            <TableBody>
              {generate3ColumnTable("COMPETENCY", "HOW IT RELATES", "COMMENTS", form.section3, "3")}
            </TableBody>
          </Table> 
          <Typography className={classes.subHeading} variant="subtitle1" color="textSecondary">Section 4: Objectives</Typography>
          <Table className={classes.displayTable} fullWidth>
            <TableBody>
              {generate3ColumnTable("OBJECTIVES & ACTIITES", "SUPPORT / COLLABORATION", "COMMENTS", form.section4, "4")}
            </TableBody>
          </Table> 
          <Typography className={classes.subHeading} variant="subtitle1" color="textSecondary">Section 5: Professional Development Goals</Typography>
          <Table className={classes.displayTable} fullWidth>
            <TableBody>
              {generate3ColumnTable("GOAL", "KEY ACTIVITES", "COMMENTS", form.section5, "5")}
            </TableBody>
          </Table> 
          <Typography className={classes.subHeading} variant="subtitle1" color="textSecondary">Section 6: Comments</Typography>
          <Table className={classes.displayTable} fullWidth>
            <TableBody>
              {generate3ColumnTable("DATE", "COMMENTER", "COMMENT", form.section6, "6")}
            </TableBody>
          </Table> 
        </div>
    );
  }
}

PerformanceReviewDisplay.propTypes = {
  classes: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  years: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired,
  role: PropTypes.object,
};

export default withStyles(styles)(PerformanceReviewDisplay);
