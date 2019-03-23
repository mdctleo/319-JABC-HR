import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import Table from '@material-ui/core/Table/Table';
import TableBody from '@material-ui/core/TableBody/TableBody';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import Typography from '@material-ui/core/Typography/Typography';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import EmployeeModalContent from '../../../components/EmployeeModalContent';

const styles = theme => ({
  root: {
    width: '95%',
    marginTop: theme.spacing.unit * 3,
    marginLeft: '2.5%',
    paddingBottom: '100px',
  },
  employeeName: {
    display: 'inline',
    marginTop: '30px',
    marginBottom: '30px',
    }, 
  tableWrapper: {
    marginTop: '30px',
    },
  row: {
    width: '60%',
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
    },
    },
  dialog: {
      width: '100%',
      padding: '50px',
    },
  cancelButton: {
    display: 'block',
    marginTop: '20px',
    marginBottom: '20px',
    float: 'right',
    color: 'white',
    width: '100px',
    backgroundColor: '#ff6600',
    borderRadius: '15px',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#ff944d',
    },
    }, 
});

class EmployeeHistory extends React.PureComponent {

state = {
    openDialog: false,
    selectedVersion: 0,
};  

versions = [
    { id: 3,
      date: "January 17, 2019",
      editor: "Delreen",
      changedFields: ["First Name", "Last Name", "SIN"]  
    },
    { id: 2,
        date: "January 10, 2019",
        editor: "Delreen",
        changedFields: ["SIN"]  
      },
    { id: 1,
        date: "January 1, 2019",
        editor: "Delreen",
        changedFields: ["Position"],  
    },
];

handleClickVersion = (event) => {
      this.setState({ openDialog: true});
};

handleCloseDialog = (event) => {
    this.setState({ openDialog: false});
};

generateTableBody = () => {
    return (<TableBody>
            {this.versions.map((version) => {
                return (<TableRow className={this.props.classes.row} hover>
                          <TableCell onClick={this.handleClickVersion}>{version.id}</TableCell>
                          <TableCell onClick={this.handleClickVersion}>{version.date}</TableCell>
                          <TableCell onClick={this.handleClickVersion}>{version.editor}</TableCell>
                          <TableCell onClick={this.handleClickVersion}>{version.changedFields.map((field) => { return version.changedFields.indexOf(field) == version.changedFields.length-1 ? field : field + ", "})}</TableCell>
                        </TableRow>)})}
            </TableBody>);
};

  render() {
    const {
      classes,
      selectedEmployee,
    } = this.props;

    const {
        openDialog,
        selectedVersion,
    } = this.state;

    return (
        <div>
        <Dialog
        open={openDialog}
        className={classes.dialog}
        fullWidth
        maxWidth='md'
        >
        <DialogContent>
          <EmployeeModalContent classes={classes} isAdmin={false} profile={selectedEmployee} roleName="Role Name" /> 
          <Button onClick={this.handleCloseDialog} className={classes.cancelButton}>Cancel</Button>
        </DialogContent>
        </Dialog>
        <div className="profile-card">
        <Typography className={classes.employeeName} variant="h5">
          {selectedEmployee.firstname} {selectedEmployee.lastname}
        </Typography>
          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
            <TableHead>
                <TableCell>Version</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Edited By</TableCell>
                <TableCell>Fields Changed</TableCell>
            </TableHead>
              {this.generateTableBody()}
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

EmployeeHistory.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedEmployee: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmployeeHistory);
