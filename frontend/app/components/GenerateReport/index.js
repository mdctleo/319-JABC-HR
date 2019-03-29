/**
 *
 * GenerateReport
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Tooltip from '@material-ui/core/Tooltip';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import orange from '@material-ui/core/colors/orange';
import Typography from '@material-ui/core/Typography';

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
  generateButton: {
    display: 'inline',
    float: 'right',
    margin: 'auto',
    color: 'white',
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
    marginTop: '30px',
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
    width: '100%',
    display: 'block',
    marginBottom: '20px',
    backgroundColor: 'white',
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
  section1: {
    paddingLeft: '30px',
  },
  section2: {
    paddingRight: '40px',
  },
  card: {
    padding: '20px',
    backgroundColor: '#fafafa',
  },
  subTitle: {
    marginTop: '30px',
    marginBottom: '40px',
    paddingLeft: '20px',
    width: '100%',
    display: 'block',
  },
  reportName: {
    display: 'inline',
  },
  reportNameDiv: {
    marginBottom: '20x',
  },
});

const COLUMNS = {
  sin: { id: 'sin', numeric: 'false', disablePadding: false, label: 'SIN' },
  email: {
    id: 'email',
    numeric: 'false',
    disablePadding: false,
    label: 'Email',
  },
  firstname: {
    id: 'firstname',
    numeric: 'false',
    disablePadding: false,
    label: 'Firstname',
  },
  lastname: {
    id: 'lastname',
    numeric: 'false',
    disablePadding: false,
    label: 'Lastname',
  },
  fte: { id: 'fte', numeric: 'false', disablePadding: false, label: 'FTE' },
  status: {
    id: 'status',
    numeric: 'false',
    disablePadding: false,
    label: 'Status',
  },
  adminLevel: {
    id: 'adminLevel',
    numeric: 'false',
    disablePadding: false,
    label: 'Admin Level',
  },
  salary: {
    id: 'salary',
    numeric: 'true',
    disablePadding: false,
    label: 'Salary',
  },
  address: {
    id: 'address',
    numeric: 'false',
    disablePadding: false,
    label: 'Address',
  },
  birthdate: {
    id: 'birthdate',
    numeric: 'false',
    disablePadding: false,
    label: 'Birthdate',
  },
  dateJoined: {
    id: 'dateJoined',
    numeric: 'false',
    disablePadding: false,
    label: 'Date Joined',
  },
  vacationDays: {
    id: 'vacationDays',
    numeric: 'true',
    disablePadding: false,
    label: 'Total Vacation Days',
  },
  remainingVacationDays: {
    id: 'remainingVacationDays',
    numeric: 'true',
    disablePadding: false,
    label: 'Remaining Vacation Days',
  },
  role: {
    id: 'role',
    numeric: 'false',
    disablePadding: false,
    label: 'Position',
  },
  phoneNumber: {
    id: 'phoneNumber',
    numeric: 'false',
    disablePadding: false,
    label: 'Phone Number',
  },
};

class GenerateReport extends React.PureComponent {
  state = {
    order: 'asc',
    orderBy: 'lastName',
    page: 0,
    rowsPerPage: 25,
    columns: [COLUMNS.firstname, COLUMNS.lastname, COLUMNS.role],
    columnsSelection: {
      firstname: true,
      lastname: true,
      sin: false,
      email: false,
      fte: false,
      status: false,
      adminLevel: false,
      salary: false,
      address: false,
      birthdate: false,
      dateJoined: false,
      vacationDays: false,
      remainingVacationDays: false,
      role: true,
      phoneNumber: false,
    },
    reportName: 'Report',
  };

  static desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  getStatus(status) {
    switch (status) {
      case 0:
        return 'Inactive';
      case 1:
        return 'Active';
      case 2:
        return 'Onboarding';
      case 3:
        return 'Probation';
      default:
        return '';
    }
  }

  getAdminLevel(adminLevel) {
    switch (adminLevel) {
      case 0:
        return 'Employee';
      case 1:
        return 'Manager';
      case 2:
        return 'Admin';
      default:
        return '';
    }
  }

  stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }

  getSorting(order, orderBy) {
    return order === 'desc'
      ? (a, b) => GenerateReport.desc(a, b, orderBy)
      : (a, b) => -GenerateReport.desc(a, b, orderBy);
  }

  handleRequestSort = property => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleColumnChange = id => event => {
    const selectedCols = this.state.columnsSelection;
    const columns = this.state.columns;
    if (!event.target.checked) {
      for (const i in columns) {
        if (columns[i].id === id) {
          columns.splice(i, 1);
          break;
        }
      }
    } else {
      columns.push(COLUMNS[id]);
    }
    selectedCols[id] = event.target.checked;
    this.setState(selectedCols);
    this.setState(columns);
  };

  handleGenerate = () => {
    const element = document.createElement('a');
    const rows = [];
    const header = [];
    for (const col of this.state.columns) {
      header.push(col.label);
    }
    rows.push(header.join());
    for (const employee of this.props.employees) {
      const data = [];
      for (const col of this.state.columns) {
        data.push(col.id === 'role' ? (employee.role && employee.role.name) : 
                                      col.id === 'adminLevel' ? getAdminLevel(employee[col.id]) : 
                                                                col.id === 'status' ? getStatus(employee[col.id]) : 
                                                                                      employee[col.id]);
      }
      rows.push(data.join());
    }
    const file = new Blob([rows.join('\n')], { type: 'text/csv' });
    element.style.display = 'none';
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(rows.join('\n')));
    // element.href = URL.createObjectURL(file);
    element.download = `${this.state.reportName}.csv`;
    document.body.appendChild(element);
    element.click();
    document.removeChild(element);
  };

  handleNameChange = event => {
    this.setState({ reportName: event.target.value });
  };

  render() {
    return (
      <Grid container>
        <Typography variant="h5" className={this.props.classes.subTitle}>Generate Report</Typography>
        <Grid item md={4} className={this.props.classes.section1}>
          <Card className={this.props.classes.card}>
          <FormControl>
          <FormLabel component="legend">Report Title</FormLabel>
            <TextField
              value={this.state.reportName}
              className={this.props.classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.handleNameChange}
              fullWidth
            />
            </FormControl>
            <FormControl component="fieldset">
              <FormLabel component="legend">Columns</FormLabel>
              <FormGroup>
                {Object.keys(COLUMNS).map(colId => (
                  <FormControlLabel
                    key={colId}
                    control={
                      <Checkbox
                        key={colId}
                        className={this.props.classes.checkbox}
                        checked={this.state.columnsSelection[colId]}
                        value={colId}
                        onChange={this.handleColumnChange(colId)}
                      />
                    }
                    label={COLUMNS[colId].label}
                  />
                ))}
              </FormGroup>
            </FormControl>
            </Card>
        </Grid>
        <Grid item xs={12} md={8} className={this.props.classes.section2}>
        <div className={this.props.classes.reportNameDiv}>
        <Typography variant="h6" color="textSecondary" className={this.props.classes.reportName}> {this.state.reportName} </Typography>
        <Button
              className={this.props.classes.generateButton}
              onClick={this.handleGenerate}
            >
              Export Report
            </Button>
        </div>
        <div className={this.props.classes.tableWrapper}>
            <Table
              className={this.props.classes.table}
              aria-labelledby="tableTitle"
            >
              <TableHead>
                <TableRow>
                  {this.state.columns.map(
                    column => (
                      <TableCell
                        key={column.id}
                        align="left"
                        padding={column.disablePadding ? 'none' : 'default'}
                        sortDirection={
                          this.state.orderBy === column.id
                            ? this.state.order
                            : false
                        }
                      >
                        <Tooltip
                          title="Sort"
                          placement={
                            column.numeric ? 'bottom-end' : 'bottom-start'
                          }
                          enterDelay={300}
                        >
                          <TableSortLabel
                            active={this.state.orderBy === column.id}
                            direction={this.state.order}
                            onClick={() => {
                              this.handleRequestSort(column.id);
                            }}
                          >
                            {column.label}
                          </TableSortLabel>
                        </Tooltip>
                      </TableCell>
                    ),
                    this,
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.stableSort(
                  this.props.employees,
                  this.getSorting(this.state.order, this.state.orderBy),
                )
                  .slice(
                    this.state.page * this.state.rowsPerPage,
                    this.state.page * this.state.rowsPerPage +
                      this.state.rowsPerPage,
                  )
                  .map(n => (
                    <TableRow key={n.id} hover tabIndex={-1} selected={false}>
                      {this.state.columns.map(column => {
                        const value = column.id === 'adminLevel' ? this.getAdminLevel(n[column.id]) : 
                                                  column.id === 'status' ? this.getStatus(n[column.id]) : 
                                                                          n[column.id];
                        return (
                        <TableCell key={column.id} align="left">{value}</TableCell>
                      )})}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={this.props.employees.length}
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.page}
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
        </Grid>
      </Grid>
    );
  }
}

GenerateReport.propTypes = {
  employees: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GenerateReport);
