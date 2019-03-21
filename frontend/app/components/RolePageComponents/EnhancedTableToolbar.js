import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import IconButton from '@material-ui/core/IconButton/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
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
  },
  title: {
    flex: '0 0 auto',
  },
});

const EnhancedTableToolbar = props => {
  const { numSelected, classes, showReportButton } = props;

  return (
    <Toolbar className={classNames(classes.root, classes.highlight)}>
      <div className={classes.title}>
        {numSelected > 0 && (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        )}
      </div>
      {numSelected > 0 &&
        showReportButton && (
          <div>
            <button type='button' className="primary-button" id="generate-report-button">
              Generate Report
            </button>
          </div>
        )}
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton
              aria-label="Delete"
              onClick={() => props.handleDeleteButton()}
            >
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
  handleDeleteButton: PropTypes.func.isRequired,
  showReportButton: PropTypes.bool,
};

export default withStyles(toolbarStyles)(EnhancedTableToolbar);
