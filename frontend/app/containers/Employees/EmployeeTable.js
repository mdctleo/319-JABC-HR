import Paper from '@material-ui/core/Paper/Paper';
import Table from '@material-ui/core/Table/Table';
import TableBody from '@material-ui/core/TableBody/TableBody';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import TablePagination from '@material-ui/core/TablePagination/TablePagination';
import React from 'react';
import { EnhancedTableHead } from 'components/RolePageComponents';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import { withStyles } from '@material-ui/core';
import orange from '@material-ui/core/colors/orange';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    width: '95%',
    marginTop: theme.spacing.unit * 3,
    marginLeft: '2.5%',
    paddingBottom: '100px',
  },
  addButton: {
    display: 'inline',
    float: 'right',
    marginTop: '50px',
    marginRight: '2.5%',
    color: 'white',
    width: '150px',
    backgroundColor: '#ff6600',
    borderRadius: '15px',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#ff944d',
    },
  },
  formButtons: {
    float: 'right',
    display: 'inline',
    color: 'white',
    width: '100px',
    marginRight: '2.5%',
    backgroundColor: '#ff6600',
    borderRadius: '15px',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#ff944d',
    },
  },
  table: {
    minWidth: 800,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  tabsIndicator: {
    backgroundColor: '#ff5000',
  },
  miniTabs: {
    backgroundColor: 'white',
  },
  typography: {
    padding: theme.spacing.unit * 3,
  },
  container: {
    width: '75%',
    marginTop: '50px',
    marginLeft: '5%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  employeeName: {
    display: 'inline',
    marginTop: '30px',
    marginBottom: '30px',
  },
  topFieldContainer: {
    marginTop: '30px',
  },
  textField: {
    width: '90%',
  },
  fieldContainer: {
    width: '100%',
    marginBottom: '15px',
  },
  positionName: {
    marginTop: '30px',
  },
  formSubheading: {
    marginTop: '30px',
  },
  card: {
    width: '75%',
  },
  fab: {
    marginTop: '30px',
    marginBottom: '30px',
    marginLeft: '37.5%',
    display: 'inline',
    backgroundColor: ' #00954D',
    color: 'white',
  },
  formControl: {
    float: 'right',
    marginRight: '2.5%',
    marginBottom: '30px',
    width: '200px',
  },
  editButton: {
    marginRight: '25%',
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
  editWPButton: {
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
  docDisplay: {
    marginTop: '30px',
    marginLeft: '30px',
  },
  saveButton: {
    float: 'right',
    display: 'inline',
    color: 'white',
    height: '40px',
    width: '100px',
    marginTop: '30px',
    marginRight: '20px',
    backgroundColor: '#ff6600',
    borderRadius: '15px',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#ff944d',
    },
  },
  cancelButton: {
    float: 'right',
    display: 'inline',
    height: '40px',
    width: '100px',
    marginTop: '30px',
    marginLeft: '20px',
    borderRadius: '15px',
  },
  colorSwitchBase: {
    color: orange[300],
    '&$colorChecked': {
      color: orange[500],
      '& + $colorBar': {
        backgroundColor: orange[500],
      },
    },
  },
  colorBar: {},
  colorChecked: {},
  switch: {
    float: 'right',
    display: 'inline',
  },
  addOIButton: {
    float: 'right',
    color: 'white',
    width: '250px',
    padding: '0',
    height: '40px',
    backgroundColor: '#ff6600',
    borderRadius: '15px',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#ff944d',
    },
  },
  onBoardingHeader: {
    height: '50px',
    width: '100%',
  },
  addOIDialogField: {
    marginBottom: '30px',
  },
});

const columns = [
  {
    id: 'firstname',
    numeric: false,
    disablePadding: true,
    label: 'First Name',
  },
  { id: 'lastname', numeric: false, disablePadding: false, label: 'Last Name' },
  { id: 'position', numeric: false, disablePadding: false, label: 'Position' },
];

class EmployeeTable extends React.PureComponent {
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';
    const { tableSettings } = this.props;

    if (tableSettings.orderBy === property && tableSettings.order === 'desc') {
      order = 'asc';
    }

    this.props.updateTableSettings({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.props.updateTableSettings({
        selected: this.props.allEmployees.map(n => n.id),
      });
      return;
    }
    this.props.updateTableSettings({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.props.tableSettings;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    this.props.updateTableSettings({ selected: newSelected });
  };

  handleClickProfile = (event, profile) => {
    this.props.selectProfile(profile);
  };

  handleChangePage = (event, page) => {
    this.props.updateTableSettings({ page });
  };

  handleChangeRowsPerPage = event => {
    this.props.updateTableSettings({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.props.tableSettings.selected.indexOf(id) !== -1;

  render() {
    const { classes, allEmployees, tableSettings, allRoles } = this.props;

    const { order, orderBy, selected, rowsPerPage, page } = tableSettings;
    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, allEmployees.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          showReportButton
          tableSettings={tableSettings}
          updateTableSettings={this.props.updateTableSettings}
          generateReport={this.props.generateReport}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              columns={columns}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={allEmployees.length}
            />
            <TableBody>
              {allEmployees
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  const roleName =
                    allRoles && allRoles[n.fkRole] && allRoles[n.fkRole].name;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={event => this.handleClick(event, n.id)}
                          checked={isSelected}
                          style={{ color: 'grey' }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        onClick={event => this.handleClickProfile(event, n)}
                      >
                        {n.firstname}
                      </TableCell>
                      <TableCell
                        align="left"
                        onClick={event => this.handleClickProfile(event, n)}
                      >
                        {n.lastname}
                      </TableCell>
                      <TableCell
                        align="left"
                        onClick={event => this.handleClickProfile(event, n)}
                      >
                        {roleName}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={allEmployees.length}
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
      </Paper>
    );
  }
}

EmployeeTable.propTypes = {
  classes: PropTypes.object.isRequired,
  allEmployees: PropTypes.array,
  allRoles: PropTypes.object,
  selectProfile: PropTypes.func.isRequired,
  tableSettings: PropTypes.object.isRequired,
  updateTableSettings: PropTypes.func.isRequired,
  generateReport: PropTypes.func.isRequired,
};

export default withStyles(styles)(EmployeeTable);
