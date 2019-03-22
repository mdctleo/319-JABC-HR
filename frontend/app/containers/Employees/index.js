/**
 *
 * Employees
 *
 */

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import AppBar from '@material-ui/core/AppBar';
import EmployeeEditForm from '../../components/EmployeeEditForm';
import EmployeeDisplay from '../../components/EmployeeDisplay';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import WorkPlanDisplay from '../../components/WorkPlanDisplay';
import WorkPlanForm from '../../components/WorkPlanForm';
import PerformanceReviewDisplay from '../../components/PerformanceReviewDisplay';
import PerformanceReviewForm from '../../components/PerformanceReviewForm';
import orange from '@material-ui/core/colors/orange';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import AddEmployeeForm from '../../components/AddEmployeeForm';
import GenerateReport from '../../components/GenerateReport';

let counter = 0;
function createData(firstname, lastname, status, sin, role, salary, manager, fte, remainingVacationDays, adminLevel, address, phoneNumber ) {
  counter += 1;
  return { id: counter, firstname, lastname, status, sin, role, salary, manager, fte, remainingVacationDays, adminLevel, address, phoneNumber };
}

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
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'firstname', numeric: false, disablePadding: true, label: 'First Name' },
  { id: 'lastname', numeric: false, disablePadding: false, label: 'Last Name' },
  { id: 'position', numeric: false, disablePadding: false, label: 'Position' },
];

const DocumentsContainer = (props => {
  const docs = props.documents.map((document, index) => (
    <Grid key={document.id} item xs={12} sm={6}>
      <Card className="document-card">
        <CardContent>
          <Typography className="title" color="textSecondary" gutterBottom>
            {document.name}
          </Typography>
          <Typography component="p">{document.description}</Typography>
          <Typography component="p"><b>Due: </b> {document.dueDate}</Typography>
          <Typography component="p">
            {!document.done && (
              <Chip label="Pending" color="secondary" style={{marginTop:10}}/>
            )}
            {document.done && (
              <Chip label="Done" color="primary" style={{marginTop:10}}/>
            )}
          </Typography>
        </CardContent>
        <CardActions>
          {document.done && (
            <Button size="small" color="primary">Download</Button>
          )}
          {!document.done && (
            <Button size="small" color="primary" disabled>Download</Button>
          )}
          <Button size="small" color="secondary" >Edit</Button>
        </CardActions>
      </Card>
    </Grid>
  ));

  return (
    <Grid container spacing={16} style={{ paddingTop: 25 }}>
      {docs}
    </Grid>
  );
});

DocumentsContainer.propTypes = {
  documents: PropTypes.array.isRequired,
};

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
              labelStyle={{ color: 'grey' }}
              iconStyle={{ fill: 'grey' }}
              inputStyle={{ color: 'grey' }}
              style={{ color: 'grey' }}
            />
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: 'white',
          backgroundColor: ' #00954D',
        }
      : {
          color: 'white',
          backgroundColor: ' #00954D',
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, generateReport, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, classes.highlight)}
    >
    <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography></Typography>)}
      </div>
     <div>
        {numSelected > 0 ? (
          <button className="primary-button" id="generate-report-button" onClick={generateReport}>
            Generate Report
          </button>
        ) : (
          <div></div>)}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  generateReport: PropTypes.func.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

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
    display: 'inline',
    marginTop: '50px',
    marginRight: '2.5%',
    color: 'white',
    width: '150px',
    backgroundColor: '#ff6600',
    borderRadius: '15px',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#ff944d',
    }
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
    }
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
    width: "75%",
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
    }
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
    }
  },
  onBoardingHeader: {
    height: '50px',
    width: '100%',
  },
  addOIDialogField: {
    marginBottom: '30px',
  }
});

