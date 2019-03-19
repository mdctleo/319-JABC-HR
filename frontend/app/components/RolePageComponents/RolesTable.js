import Paper from '@material-ui/core/Paper/Paper';
import Table from '@material-ui/core/Table/Table';
import TableBody from '@material-ui/core/TableBody/TableBody';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import IconButton from '@material-ui/core/IconButton/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TablePagination from '@material-ui/core/TablePagination/TablePagination';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';

const styles = theme => ({
  root: {
    width: '95%',
    marginTop: theme.spacing.unit * 3,
    marginLeft: '2.5%',
    paddingBottom: '100px',
  },
  addButton: {
    float: 'right',
    display: 'inline',
    marginTop: '50px',
    marginRight: '2.5%',
    color: 'white',
    width: '125px',
    backgroundColor: '#ff6600',
    borderRadius: '15px',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#ff944d',
    },
  },
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
  formButtons: {
    float: 'right',
    display: 'inline',
    color: 'white',
    width: '100px',
    marginRight: '2.5%',
    marginTop: '50px',
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
  tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 3,
  },
  container: {
    width: '95%',
    marginLeft: '2.5%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: '75%',
  },
  fieldContainer: {
    width: '100%',
    marginBottom: '15px',
  },
  positionName: {
    display: 'inline',
    marginTop: '30px',
  },
  formSubheading: {
    display: 'inline',
  },
  topFieldContainer: {
    width: '100%',
    marginBottom: '15px',
    marginTop: '50px',
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
  deleteIcon: {
    color: grey[300],
  },
});

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

class RolesTable extends React.PureComponent {
  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.props.updateTableSettings({ selected: this.props.allRoles.map(n => n.id) });
      return;
    }
    this.props.updateTableSettings({ selected: [] });
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (
      this.props.tableSettings.orderBy === property &&
      this.props.tableSettings.order === 'desc'
    ) {
      order = 'asc';
    }

    this.props.updateTableSettings({ order, orderBy });
  };

  isSelected = id => this.props.tableSettings.selected.indexOf(id) !== -1;

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
    console.log(selected);
    this.props.updateTableSettings({ selected: newSelected });
  };

  handleClickProfile = (event, profile) => {
    const { selected } = this.props.tableSettings;
    const selectedIndex = selected.indexOf(profile.id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, profile.id);
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
    this.props.selectProfile(profile);
  };

  handleChangePage = (event, page) => {
    this.props.updateTableSettings({ page });
  };

  handleChangeRowsPerPage = event => {
    this.props.updateTableSettings({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes, allRoles, tableSettings } = this.props;

    const { order, orderBy, selected, rowsPerPage, page } = tableSettings;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, allRoles.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          selected={selected}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={allRoles.length}
            />
            <TableBody>
              {stableSort(allRoles, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
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
                        align="left"
                        component="th"
                        scope="row"
                        padding="none"
                        onClick={event => this.handleClickProfile(event, n)}
                      >
                        {n.name}
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Delete">
                          <IconButton
                            aria-label="Delete"
                            onClick={event =>
                              this.handleDeleteSingleButton(event, n)
                            }
                          >
                            <DeleteIcon className={classes.deleteIcon} />
                          </IconButton>
                        </Tooltip>
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
          count={allRoles.length}
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

RolesTable.propTypes = {
  classes: PropTypes.object.isRequired,
  allRoles: PropTypes.array,
  selectProfile: PropTypes.func.isRequired,
  tableSettings: PropTypes.object.isRequired,
  updateTableSettings: PropTypes.func.isRequired,
};

export default withStyles(styles)(RolesTable);
