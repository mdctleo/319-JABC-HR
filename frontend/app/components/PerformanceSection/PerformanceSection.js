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
import EditIcon from '@material-ui/icons/Edit';
import Toolbar from '@material-ui/core/Toolbar';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
const uniqid = require('uniqid');

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
    },
  },
  addButton: {
    float: 'left',
    display: 'inline',
    color: '#black',
    width: '100px',
    backgroundColor: '#e5e5e5',
    borderRadius: '15px',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#efefef',
    },
  },
  buttonStyle: {
    float: 'right',
    display: 'inline',
    color: 'white',
    backgroundColor: '#ff6600',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#ff944d',
    },
  },
  subHeading: {
    marginTop: '40px',
  },
  firstTopHeading: {
    marginTop: '40px',
  },
  topHeading: {
    marginTop: '20px',
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
    marginBottom: '40px',
  },
  bottomRow: {
    height: '60px',
  },
  spacer: {
    flex: '1 1 100%',
  },
  actionButton: {
    float: 'right',
    display: 'inline',
    color: theme.palette.text.secondary,
    // borderRadius: '15px',
    marginLeft: '10px',
  },
  colNameField: {
    flex: '0 0 auto',
  },
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
              checked={numSelected === rowCount && rowCount > 0}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {section.data.columns.map(column => (
            <TableCell key={column.concat(-1)}>{column}</TableCell>
          ))}
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
    marginTop: '40px',
    backgroundColor: '#f0f0f0',
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
    flex: '1 1 50%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
  actionButton: {
    float: 'left',
    display: 'inline',
    color: theme.palette.text.secondary,
    // borderRadius: '15px',
    marginLeft: '10px',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}>
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
        <IconButton
          className={classes.actionButton}
          onClick={props.openEditSectionDialog}
          size="small"
        >
          <EditIcon />
        </IconButton>
        {numSelected === 0 ? (
          <IconButton
            className={classes.actionButton}
            onClick={props.handleDeleteSection}
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        ) : (
          <Tooltip title="Delete">
            <IconButton onClick={props.handleDeleteRows} aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  sectionName: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  handleDeleteSection: PropTypes.func.isRequired,
  handleDeleteRows: PropTypes.func.isRequired,
  openEditSectionDialog: PropTypes.func.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

class PerformanceSection extends React.Component {
  state = {
    openAddRowDialog: false,
    openEditSectionDialog: false,
    editSectionError: null,
    selected: [],
  };

  handleDeleteRows = () => {
    this.props.handleDeleteRows(
      this.props.section.id,
      this.state.selected,
    );

    this.setState({ selected: [] });
  };

  handleDeleteSection = () => {
    this.props.handleDeleteSection(this.props.section.id);
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState({
        selected: this.props.section.data.rows.map(data => data.id),
      });
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
    const section = this.props.section;
    const newRow = {};

    newRow.id = uniqid();

    for (const column of section.data.columns) {
      newRow[column] = document.getElementById(
        column.concat(section.id),
      ).value;
    }

    this.props.handleAddRow(this.props.section.id, newRow);
    this.closeNewRowDialog();
  };

  openNewRowDialog = () => {
    this.setState({ openAddRowDialog: true });
  };

  closeNewRowDialog = () => {
    this.setState({ openAddRowDialog: false });
  };

  openEditSectionDialog = () => {
    this.setState({ openEditSectionDialog: true });
  };

  closeEditSectionDialog = () => {
    this.setState({ openEditSectionDialog: false });
  };

  render() {
    const { classes, section } = this.props;
    const { editSectionError, openAddRowDialog, selected } = this.state;
    const that = this;

    return (
      <div>
        <Dialog
          open={openAddRowDialog}
          onClose={this.closeNewRowDialog}
          aria-labelledby="form-dialog-title"
          fullWidth
        >
          <DialogTitle id="form-dialog-title">Add new row</DialogTitle>
          <DialogContent>
            {section.data.columns.map(column => (
              <TextField
                key={column.concat(section.id)}
                autoFocus
                margin="dense"
                id={column.concat(section.id)}
                label={column}
                fullWidth
              />
            ))}
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

        <Dialog
          open={this.state.openEditSectionDialog}
          onClose={this.closeEditSectionDialog}
          aria-labelledby="form-dialog-title"
          fullWidth
        >
          <DialogTitle id="form-dialog-title">Edit Section</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="sectionName"
              label="Section Name"
              defaultValue={section.sectionName}
              fullWidth
            />
            {section.data.columns.map((column, i) => (
              <div key={i}>
                <div className={classes.colNameField}>
                  <TextField
                    autoFocus
                    key={i}
                    margin="dense"
                    id={'col-name'.concat(column)}
                    label="Column Name"
                    defaultValue={column}
                    fullWidth
                  />
                </div>
                <div className={classes.spacer} />
                <div>
                  <IconButton
                    className={classes.actionButton}
                    onClick={this.handleDeleteSection}
                    size="small">
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            ))}
            <Button
              className={classes.addColButton}
              onClick={this.incNumColumnsForNewSection}>
              Add Column
            </Button>
          </DialogContent>
          <DialogActions>
            {editSectionError && (
              <Typography color="error" variant="body2">
                {editSectionError}
              </Typography>
            )}
            <Button onClick={this.closeEditSectionDialog} color="primary">
              Cancel
            </Button>
              <Button
                onClick={() => this.saveSection(true)}
                color="primary">
                OK
              </Button>
          </DialogActions>
        </Dialog>

        <Paper className={classes.root}>
          <EnhancedTableToolbar
            sectionName={section.sectionName}
            selected={selected}
            numSelected={selected.length}
            handleDeleteRows={that.handleDeleteRows}
            handleDeleteSection={that.handleDeleteSection}
            openEditSectionDialog={that.openEditSectionDialog}
          />
          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
              <EnhancedTableHead
                section={section}
                numSelected={selected.length}
                onSelectAllClick={this.handleSelectAllClick}
                rowCount={section.data.rows.length}
              />
              <TableBody>
                {section.data.rows.map(item => {
                  const isSelected = that.isSelected(item.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => that.handleClick(event, item.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      selected={isSelected}
                      tabIndex={-1}
                      key={item.id}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      {section.data.columns.map(column => (
                        <TableCell key={column.concat(item.id)}>
                          {item[column]}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
                <TableRow className={classes.bottomRow}>
                  <TableCell colSpan={section.data.columns.length + 1}>
                    <Button
                      className={classes.addButton}
                      onClick={this.openNewRowDialog}
                      size="small"
                    >
                      ADD ROW
                    </Button>
                  </TableCell>
                </TableRow>
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
  handleDeleteSection: PropTypes.func.isRequired,
  handleDeleteRows: PropTypes.func.isRequired,
  handleAddRow: PropTypes.func.isRequired,
};

export default withStyles(styles)(PerformanceSection);
