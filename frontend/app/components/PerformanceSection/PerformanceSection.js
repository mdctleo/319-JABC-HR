import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import Toolbar from '@material-ui/core/Toolbar';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
let uniqid = require('uniqid');


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
    }
  },
  buttonStyle: {
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
  subHeading: {
    marginTop: '40px'
  },
  firstTopHeading: {
    marginTop: '40px'
  },
  topHeading: {
    marginTop: '20px'
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
    marginBottom: '40px'
  }
});

class EnhancedTableHead extends React.Component {
  render() {
    const { section, onSelectAllClick, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
            {section.columns.map(function(column) {
              return <TableCell key={column.concat(-1)}>{column}</TableCell>
            })}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  section: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
};


const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
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
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            {props.sectionName}
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton onClick={props.handleDeleteRows} aria-label="Delete">
              <DeleteIcon/>
            </IconButton>
          </Tooltip>
        ) : (<div/>)}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  sectionName: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);


class PerformanceSection extends React.Component {
  state = {
    openAddRowDialog: false,
    selected: []
  };

  handleDeleteRows = () => {
    this.props.handleDeleteRows(this.props.section.sectionId, this.state.selected);

    this.setState( {selected: []} );
  };

  handleSelectAllClick = event => {

    if (event.target.checked) {
      this.setState(state => ({ selected: this.props.section.data.map(data => data.id) }));
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

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  // Build data from the fields filled out in the Dialog Box
  // Then, add it to this Section
  saveRowToSection = () => {
    let section = this.props.section;
    let newRow = {};

    newRow.id = uniqid();

    for (let column of section.columns) {
      newRow[column] = document.getElementById(column.concat(section.sectionId)).value;
    }

    this.props.handleAddRow(this.props.section.sectionId, newRow);
    this.closeNewRowDialog();
  };

  openNewRowDialog = () => {
    this.setState({openAddRowDialog: true});
  };

  closeNewRowDialog = () => {
    this.setState({openAddRowDialog: false});
  };

  render() {
    const { classes, section } = this.props;
    const { selected } = this.state;
    let that = this;

    return(
      <div>
        <Dialog
          open={this.state.openAddRowDialog}
          onClose={this.closeNewRowDialog}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add new row</DialogTitle>
          <DialogContent>
            {section.columns.map(function(column) {
              return <TextField
                key={column.concat(section.sectionId)}
                autoFocus
                margin="dense"
                id={column.concat(section.sectionId)}
                label={column}
                fullWidth/>
            })}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeNewRowDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this.saveRowToSection} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>

        <Button className={classes.buttonStyle} onClick={this.openNewRowDialog}>Add Row</Button>
        <Paper className={classes.root}>
          <EnhancedTableToolbar sectionName={section.sectionName} selected={selected} numSelected={selected.length} handleDeleteRows={that.handleDeleteRows} />
          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
              <EnhancedTableHead section={section} numSelected={selected.length} onSelectAllClick={this.handleSelectAllClick} rowCount={section.data.length}/>
              <TableBody>
                {section.data.map(function(item) {
                  const isSelected = that.isSelected(item.id);
                  return (
                    <TableRow hover
                              onClick={event => that.handleClick(event, item.id)}
                              role="checkbox"
                              aria-checked={isSelected}
                              selected={isSelected}
                              tabIndex={-1}
                              key={item.id}>
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      {section.columns.map(function(column) {
                        return <TableCell key={column.concat(item.id)}>{item[column]}</TableCell>
                      })
                      }
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </Paper>
      </div>
    );
  }
}

PerformanceSection.propTypes = {
  classes: PropTypes.object.isRequired,
  section: PropTypes.object.isRequired,
  handleDeleteRows: PropTypes.func.isRequired
};

export default withStyles(styles)(PerformanceSection);
