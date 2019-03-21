import Paper from '@material-ui/core/Paper/Paper';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Tabs from '@material-ui/core/Tabs/Tabs';
import Tab from '@material-ui/core/Tab/Tab';
import AddEmployeeForm from '../../components/AddEmployeeForm';
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
  tabsIndicator: {
    backgroundColor: '#ff5000',
  },
});

const AddEmployeePage = props => {
  const { classes, handleBackButton, addProfile } = props;
  return (
    <Paper className={classes.root}>
      <div>
        <AppBar position="static" width="100%">
          <Tabs
            classes={{
              indicator: classes.tabsIndicator,
            }}
            value={0}
          >
            <Tab
              disableRipple
              classes={{
                selected: classes.tabSelected,
              }}
              onClick={handleBackButton}
              label="<  Back"
            />
          </Tabs>
        </AppBar>
        <div className="profile-card">
          <AddEmployeeForm
            saveProfile={addProfile}
            cancelEdit={handleBackButton}
          />
        </div>
      </div>
    </Paper>
  );
};

AddEmployeePage.propTypes = {
  classes: PropTypes.object.isRequired,
  handleBackButton: PropTypes.func.isRequired,
  addProfile: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddEmployeePage);
