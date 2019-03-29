import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';

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
  addButton: {
    float: 'left',
    display: 'inline',
    color: '#black',
    width: '100px',
    backgroundColor: '#e5e5e5',
    borderRadius: '15px',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#efefef',
    },
  },
  buttonStyle: {
    float: 'right',
    display: 'inline',
    color: 'white',
    backgroundColor: '#ff6600',
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
    marginTop: '20px',
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
  root: {
    marginBottom: '40px',
  },
  bottomRow: {
    height: '60px',
  },
  spacer: {
    flex: '1 1 100%',
  },
  actionButton: {
    float: 'right',
    display: 'inline',
    color: theme.palette.text.secondary,
    // borderRadius: '15px',
    marginLeft: '10px',
  },
  colNameField: {
    flex: '0 0 auto',
  },
});

class EditPerformanceSectionRow extends React.Component {
  render() {
    const {
      openEditRowDialog,
      closeEditRowDialog,
      section,
      indexOfEditRow,
      saveEditedRow
    } = this.props;
    if (indexOfEditRow < 0) return null;

    return (
      <Dialog
        open={openEditRowDialog}
        onClose={closeEditRowDialog}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Edit Row</DialogTitle>
        <DialogContent>
          {section.data.columns.map(column => (
            <TextField
              key={column.concat(section.id)}
              margin="dense"
              defaultValue={section.data.rows[indexOfEditRow][column]}
              id={column.concat(section.id)}
              label={column}
              fullWidth
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditRowDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={saveEditedRow} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

EditPerformanceSectionRow.propTypes = {
  classes: PropTypes.object.isRequired,
  section: PropTypes.object.isRequired,
  indexOfEditRow: PropTypes.number.isRequired,
  closeEditRowDialog: PropTypes.func.isRequired,
  openEditRowDialog: PropTypes.bool.isRequired,
  saveEditedRow: PropTypes.func.isRequired
};

export default withStyles(styles)(EditPerformanceSectionRow);
