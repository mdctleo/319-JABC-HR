import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

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
    width: '120px',
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

class EditPerformanceSection extends React.Component {
  render() {
    const {
      openEditSectionDialog,
      closeEditSectionDialog,
      classes,
      section,
      columnsForEditSection,
      addColumnForEditSection,
      rmColumnForEditSection,
      saveEditedSection,
      editSectionError
    } = this.props;

    return (
      <Dialog
        open={openEditSectionDialog}
        onClose={closeEditSectionDialog}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Edit Section</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="sectionName"
            label="Section Name"
            defaultValue={section.sectionName}
            fullWidth
          />
          <Table className={classes.table}>
            <TableBody>
              {columnsForEditSection.map((colId) => (
                <TableRow
                  key={colId}>
                  <TableCell key={'col-name'.concat(colId)}>
                    <TextField
                      margin="dense"
                      key={'col-name'.concat(colId)}
                      id={'col-name'.concat(colId)}
                      label="Column Name"
                      defaultValue={section.data.columns[colId]}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell key={'delete'.concat(colId)}>
                    <IconButton
                      className={classes.actionButton}
                      key={'delete'.concat(colId)}
                      onClick={() => rmColumnForEditSection(colId)}
                      size="small">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className={classes.bottomRow}>
                <TableCell colSpan={section.data.columns.length + 1}>
                  <Button
                    className={classes.addButton}
                    onClick={addColumnForEditSection}
                    size="small"
                  >
                    ADD COLUMN
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          {editSectionError && (
            <Typography color="error" variant="body2">
              {editSectionError}
            </Typography>
          )}
          <Button onClick={closeEditSectionDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={saveEditedSection}
            color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

EditPerformanceSection.propTypes = {
  classes: PropTypes.object.isRequired,
  section: PropTypes.object.isRequired,
  closeEditSectionDialog: PropTypes.func.isRequired,
  openEditSectionDialog: PropTypes.bool.isRequired,
  addColumnForEditSection: PropTypes.func.isRequired,
  rmColumnForEditSection: PropTypes.func.isRequired,
  saveEditedSection: PropTypes.func.isRequired
};

export default withStyles(styles)(EditPerformanceSection);