class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'lastName',
    selected: [],
    displayedPage: "table",
    currProfile: {},
    value: 1,
    miniTabValue: 0,
    data: [
      createData('Mikayla', 'Preete', 'Active', '123 543 123', 'Developer', 60000, 'James Yoo', 'Full Time', 12, "Employee", '123 ABC Street', '123 4556'),
      createData('Sara', 'Hill', 'Active', '123 543 123', 'Developer', 60000, 'James Yoo', 'Full Time', 12, "Manager", '123 ABC Street', '123 4556'),
      createData('James', 'Yoo', 'Active', '123 543 123', 'Developer', 60000, 'James Yoo', 'Full Time', 12, "Admin", '123 ABC Street', '123 4556'),
      createData('Mark', 'Green', 'Active', '123 543 123', 'Developer', 60000, 'James Yoo', 'Full Time', 12, "Employee", '123 ABC Street', '123 4556'),
      createData('Jesse', 'Isaac', 'Active', '123 543 123', 'Developer', 60000, 'James Yoo', 'Full Time', 12, "Manager", '123 ABC Street', '123 4556'),
      createData('Kim', 'Lee', 'Active', '123 543 123', 'Developer', 60000, 'James Yoo', 'Full Time', 12, "Manager", '123 ABC Street', '123 4556'),
      createData('Lola', 'Ray', 'Active', '123 543 123', 'Developer', 60000, 'James Yoo', 'Full Time', 12, "Admin", '123 ABC Street', '123 4556'),
      createData('Jerry', 'Jim', 'Active', '123 543 123', 'Developer', 60000, 'James Yoo', 'Full Time', 12, "Employee", '123 ABC Street', '123 4556'),
      createData('Arthur', 'Marques', 'Active', '123 543 123', 'Developer', 60000, 'James Yoo', 'Full Time', 12, "Employee", '123 ABC Street', '123 4556'),
      createData('Abraham', 'Torres', 'Active', '123 543 123', 'Developer', 60000, 'James Yoo', 'Full Time', 12, "Employee", '123 ABC Street', '123 4556'),
      createData('Anita', 'Tse', 'Active', '123 543 123', 'Developer', 60000, 'James Yoo', 'Full Time', 12, "Manager", '123 ABC Street', '123 4556'),
      createData('Farah', 'Fawcett', 'Active', '123 543 123', 'Developer', 60000, 'James Yoo', 'Full Time', 12, "Employee", '123 ABC Street', '123 4556'),
      createData('True', 'Thompson', 'Active', '123 543 123', 'Developer', 60000, 'James Yoo', 'Full Time', 12, "Employee", '123 ABC Street', '123 4556'),
      createData('Saint', 'West', 'Active', '123 543 123', 'Developer', 60000, 'James Yoo', 'Full Time', 12, "Manager", '123 ABC Street', '123 4556'),
      createData('Taneisha', 'Dumas', 'Active', '123 543 123', 'Developer', 60000, 'James Yoo', 'Full Time', 12, "Manager", '123 ABC Street', '123 4556'),
    ],
    sampleWorkPlan: { date: "September 16, 2019", section1: { rows: [{ column1: "Department X", column2: "Goal X"}, {column1: "Department Y", column2: "Goal Y"}]}, 
                                                  section2: { rows: [{ column1: "Program X", column2: "Goal X"}, {column1: "Program Y", column2: "Goal Y"}]},
                                                  section3: { rows: [{ column1: "Competency X", column2: "Explanation X"}, {column1: "Competency Y", column2: "Explanation Y"}]},
                                                  section4: { rows: [{ column1: "Objective X", column2: "Support X"}, {column1: "Objective Y", column2: "Support Y"}]},
                                                  section5: { rows: [{ column1: "Goal X", column2: "Activity X"}, {column1: "Goal Y", column2: "Activity Y"}]},
                                                  section6: { rows: [{ column1: "Goal X", column2: "Activity X", column3: "Comment X"}, {column1: "Goal Y", column2: "Activity Y", column3: "Comment Y"}]}},
    samplePR:       { date: "September 16, 2019", section1: { rows: [{ column1: "Goal X", column2: "Activity X", column3: "Comment X"}, {column1: "Goal Y", column2: "Activity Y", column3: "Comment Y"}]}, 
                                                  section2: { rows: [{ column1: "Goal X", column2: "Activity X", column3: "Comment X"}, {column1: "Goal Y", column2: "Activity Y", column3: "Comment Y"}]},
                                                  section3: { rows: [{ column1: "Goal X", column2: "Activity X", column3: "Comment X"}, {column1: "Goal Y", column2: "Activity Y", column3: "Comment Y"}]},
                                                  section4: { rows: [{ column1: "Goal X", column2: "Activity X", column3: "Comment X"}, {column1: "Goal Y", column2: "Activity Y", column3: "Comment Y"}]},
                                                  section5: { rows: [{ column1: "Goal X", column2: "Activity X", column3: "Comment X"}, {column1: "Goal Y", column2: "Activity Y", column3: "Comment Y"}]},
                                                  section6: { rows: [{ column1: "Goal X", column2: "Activity X", column3: "Comment X"}, {column1: "Goal Y", column2: "Activity Y", column3: "Comment Y"}]}},
    page: 0,
    rowsPerPage: 25,
    edit: false,
    active: true,
    addOIDialog: false,
    editOIDialog: false,
    selectedEmployees: []
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  saveProfile = (profile) => {
    var newData = this.state.data.concat(profile);
    this.setState({ data: newData });
    this.setState({ displayedPage: "table" });
    this.setState({ value: 1 });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
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

    this.setState({ selected: newSelected });
  };

  handleClickProfile = (event, profile) => {
    const { selected } = this.state;
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
    this.setState({ currProfile: profile });
    this.setState({ selected: newSelected });
    this.setState({ displayedPage: "profile" });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleChange = (event, value) => {
    this.setState({ value });
    this.setState({ edit: false });
  };

  handleMiniTabChange = (event, value) => {
    this.setState({ miniTabValue: value });
    this.setState({ edit: false });
  };

  handleBackButton = (event, value) => {
    this.setState({ value: 1 });
    this.setState({ displayedPage: "table" });
  };

  handleAddButton = (event, value) => {
    this.setState({ displayedPage: "add" });
    this.setState({ edit: true });
  };

  handleClickEdit = (event, value) => {
    this.setState({ edit: true });
  };

  handleSwitch = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleAddOI = event => {
    this.setState({ addOIDialog: true });
  };

  handleCloseAddOIDialog = event => {
    this.setState({ addOIDialog: false });
  };

  addProfile = (profile) => {
    // this.props.saveProfile(profile);
    var newProfile = createData(profile.firstname, profile.lastname, profile.status, profile.sin, profile.role, profile.salary, profile.manager, profile.fte, profile.remainingVacationDays, profile.adminLevel, profile.address, profile.phoneNumber);
    var newData = this.state.data.concat(newProfile);
    this.setState({ data: newData });
    this.setState({ edit: false });
    console.log("changing view to table");
    this.setState({ displayedPage: "table" });
    this.setState({ value: 1 });
  };

  cancelEdit = () => {
    this.setState({
      edit: false,
    });
  };

  handleAddOIDialog = event => {
    var id = this.documents.length;
    var name = document.getElementById("addOI-dialog-name").value;
    var description = document.getElementById("addOI-dialog-description").value;
    var date = document.getElementById("addOI-dialog-date").value;
    var newDoc = {
      id: id,
      name: name,
      description: description,
      dueDate: date,
      done: false,
      fileName: 'None',
    }
    this.documents.push(newDoc);
    this.setState({ addOIDialog: false});
  };

  generateReport = event => {
    this.setState({
      selectedEmployees: this.state.data.filter((val, index)=>{
        return this.state.selected.includes(val.id)
      })
    }) 
    this.setState({ displayedPage: "report" });
  }

//   generateDropdown() {
//     var years = Object.keys(this.state.workPlans);
//     return (<Select
//               onChange={this.handleSelect}>
//               {years.map(function(yearSpan, index){
//                 return <MenuItem value={yearSpan}>{yearSpan}</MenuItem>})}
//               <MenuItem value={0}>Add Year</MenuItem>
//           </Select>)
// }

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  documents = [
    {
      id: 1,
      name: 'Criminal record',
      description: 'Please upload your criminal record.',
      dueDate: '20/02/2019',
      done: false,
      fileName: 'None',
    },
    {
      id: 2,
      name: 'Visa',
      description: 'Please upload your visa.',
      dueDate: '20/02/2019',
      done: false,
      fileName: 'None',
    },
    {
      id: 3,
      name: 'Insurance form',
      description: 'Please upload your insurance form.',
      dueDate: '20/02/2019',
      done: true,
      fileName: 'None',
    },
  ];

  render() {
    const { classes } = this.props;
    const { order, orderBy, selected, displayedPage, currProfile, value, miniTabValue, data, sampleWorkPlan, samplePR, page, rowsPerPage, edit, active, addOIDialog, editOIDialog, selectedEmployees} = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    const  blankProfile = { firstname: "", lastname: "", status: "", sin: "", salary: 0, fte: 0, remainingVacationDays: 0, adminLevel: 0, address: "", phoneNumber: ""};

    return (
      <div>
      <h1>Manage Employees</h1>
        { displayedPage == "table" &&
          <Button className={classes.addButton} onClick={this.handleAddButton}>Add Employee</Button>}
        { displayedPage == "report" ?
          (<Paper className={classes.root}>
            <AppBar position="static" width="100%">
              <Tabs value={0} classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }} 
                    onChange={this.handleChange}>
                <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                    onClick={this.handleBackButton} label="<  Back" />
              </Tabs>
            </AppBar>
            <GenerateReport employees={selectedEmployees} classes={classes} />
          </Paper>) :
          (displayedPage == "add" ?
         (<Paper className={classes.root}>
          <div> 
          <AppBar position="static" width="100%">
          <Tabs value={value} classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                onChange={this.handleChange}>
            <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                 onClick={this.handleBackButton} label="<  Back" />
          </Tabs>
         </AppBar>
         <div className="profile-card">
          <AddEmployeeForm
                  profile={blankProfile}
                  saveProfile={this.addProfile}
                  cancelEdit={this.handleBackButton}/>
        </div>
         </div>
          </Paper>) :
       ( displayedPage == "table" ? 
       (<Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} generateReport={this.generateReport}/>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
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
                          labelStyle={{ color: 'grey' }}
                          iconStyle={{ fill: 'grey' }}
                          inputStyle={{ color: 'grey' }}
                          style={{ color: 'grey' }} />
                      </TableCell>
                      <TableCell 
                        component="th" 
                        scope="row" 
                        padding="none"
                        onClick={event => this.handleClickProfile(event, n)}>
                        {n.firstname}
                      </TableCell>
                      <TableCell align="left" onClick={event => this.handleClickProfile(event, n)}>
                        {n.lastname}</TableCell>
                      <TableCell align="left" onClick={event => this.handleClickProfile(event, n)}>
                        {n.role}</TableCell>
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
          count={data.length}
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
        /></Paper>) : 
        (<Paper className={classes.root}>
        <div>
          <AppBar position="static" width="100%">
          <Tabs value={value} classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }} 
                onChange={this.handleChange}>
            <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                 onClick={this.handleBackButton} label="<  Back" />           
            <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} 
                 label="Profile" />
            <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                 label="Performance" />
            <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} 
                 label="Onboarding" />
          </Tabs>
         </AppBar>
        {value === 1 && !edit &&
         <div>
           <Button className={classes.editButton} onClick={this.handleClickEdit}>
              Edit
           </Button>
           <EmployeeDisplay isAdmin={true} profile={currProfile} roleName={currProfile.role}/>
         </div>}
         {value == 1 && edit &&
         <div className="profile-card">
          <EmployeeEditForm
          profile={currProfile}
          saveProfile={this.saveProfile}
          cancelEdit={this.cancelEdit}
        />
        </div>}
        {value === 2 && 
        <div className="profile-card">
          <Typography className={classes.employeeName} variant="h5">{currProfile.firstname} {currProfile.lastname}</Typography>
          <FormControl className={classes.formControl}>
            <InputLabel>
              Year
            </InputLabel>
            <Select
              onChange={this.handleSelect}>
              <MenuItem value={0}>2019-2020</MenuItem>
              <MenuItem value={1}>2018-2019</MenuItem>
          </Select>
            {/* {this.generateDropdown()} */}
          </FormControl>
            <AppBar position="static" className={classes.appBar}>
              <Tabs value={miniTabValue} classes={{ root: classes.miniTabs, indicator: classes.tabsIndicator }}
                    indicatorColor="#ff5000"
                    textColor="white"
                    onChange={this.handleMiniTabChange}>
                <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                     label="Work Plan" />
                <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                     label="Performance Review" />
              </Tabs>
            </AppBar>
            { miniTabValue == 0 && !edit &&
            <div className={classes.docDisplay}>
              <Button className={classes.editWPButton} onClick={this.handleClickEdit}>Edit</Button> 
              <WorkPlanDisplay form={sampleWorkPlan} years="2019-2020" profile={currProfile} />
            </div>
            }
            { miniTabValue == 0 && edit &&
            <div>
              <WorkPlanForm form={sampleWorkPlan} years="2019-2020" profile={currProfile} />
              <Button className={classes.cancelButton} onClick={this.cancelEdit}>Cancel</Button>
              <Button className={classes.saveButton} onClick={this.updateReview}>Save</Button>
            </div>
            }
            { miniTabValue == 1 && !edit &&
            <div className={classes.docDisplay}>
              <Button className={classes.editWPButton} onClick={this.handleClickEdit}>Edit</Button> 
              <PerformanceReviewDisplay form={samplePR} years="2019-2020" profile={currProfile} />
            </div>
            }
            { miniTabValue == 1 && edit &&
            <div>
              <PerformanceReviewForm form={samplePR} years="2019-2020" profile={currProfile} />
              <Button className={classes.cancelButton} onClick={this.cancelEdit}>Cancel</Button>
              <Button className={classes.saveButton} onClick={this.updateReview}>Save</Button>
            </div>
            }
          </div>}
        {value === 3 && 
          <div className={classes.container}>
          <div className={classes.onBoardingHeader}>
            <Typography className={classes.employeeName} variant="h5">Onboarding Items</Typography>
            <Button className={classes.addOIButton} onClick={this.handleAddOI}>
              Add Onboarding Item
           </Button>
           </div>
            <DocumentsContainer documents={this.documents} ></DocumentsContainer>
            <Dialog
              open={addOIDialog}
              onClose={this.handleCloseAddOIDialog}
              aria-labelledby="addOI-dialog-title"
            >
              <DialogTitle id="addOI-dialog-title">Add Onboarding Item</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Enter the information for the new onbording item:
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  className={classes.addOIDialogField}
                  id="addOI-dialog-name"
                  label="Name"
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  className={classes.addOIDialogField}
                  id="addOI-dialog-description"
                  label="Description"
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  className={classes.addOIDialogField}
                  id="addOI-dialog-date"
                  label="Due Date"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleCloseAddOIDialog} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleAddOIDialog} color="primary">
                  OK
                </Button>
              </DialogActions>
        </Dialog>
        <Dialog
              open={editOIDialog}
              onClose={this.handleCloseEditOIDialog}
              aria-labelledby="editOI-dialog-title"
            >
              <DialogTitle id="editOI-dialog-title">Edit Onboarding Item</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  className={classes.editOIDialogField}
                  id="editOI-dialog-name"
                  label="Name"
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  className={classes.editOIDialogField}
                  id="editOI-dialog-description"
                  label="Description"
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  className={classes.editOIDialogField}
                  id="editOI-dialog-date"
                  label="Due Date"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleCloseEditOIDialog} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleEditOIDialog} color="primary">
                  OK
                </Button>
              </DialogActions>
        </Dialog>
          </div>
        }
      </div>
      </Paper>)))}
      </div>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);  
