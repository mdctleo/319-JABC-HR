/**
 *
 * Performance
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import green from "@material-ui/core/colors/green";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

let counter = 0;
function createData(position) {
  counter += 1;
  return { id: counter, position };
}

const styles = theme => ({
  root: {
    width: '95%',
    marginTop: theme.spacing.unit * 3,
    marginLeft: '2.5%',
  },
  yearContainer: {
    float: 'right',
    marginTop: '30px',
    marginRight: '2.5%',
    width: 'auto',
  },
  addYearButton: {
    verticalAlign: 'middle',
    display: 'inline-block',
    color: 'white',
    width: '125px',
    backgroundColor: '#ff6600',
    borderRadius: '15px',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#ff944d',
    }
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
    }
  },
  table: {
    minWidth: 800,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  tabsIndicator: {
    display: 'inline-block',
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
    marginTop: '20px',
    marginBottom: '15px',
  },
   topFieldContainer: {
    width: '100%',
    marginBottom: '15px',
    marginTop: '50px',
  },
  positionName: {
    marginTop: '30px',
  },
  formSubheading: {
    marginTop: '30px',
    display: 'inline',
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
  formControl: {
    float: 'right',
    marginTop: '50px',
    marginRight: '2.5%',
    backgroundColor: 'white',
    width: '200px',
  },
  appBar: {
    width: '100%',
  },
  leftField: {
    width: '30%',
  },
  rightField: {
    marginLeft: '5%',
    width: '55%',
  },
  addGoalButton: {
    margin: theme.spacing.unit,
    marginTop: '20px',
    marginLeft: '2.5%',
  },
  competencyField: {
    width: '90%',
  },
});


class PerformacePage extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'position',
    selected: [],
    displayedPage: "table",
    addButtonClicked: 0,
    editButtonClicked: 0,
    selectedProfileName: '',
    years: [],
    selectedYear: 2019,
    value: 0,
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
 
   handleEditButton = (event, value) => {
    var textFields = document.getElementsByName("textField");
    this.setState({ editButtonClicked: 1 });
    for (var i = 0; i < textFields.length; i++) {
      console.log(textFields[i]);
      textFields[i].readOnly = false;
      textFields[i].children[0].children[0].style = { borderColor: 'green' };
    }
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, displayedPage, editButtonClicked, value, years, selectedYear, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <div>
      <h1>Performance</h1>
      <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>
            Year
          </InputLabel>
          <Select
            input={
              <OutlinedInput
                name="year"
                id="outlined-year-simple"
              />
            }
          >
            <MenuItem value={2019}>
              <em>2019</em>
            </MenuItem>
            <MenuItem value={2018}>2018</MenuItem>
            <MenuItem value={2017}>2017</MenuItem>
            <MenuItem value={2016}>2016</MenuItem>
            <MenuItem value={0}>Add Year</MenuItem>
          </Select>
        </FormControl>
        <Paper className={classes.root}>
          <div> 
          <AppBar position="static" className={classes.appBar}>
          <Tabs value={value} classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                onChange={this.handleChange}>
            <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                 label="Work Plan" />
            <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                 label="Performance Review" />
        </Tabs>
         </AppBar>
      <div>
      { value == 0 &&
           <form className={classes.container} noValidation autocomplete="off">
             <div className={classes.topFieldContainer}>
              <Typography className={classes.formSubheading} variant="h5">{selectedYear} Work Plan</Typography>
              <Button className={classes.editButton} onClick={this.handleEditButton}>Edit</Button> 
             </div>
               <div className={classes.fieldContainer}>
                 <TextField
                   name="textField"
                   label="Date"
                   multiline
                   className={classes.textField}
                   margin="normal"
                   variant="outlined"
                   InputProps={{readOnly: true}}/>
              </div>
               <Typography className={classes.formSubheading} variant="subtitle1" color="textSecondary">JABC Goals</Typography>
                <div className={classes.fieldContainer}>
                 <Card className={classes.card}>
                   <CardContent>
                     <TextField
                       name="textField"
                       label="Department"
                       margin="normal"
                       variant="outlined"
                       className={classes.leftField}
                       InputProps={{readOnly: true}}
                      />
                     <TextField
                       name="textField"
                       label="Goal"
                       margin="normal"
                       variant="outlined"
                       className={classes.rightField}
                       InputProps={{readOnly: true}}
                      />
                    <Fab size="small" color="secondary" aria-label="Add" className={classes.addGoalButton}>
                      <AddIcon />
                    </Fab>
                    </CardContent>
                  </Card>
              </div>
               <Typography className={classes.formSubheading} variant="subtitle1" color="textSecondary">Personal Targets</Typography>
              <div className={classes.fieldContainer}>
                 <Card className={classes.card}>
                   <CardContent>
                     <TextField
                       name="textField"
                       label="Program"
                       margin="normal"
                       variant="outlined"
                       className={classes.leftField}
                       InputProps={{readOnly: true}}
                      />
                     <TextField
                       name="textField"
                       label="Goal"
                       margin="normal"
                       variant="outlined"
                       className={classes.rightField}
                       InputProps={{readOnly: true}}
                      />
                    <Fab size="small" color="secondary" aria-label="Add" className={classes.addGoalButton}>
                      <AddIcon />
                    </Fab>
                    </CardContent>
                  </Card>
              </div>
              <Typography className={classes.formSubheading} variant="subtitle1" color="textSecondary">Core Competencies</Typography>
              <div className={classes.fieldContainer}>
                 <Card className={classes.card}>
                   <CardContent>
                     <TextField
                       name="textField"
                       label="Competency"
                       margin="normal"
                       variant="outlined"
                       className={classes.competencyField}
                       InputProps={{readOnly: true}}
                      />
                    <Fab size="small" color="secondary" aria-label="Add" className={classes.addGoalButton}>
                      <AddIcon />
                    </Fab>
                    </CardContent>
                  </Card>
              </div>
           </form>}
{value == 1 && 
<form className={classes.container} noValidation autocomplete="off">
             <div className={classes.topFieldContainer}>
              <Typography className={classes.formSubheading} variant="h5">{selectedYear} Performance Review</Typography>
              <Button className={classes.editButton} onClick={this.handleEditButton}>Edit</Button> 
             </div>
               <div className={classes.fieldContainer}>
                 <TextField
                   name="textField"
                   label="Date"
                   multiline
                   className={classes.textField}
                   margin="normal"
                   variant="outlined"
                   InputProps={{readOnly: true}}/>
              </div>
               <Typography className={classes.formSubheading} variant="subtitle1" color="textSecondary">JABC Goals</Typography>
                <div className={classes.fieldContainer}>
                 <Card className={classes.card}>
                   <CardContent>
                     <TextField
                       name="textField"
                       label="Department"
                       margin="normal"
                       variant="outlined"
                       className={classes.leftField}
                       InputProps={{readOnly: true}}
                      />
                     <TextField
                       name="textField"
                       label="Goal"
                       margin="normal"
                       variant="outlined"
                       className={classes.rightField}
                       InputProps={{readOnly: true}}
                      />
                    </CardContent>
                  </Card>
              </div>
               <Typography className={classes.formSubheading} variant="subtitle1" color="textSecondary">Personal Targets</Typography>
              <div className={classes.fieldContainer}>
                 <Card className={classes.card}>
                   <CardContent>
                     <TextField
                       name="textField"
                       label="Program"
                       margin="normal"
                       variant="outlined"
                       className={classes.leftField}
                       InputProps={{readOnly: true}}
                      />
                     <TextField
                       name="textField"
                       label="Goal"
                       margin="normal"
                       variant="outlined"
                       className={classes.rightField}
                       InputProps={{readOnly: true}}
                      />
                    </CardContent>
                  </Card>
              </div>
              <Typography className={classes.formSubheading} variant="subtitle1" color="textSecondary">Core Competencies</Typography>
              <div className={classes.fieldContainer}>
                 <Card className={classes.card}>
                   <CardContent>
                     <TextField
                       name="textField"
                       label="Competency"
                       margin="normal"
                       variant="outlined"
                       className={classes.competencyField}
                       InputProps={{readOnly: true}}
                      />
                    </CardContent>
                  </Card>
              </div>
           </form>}
         </div>
         </div>
          </Paper>
      </div>
    );
  }  
}


PerformacePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PerformacePage);  

