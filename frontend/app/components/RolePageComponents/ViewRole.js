import Paper from '@material-ui/core/Paper/Paper';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Tabs from '@material-ui/core/Tabs/Tabs';
import Tab from '@material-ui/core/Tab/Tab';
import Button from '@material-ui/core/Button/Button';
import RoleDisplay from '../RoleDisplay';
import RoleForm from '../RoleForm';
import React from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    width: '95%',
    marginTop: theme.spacing.unit * 3,
    marginLeft: '2.5%',
    paddingBottom: '100px',
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
  tabsIndicator: {
    backgroundColor: '#ff5000',
  },
  tabSelected: {},
});

const ViewRole = props => {
  const {
    classes,
    editButtonClicked,
    handleBackButton,
    handleEditButton,
    cancelEdit,
    handleSaveButton,
    selectedProfile,
  } = props;
  return (
    <Paper className={classes.root}>
      <div>
        <AppBar position="static" width="100%">
          <Tabs
            value={0}
            classes={{
              root: classes.tabsRoot,
              indicator: classes.tabsIndicator,
            }}
          >
            <Tab
              disableRipple
              classes={{
                root: classes.tabRoot,
                selected: classes.tabSelected,
              }}
              onClick={handleBackButton}
              label="<  Back"
            />
          </Tabs>
        </AppBar>
        {!editButtonClicked && (
          <div className="profile-card">
            <Button className={classes.editButton} onClick={handleEditButton}>
              Edit
            </Button>
            <RoleDisplay role={selectedProfile} />
          </div>
        )}
        {editButtonClicked && (
          <div>
            <RoleForm
              role={selectedProfile}
              add={0}
              cancelEdit={cancelEdit}
              handleSaveButton={handleSaveButton}
            />
          </div>
        )}
      </div>
    </Paper>
  );
};

ViewRole.propTypes = {
  classes: PropTypes.object.isRequired,
  editButtonClicked: PropTypes.bool.isRequired,
  handleBackButton: PropTypes.func.isRequired,
  handleEditButton: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  handleSaveButton: PropTypes.func.isRequired,
  selectedProfile: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewRole);
