/**
 *
 * Roles
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
import AppBar from '@material-ui/core/AppBar';
import green from "@material-ui/core/colors/green";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";

let counter = 0;
function createData(position) {
  counter += 1;
  return { id: counter, position };
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
  { id: 'position', numeric: false, disablePadding: true, label: 'Position' },
];

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
    marginTop: '30px',
  },
  formSubheading: {
    marginTop: '30px',
  },
  radio: {
    color: green[600],
    "&$checked": {
      color: green[500]
    }
  },
  card: {
    width: "75%",
  },
  fab: {
    marginTop: '30px',
    marginBottom: '30px',
    marginLeft: '37.5%',
    display: 'block',
  },
});


class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'position',
    selected: [],
    displayedPage: "table",
    addButtonClicked: 0,
    selectedProfileName: '',
    value: 1,
    data: [
      createData('Developer'),
      createData('Database Admin'),
      createData('DevOps Master'),
      createData('Manager'),
      createData('HR Admin'),
      createData('President'),
      createData('Executive Assistant'),
      createData('Secretary'),
      createData('Volunteer Coordinator'),
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

  handleClickProfile = (event, id, position) => {
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
    this.setState({ displayedPage: "profile" });
    this.setState({ selectedProfileName: position });
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
    this.setState({ displayedPage: "table" });
  }
  
  handleAddButton = (event, value) => {
    this.setState({ displayedPage: "add" });
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, displayedPage, value, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <div>
      <h1>Roles</h1>
      <Button className={classes.addButton} onClick={this.handleAddButton}>Add Role</Button>
        { displayedPage == "add" ?   
        (<Paper className={classes.root}>
          <div> 
          <AppBar position="static" width="100%">
          <Tabs value={value} classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                onChange={this.handleChange}>
            <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                 onClick={this.handleBackButton} label="<  Back" />
          </Tabs>
         </AppBar>
<div>
           <form className={classes.container} noValidation autocomplete="off">
             <div className={classes.fieldContainer}>
               <Typography className={classes.formSubheading} variant="subtitle1" color="textSecondary">Title</Typography>
             </div>
              <div className={classes.fieldContainer}>
                 <TextField
                   id="outlined-multiline-static"
                   defaultValue=""
                   rows="4"
                   className={classes.textField}
                   margin="normal"
                   variant="outlined">
                 </TextField>
              </div>
             <div className={classes.fieldContainer}>      
               <Typography className={classes.formSubheading} variant="subtitle1" color="textSecondary">Description</Typography>
             </div>
              <div className={classes.fieldContainer}>
                 <TextField
                   id="outlined-multiline-static"
                   multiline
                   rows="4"
                   className={classes.textField}
                   margin="normal"
                   variant="outlined">
                 </TextField>
              </div>
              <div className={classes.fieldContainer}>
                <Typography className={classes.formSubheading} variant="subtitle1" color="textSecondary">Competencies</Typography>
              </div>
     <Card className={classes.card}>
      <CardContent>
        <TextField
          id="outlined-name"
          label="Name"
          margin="normal"
          defaultValue=" "
          fullWidth
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Description"
          margin="normal"
          defaultValue=" "
          variant="outlined"
          fullWidth
          multiline
          rows="4"
        />
        <FormControl component="fieldset">
        <Typography>Rating</Typography>
          <RadioGroup 
            aria-label="position" 
            name="position" 
            row
           >
            <FormControlLabel
              value="1"
              control={
                <Radio
                className={classes.radio}/>
              }
              label="1"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="2"
              control={
                <Radio
                className={classes.radio}/>
              }
              label="2"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="3"
              control={
                <Radio
                className={classes.radio}/>
              }
              label="3"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="4"
              control={
                <Radio
                className={classes.radio}/>
              }
              label="4"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="5"
              control={
                <Radio
                className={classes.radio}/>
              }
              label="5"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
           </form>
      <Fab color="green" aria-label="Add" className={classes.fab}>
        <AddIcon />
      </Fab>
         </div>
         </div>
          </Paper>) :
       ( displayedPage == "table" ? 
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
                        align="left"
                        component="th" 
                        scope="row" 
                        padding="none"
                        onClick={event => this.handleClickProfile(event, n.id, n.position)}>
                        {n.position}
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
          </Tabs>
         </AppBar>
         <div>
           <form className={classes.container} noValidation autocomplete="off">
             <Typography className={classes.positionName} variant="h5">{this.state.selectedProfileName}</Typography>
             <div className={classes.fieldContainer}>      
               <Typography className={classes.formSubheading} variant="subtitle1" color="textSecondary">Description</Typography>
             </div>
              <div className={classes.fieldContainer}>
                 <TextField
                   id="outlined-multiline-static"
                   multiline
                   rows="4"
                   className={classes.textField}
                   margin="normal"
                   variant="outlined">
                 </TextField>
              </div>
              <div className={classes.fieldContainer}>
                <Typography className={classes.formSubheading} variant="subtitle1" color="textSecondary">Competencies</Typography>
              </div>
     <Card className={classes.card}>
      <CardContent>
        <TextField
          id="outlined-name"
          label="Name"
          margin="normal"
          defaultValue=" "
          fullWidth
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Description"
          margin="normal"
          defaultValue=" "
          variant="outlined"
          fullWidth
          multiline
          rows="4"
        />
        <FormControl component="fieldset">
        <Typography>Rating</Typography>
          <RadioGroup 
            aria-label="position" 
            name="position" 
            row
           >
            <FormControlLabel
              value="1"
              control={
                <Radio
                className={classes.radio}/>
              }
              label="1"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="2"
              control={
                <Radio
                className={classes.radio}/>
              }
              label="2"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="3"
              control={
                <Radio
                className={classes.radio}/>
              }
              label="3"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="4"
              control={
                <Radio
                className={classes.radio}/>
              }
              label="4"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="5"
              control={
                <Radio
                className={classes.radio}/>
              }
              label="5"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
           </form>
      <Fab color="green" aria-label="Add" className={classes.fab}>
        <AddIcon />
      </Fab>
         </div>
      </div>
      </Paper>))}
      </div>
    );
  }  
}


EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);  
