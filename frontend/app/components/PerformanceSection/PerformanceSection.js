import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
  buttonStyle: {
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
  }
});

class PerformanceSection extends React.Component {
  state = {
    openAddRowDialog: 0
  };

  // Build data from the fields filled out in the Dialog Box
  // Then, add it to this Section
  saveRowToSection = () => {
    let section = this.props.section;
    let newRow = {};

    for (let column of section.columns) {
      newRow[column] = document.getElementById(column.concat(section.sectionId)).value;
    }

    this.props.handleAddRow(this.props.section.sectionId, newRow);
    this.closeNewRowDialog();
  };

  openNewRowDialog = () => {
    this.setState({openAddRowDialog: 1});
  };

  closeNewRowDialog = () => {
    this.setState({openAddRowDialog: 0});
  };

  render() {
    const { classes, handleAddRow, section } = this.props;

    return(
      <div>
        <h4>{section.sectionName}</h4>

        <Dialog
          open={this.state.openAddRowDialog}
          onClose={this.closeNewRowDialog}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add new row</DialogTitle>
          <DialogContent>
            {section.columns.map(function(column) {
              return <TextField
                autoFocus
                margin="dense"
                id={column.concat(section.sectionId)}
                label={column}
                fullWidth/>
            })}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeNewRowDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this.saveRowToSection} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>

        <Button className={classes.buttonStyle} onClick={this.openNewRowDialog}>Add Row</Button>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {section.columns.map(function(column) {
                  return <TableCell>{column}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {section.data.map(function(item) {
                return (
                  <TableRow>
                    {section.columns.map(function(column) {
                      return <TableCell>{item[column]}</TableCell>
                    })
                    }
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

PerformanceSection.propTypes = {
  classes: PropTypes.object.isRequired,
  section: PropTypes.object.isRequired,
};

export default withStyles(styles)(PerformanceSection);
