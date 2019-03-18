/**
 *
 * RoleForm
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
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';


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
  },
  fieldContainer: {
    width: '100%',
    marginBottom: '15px',
  },
  textField: {
    width: '100%',
  },
  topFieldContainer: {
    width: '100%',
    marginBottom: '15px',
    marginTop: '50px',
  },
});

class RoleForm extends React.PureComponent  {
  constructor(props) {
    super(props);
  }

  // handleAddButton = (event, numCompetencies) => {
  //     var tbody = document.getElementById("rf-tbody");
  //     var newRow = <TableRow className={classes.row}>
  //                   <TableCell align="left"><TextField id={"rf-col-1-sec-"+numCompetencies} className={"rf-rows"} defaultValue=""/></TableCell>
  //                   <TableCell align="left"><TextField id={"rf-col-2-sec-"+numCompetencies} className={"rf-rows"} defaultValue=""/></TableCell>
  //                   <TableCell align="left"><TextField id={"rf-col-3-sec-"+numCompetencies} className={"rf-rows"} defaultValue=""/></TableCell>
  //                   <TableCell align="left" id={"rf-col-4-sec-"+numCompetencies+"delete"} className={"rf-rows-delete"}><IconButton><DeleteIcon /></IconButton></TableCell>
  //                  </TableRow>;
  //   tbody.appendChild(newRow);
  // }

  render() {
    const { classes, role, add } = this.props;

    function generate3ColumnTableForm(column1, column2, column3, competencies) {
        return (
          <div>
            <TableRow className={classes.tableHead}>
                <TableCell id={"rf-sec-head-1"} align="left"><Typography variant="caption">{column1}</Typography></TableCell>
                <TableCell id={"rf-sec-head-2"} align="left"><Typography variant="caption">{column2}</Typography></TableCell>
                <TableCell id={"rf-sec-head-3"} align="left"><Typography variant="caption">{column3}</Typography></TableCell>
                <TableCell id={"rf-sec-head-4"} align="left"></TableCell>
            </TableRow>
              {competencies.map(function(competency, index){
                  return <TableRow className={classes.row}>
                            <TableCell align="left"><TextField id={"rf-col-1-sec-"+index} className={"rf-rows"} defaultValue={competency.name}/></TableCell>
                            <TableCell align="left"><TextField id={"rf-col-2-sec-"+index} className={"rf-rows"} defaultValue={competency.description}/></TableCell>
                            <TableCell align="left"><TextField id={"rf-col-3-sec-"+index} className={"rf-rows"} defaultValue={competency.rating}/></TableCell>
                            <TableCell align="left" id={"rf-col-4-sec-"+index+"delete"} className={"rf-rows-delete"}><IconButton><DeleteIcon /></IconButton></TableCell>
                         </TableRow>; })}
            <TableRow>
              <TableCell colspan={4}><IconButton className={classes.addButton}><AddIcon /></IconButton></TableCell>
            </TableRow>
          </div>
        )};

    return (
        <div className="profile-card">
          <Typography variant="h5">{add ? "Add Role" : "Edit Role"}</Typography>
          <div className={classes.topFieldContainer}>
            <TextField
              id="rf-name"
              defaultValue={role.name}
              label="Name"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              fullWidth>
            </TextField>
         </div>
          <div className={classes.fieldContainer}>
            <TextField
              id="rf-description"
              defaultValue={role.description}
              multiline 
              rows={4} 
              label="Description"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              fullWidth>
            </TextField>
         </div>
          <Typography className={classes.subHeading} variant="subtitle1" color="textSecondary">Competencies</Typography>
          <Table className={classes.displayTable}>
            <TableBody id="rf-tbody">
              {generate3ColumnTableForm("COMPETENCY", "DESCRIPTION", "RATING", role.competencies)}
            </TableBody>
          </Table> 
        </div>
    );
  }
}

RoleForm.propTypes = {
  classes: PropTypes.object.isRequired,
  role: PropTypes.object.isRequired,
  add: PropTypes.bool.isRequired,
};

export default withStyles(styles)(RoleForm);
