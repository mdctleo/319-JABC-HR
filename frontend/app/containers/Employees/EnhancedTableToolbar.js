import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import React from 'react';
import classNames from 'classnames';

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
    padding: '10px',
  },
  title: {
    flex: '0 0 auto',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

const EnhancedTableToolbar = props => {
  const { numSelected, classes, tableSettings } = props;

  return (
    <Toolbar className={classNames(classes.root, classes.highlight)}>
      <div className={classes.title}>
        {numSelected > 0 && (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        )}
      </div>
      {numSelected > 0 && (
        <div>
          <button
            type="button"
            className="primary-button"
            id="generate-report-button"
          >
            Generate Report
          </button>
        </div>
      )}
      <div className={classes.spacer} />
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          value={tableSettings.search}
          onChange={event =>
            props.updateTableSettings({ search: event.target.value })
          }
        />
      </div>
      <div className={classes.actions}>
        <FormControlLabel
          control={
            <Switch
              checked={tableSettings.showInactive}
              onChange={event =>
                props.updateTableSettings({
                  showInactive: event.target.checked,
                })
              }
            />
          }
          label="Show inactive"
        />
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  tableSettings: PropTypes.object.isRequired,
  updateTableSettings: PropTypes.func.isRequired,
};

export default withStyles(toolbarStyles)(EnhancedTableToolbar);
