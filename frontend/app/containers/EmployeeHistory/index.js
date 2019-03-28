/**
 *
 * EmployeeHistory
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import { selectHistory } from './selectors';
import saga from './saga';
import actions from './actions';
import TableBody from '@material-ui/core/TableBody/TableBody';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import EmployeeModalContent from '../../components/EmployeeModalContent';
import Button from '@material-ui/core/Button/Button';
import Typography from '@material-ui/core/Typography/Typography';
import Table from '@material-ui/core/Table/Table';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TablePagination from '@material-ui/core/TablePagination/TablePagination';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  employeeName: {
    display: 'inline',
    marginTop: '30px',
    marginBottom: '30px',
  },
  tableWrapper: {
    marginTop: '40px',
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
  leftCell: {
    width: '15px',
  },
});

/* eslint-disable react/prefer-stateless-function */
export class EmployeeHistory extends React.PureComponent {
  componentDidMount() {
    this.props.getHistory(this.props.selectedEmployee);
  }

  state = {
    rowsPerPage: 25,
    page: 0,
  };

  handleClickVersion = version => {
    this.setState({ selectedVersion: version });
  };

  handleCloseDialog = () => {
    this.setState({ selectedVersion: null });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  formatDate = date => {
    const d = new Date(date);
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = d.getFullYear();
    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;
    return [year, month, day].join('-');
  };

  generateTableBody = () => {
    const { history } = this.props;
    return (
      <TableBody>
        {history.map(version => (
          <TableRow
            key={version.version}
            className={this.props.classes.row}
            hover
          >
            <TableCell
              className={this.props.classes.leftCell}
              onClick={() => this.handleClickVersion(version)}
            >
              {version.version}
            </TableCell>
            <TableCell onClick={() => this.handleClickVersion(version)}>
              {version.createdDate && this.formatDate(version.createdDate)}
            </TableCell>
            <TableCell onClick={() => this.handleClickVersion(version)}>
              {version.fkCreator}
            </TableCell>
            <TableCell onClick={() => this.handleClickVersion(version)}>
              {version.changedFields && version.changedFields.join(', ')}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  };

  render() {
    const { classes, selectedEmployee, history } = this.props;
    const { selectedVersion, rowsPerPage, page } = this.state;

    return (
      <div>
        <Dialog
          open={!!selectedVersion}
          className={classes.dialog}
          fullWidth
          maxWidth="md"
          onClose={this.handleCloseDialog}
        >
          <DialogContent>
            <EmployeeModalContent
              classes={classes}
              isAdmin={false}
              profile={selectedVersion}
            />
            <Button
              onClick={this.handleCloseDialog}
              className={classes.cancelButton}
            >
              Cancel
            </Button>
          </DialogContent>
        </Dialog>
        <div className="profile-card">
          <Typography className={classes.employeeName} variant="h5">
            {selectedEmployee.firstname} {selectedEmployee.lastname}
          </Typography>
          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Version</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Edited By</TableCell>
                  <TableCell>Fields Changed</TableCell>
                </TableRow>
              </TableHead>
              {this.generateTableBody()}
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={history.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </div>
        </div>
      </div>
    );
  }
}

EmployeeHistory.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedEmployee: PropTypes.object.isRequired,
  getHistory: PropTypes.func.isRequired,
  history: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  history: selectHistory,
});

const mapDispatchToProps = {
  ...actions,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'employeeHistory', saga });

export default compose(
  withSaga,
  withConnect,
  withStyles(styles),
)(EmployeeHistory);
