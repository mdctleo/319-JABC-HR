/**
 *
 * WorkPlanForm
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
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';


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
  addButton: {
    margin: "auto",
    display: "block",
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

class WorkPlanForm extends React.PureComponent  {
  constructor(props) {
    super(props);
  }


  state = {
    theForm: this.props.form,
  };

  render() {
    const { classes, form, years, profile} = this.props;
    const { theForm } = this.state;

    function handleAdd2ColRow(index) {
    //   var something = document.getElementById("wpf-tbody-2");
    //   console.log(something);
    //   var tbody = document.getElementById("wpf-tbody-"+index);
    //   var lastChild = tbody.lastChild;
    //   tbody.removeChild(lastChild);
    //   var newRow = <TableRow className={classes.row}>
    //                 <TableCell align="left"><TextField id={"rf-col-1-sec-"+numCompetencies} className={"rf-rows"} defaultValue=""/></TableCell>
    //                 <TableCell align="left"><TextField id={"rf-col-2-sec-"+numCompetencies} className={"rf-rows"} defaultValue=""/></TableCell>
    //                 <TableCell align="left"><TextField id={"rf-col-3-sec-"+numCompetencies} className={"rf-rows"} defaultValue=""/></TableCell>
    //                 <TableCell align="left" id={"rf-col-4-sec-"+numCompetencies+"delete"} className={"rf-rows-delete"}><IconButton><DeleteIcon /></IconButton></TableCell>
    //                </TableRow>;
    //   var addRow = <TableRow>
    //                 <TableCell colspan={3}><IconButton className={classes.addButton} handleClick={handleAdd2ColRow(section.rows.length)}><AddIcon /></IconButton></TableCell>
    //                </TableRow>;
    // tbody.appendChild(newRow);
    // tbody.appendChild(addRow);
  }
    
    function generate2ColumnTableForm(column1, column2, section, sectionNum) {
        return (
          <div>
            <TableRow className={classes.tableHead}>
                <TableCell id={"wpf-sec-head-1-"+sectionNum} align="left"><Typography variant="caption">{column1}</Typography></TableCell>
                <TableCell id={"wpf-sec-head-2-"+sectionNum} align="left"><Typography variant="caption">{column2}</Typography></TableCell>
                <TableCell id={"wpf-sec-head-3-"+sectionNum} align="left"></TableCell>
            </TableRow>
              {section.rows.map(function(row, index){
                  return <TableRow className={classes.row} id={"wpf-entry-"+index}>
                            <TableCell align="left"><TextField id={"wpf-col-1-sec-"+sectionNum+index} className={"wpf-rows-"+sectionNum} defaultValue={row.column1}/></TableCell>
                            <TableCell align="left"><TextField id={"wpf-col-2-sec-"+sectionNum+index} className={"wpf-rows-"+sectionNum} defaultValue={row.column2}/></TableCell>
                            <TableCell align="left"id={"wpf-col-2-sec-"+sectionNum+index+"delete"} className={"wpf-rows-"+sectionNum+"delete"}><IconButton><DeleteIcon /></IconButton></TableCell>
                         </TableRow>; })}
            <TableRow>
              <TableCell colspan={3}><IconButton className={classes.addButton} handleClick={handleAdd2ColRow(section.rows.length)}><AddIcon /></IconButton></TableCell>
            </TableRow>
          </div>
        )};

    function generate3ColumnTableForm(column1, column2, column3, section, sectionNum) {
        return (
          <div>
            <TableRow className={classes.tableHead}>
                <TableCell id={"wpf-sec-head-1-"+sectionNum} align="left"><Typography variant="caption">{column1}</Typography></TableCell>
                <TableCell id={"wpf-sec-head-2-"+sectionNum} align="left"><Typography variant="caption">{column2}</Typography></TableCell>
                <TableCell id={"wpf-sec-head-3-"+sectionNum} align="left"><Typography variant="caption">{column3}</Typography></TableCell>
                <TableCell id={"wpf-sec-head-4-"+sectionNum+"delete"} align="left"></TableCell>
            </TableRow>
              {section.rows.map(function(row, index){
                  return <TableRow className={classes.row}>
                            <TableCell align="left"><TextField id={"wpf-col-1-sec-"+sectionNum+index} className={"wpf-rows-"+sectionNum} defaultValue={row.column1}/></TableCell>
                            <TableCell align="left"><TextField id={"wpf-col-2-sec-"+sectionNum+index} className={"wpf-rows-"+sectionNum} defaultValue={row.column2}/></TableCell>
                            <TableCell align="left"><TextField id={"wpf-col-3-sec-"+sectionNum+index} className={"wpf-rows-"+sectionNum} defaultValue={row.column3}/></TableCell>
                            <TableCell align="left" id={"wpf-col-4-sec-"+sectionNum+index+"delete"} className={"wpf-rows-"+sectionNum+"delete"}><IconButton><DeleteIcon /></IconButton></TableCell>
                         </TableRow>; })}
            <TableRow>
              <TableCell colspan={4}><IconButton className={classes.addButton}><AddIcon /></IconButton></TableCell>
            </TableRow>
          </div>
        )};

    return (
        <div className="profile-card">
          <Typography variant="h5">JABC Individual Work Plan {years}</Typography>
          <Typography className={classes.firstTopHeading} variant="subtitle1" color="textPrimary">Name: {profile.firstname} {profile.lastname}</Typography>
          <Typography className={classes.topHeading} variant="subtitle1" color="textPrimary">Position: {profile.role.name}</Typography>
          <TextField id="wpf-date" className={classes.topHeading} label="Date" defaultValue={theForm.date} />
          <Typography className={classes.subHeading} variant="subtitle1" color="textSecondary">Section 1: JABC Goals</Typography>
          <Table className={classes.displayTable}>
            <TableBody id="wpf-tbody-1">
              {generate2ColumnTableForm("DEPARTMENT", "GOAL", theForm.section1, "1")}
            </TableBody>
          </Table> 
          <Typography className={classes.subHeading} variant="subtitle1" color="textSecondary">Section 2: Personal Targets</Typography>
          <Table className={classes.displayTable} fullWidth>
            <TableBody id="wpf-tbody-2">
              {generate2ColumnTableForm("PROGRAM", "GOAL", theForm.section2, "2")}
            </TableBody>
          </Table> 
          <Typography className={classes.subHeading} variant="subtitle1" color="textSecondary">Section 3: Core competencies</Typography>
          <Table className={classes.displayTable} fullWidth>
            <TableBody id="wpf-tbody-3">
              {generate2ColumnTableForm("COMPETENCY", "HOW IT RELATES", theForm.section3, "3")}
            </TableBody>
          </Table> 
          <Typography className={classes.subHeading} variant="subtitle1" color="textSecondary">Section 4: Objectives</Typography>
          <Table className={classes.displayTable} fullWidth>
            <TableBody id="wpf-tbody-4">
              {generate2ColumnTableForm("OBJECTIVES & ACTIITES", "SUPPORT / COLLABORATION", theForm.section4, "4")}
            </TableBody>
          </Table> 
          <Typography className={classes.subHeading} variant="subtitle1" color="textSecondary">Section 5: Professional Development Goals</Typography>
          <Table className={classes.displayTable} fullWidth>
            <TableBody id="wpf-tbody-5">
              {generate2ColumnTableForm("GOAL", "KEY ACTIVITES", theForm.section5, "5")}
            </TableBody>
          </Table> 
          <Typography className={classes.subHeading} variant="subtitle1" color="textSecondary">Section 6: Comments</Typography>
          <Table className={classes.displayTable} fullWidth>
            <TableBody id="wpf-tbody-6">
              {generate3ColumnTableForm("DATE", "COMMENTER", "COMMENT", theForm.section6, "6")}
            </TableBody>
          </Table> 
        </div>
    );
  }
}

WorkPlanForm.propTypes = {
  classes: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  years: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired,
};

export default withStyles(styles)(WorkPlanForm);
