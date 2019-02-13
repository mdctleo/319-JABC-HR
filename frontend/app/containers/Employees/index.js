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
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

let counter = 0;
function createData(firstName, lastName, employeeID, position) {
  counter += 1;
  return { id: counter, firstName, lastName, employeeID, position };
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
  { id: 'firstName', numeric: false, disablePadding: true, label: 'First Name' },
  { id: 'lastName', numeric: false, disablePadding: false, label: 'Last Name' },
  { id: 'employeeID', numeric: true, disablePadding: false, label: 'Employee ID' },
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
  const { numSelected, classes } = props;

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
          <button class="primary-button" id="generate-report-button">
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
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '95%',
    marginTop: theme.spacing.unit * 3,
    marginLeft: '2.5%',
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
  tabsRoot: {
    borderBottom: '1px solid #e8e8e8',
  },
  tabRoot: {
    textTranform: 'initial',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,
    '&.hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$tabSelected': {
      color: '#ff5000',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#ff5000',
    },
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 3,
  },
  container: {
    marginLeft: '30px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  fieldContainer: {
    width: '100%',
    marginBottom: '15px',
  },
  employeeName: {
    marginTop: '30px',
    marginBottom: '30px',
  }
});


class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'lastName',
    selected: [],
    selectedProfile: 0,
    value: 1,
    data: [
      createData('Mikayla', 'Preete', 918984, 'Developer'),
      createData('James', 'Yoo', 902873, 'Developer'),
      createData('Sam', 'Veloso', 837982, 'Database Admin'),
      createData('Anita', 'Tse', 876321, 'DevOps Master'),
      createData('Abraham', 'Torres Juarez', 758982, 'Developer'),
      createData('Leo', 'Lin', 123142, 'Developer'),
      createData('Reed', 'Esler', 382981, 'Developer'),
      createData('John', 'Doe', 234123, 'Manager'),
      createData('Jane', 'Smith', 231531, 'HR Admin'),
      createData('Alex', 'Robinson', 232143, 'President'),
      createData('Jack', 'Sparrow', 123531, 'Pirate'),
      createData('Ariana', 'Grande', 123987, 'Singer'),
      createData('Brad', 'Pitt', 387082, 'Actor'),
    ],
    page: 0,
    rowsPerPage: 10,
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

  handleClickProfile = (event, id) => {
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
    this.setState({ selectedProfile: 1 });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleBackButton = (event, value) => {
    this.setState({ value: 1 });
    this.setState({ selectedProfile: 0 });
  }

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
    const { data, order, orderBy, selected, selectedProfile, value, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <div>
      <h1>Manage Employees</h1>
       { selectedProfile == 0 ? 
       (<Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} />
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
                        onClick={event => this.handleClickProfile(event, n.id)}>
                        {n.firstName}
                      </TableCell>
                      <TableCell align="left" onClick={event => this.handleClickProfile(event, n.id)}>
                        {n.lastName}</TableCell>
                      <TableCell align="right" onClick={event => this.handleClickProfile(event, n.id)}>
                        {n.employeeID}</TableCell>
                      <TableCell align="left" onClick={event => this.handleClickProfile(event, n.id)}>
                        {n.position}</TableCell>
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
        <div className={classes.root}>
        <div>
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
       </div> 
        {value === 1 && 
         <div>
           <Typography className={classes.employeeName} variant="h5">John Doe</Typography>
           <form className={classes.container} noValidation autocomplete="off">
             <div className={classes.fieldContainer}>      
               <Typography variant="subtitle1" color="textSecondary">Name</Typography>
             </div>
             <div className={classes.fieldContainer}>
                 <TextField
                   id="outlined-firstName"
                   label="First Name"
                   defaultValue="John"
                   className={classes.textField}
                   margin="normal"
                   variant="outlined">
                 </TextField>
                 <TextField
                   id="outlined-lastName"
                   label="Last Name"
                   defaultValue="Doe"
                   className={classes.textField}
                   margin="normal"
                   variant="outlined">
                 </TextField>
              </div>
              <div className={classes.fieldContainer}>
                 <Typography variant="subtitle1" color="textSecondary">Employee Information</Typography>
              </div>
              <div className={classes.fieldContainer}>
                 <TextField
                   id="outlined-empID"
                   label="Employee ID"
                   defaultValue="234123"
                   className={classes.textField}
                   margin="normal"
                   variant="outlined">
                 </TextField>
                 <TextField
                   id="outlined-sin"
                   label="SIN"
                   defaultValue="234123"
                   className={classes.textField}
                   margin="normal"
                   variant="outlined">
                 </TextField>
                 <TextField
                   id="outlined-vacation"
                   label="Vacation Days"
                   defaultValue="14"
                   className={classes.textField}
                   margin="normal"
                   variant="outlined">
                 </TextField>
                 <TextField
                   id="outlined-fte"
                   label="FTE"
                   defaultValue="XXX"
                   className={classes.textField}
                   margin="normal"
                   variant="outlined">
                 </TextField>
              </div>
              <div className={classes.fieldContainer}>
                 <Typography variant="subtitle1" color="textSecondary">Contact Information</Typography>
              </div>
              <div className={classes.fieldContainer}>
                 <TextField
                   id="outlined-address"
                   label="Address"
                   multiline
                   rowsMax="4"
                   defaultValue="123 Somewhere Street Vancouver BC"
                   className={classes.textField}
                   margin="normal"
                   variant="outlined">
                 </TextField>
                 <TextField
                   id="outlined-name"
                   label="Phone number"
                   defaultValue="(604) 555-5555"
                   className={classes.textField}
                   margin="normal"
                   variant="outlined">
                 </TextField>
              </div>
           </form>
         </div>}
        {value === 2 && <h1>Performance Reports</h1>}
        {value === 3 && 
          <div style={{position:'relative'}}>
            <Typography className={classes.employeeName} variant="h5">Onboarding documents</Typography>
            <Fab
              color="primary"
              component="label"
              size="medium"
              style={{position:'absolute',top:0,right:0}}
            >
              <AddIcon/>
            </Fab>
            <DocumentsContainer documents={this.documents} ></DocumentsContainer>
          </div>
        }
      </div>
      </Paper>)}
      </div>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);  
