/**
 *
 * RoleTab
 *
 */

import React from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField/TextField';
import CompetencyCard from '../CompetencyCard';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  fieldContainer: {
    width: '100%',
    marginBottom: '15px',
  },
  positionName: {
    display: 'inline',
    marginTop: '30px',
  },
  formSubheading: {
    display: 'inline',
  },
  container: {
    width: '95%',
    marginLeft: '2.5%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  topFieldContainer: {
    width: '100%',
    marginBottom: '15px',
    marginTop: '50px',
  },
  textField: {
    width: '100%',
  },
});

class RoleTab extends React.PureComponent {
  render() {
    const { role, classes } = this.props;
    return (
      <div className="profile-card">
        <form className={classes.container} autoComplete="off">
          <div className={classes.topFieldContainer}>
            <Typography className={classes.positionName} variant="h5">
              {role.name}
            </Typography>
          </div>
          <div className={classes.fieldContainer}>
            <Typography
              className={classes.formSubheading}
              variant="subtitle1"
              color="textSecondary"
            >
              Description
            </Typography>
          </div>
          <div className={classes.fieldContainer}>
            <TextField
              id="role-description"
              multiline
              rows="4"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              defaultValue={role.description}
              InputProps={{ readOnly: true }}
            />
          </div>
          <div className={classes.fieldContainer}>
            <Typography
              className={classes.formSubheading}
              variant="subtitle1"
              color="textSecondary"
            >
              Competencies
            </Typography>
          </div>
          <CompetencyCard
            dataObject={[{ name: '', description: '', rating: 0 }]}
            disabled
          />
        </form>
      </div>
    );
  }
}

RoleTab.propTypes = {
  role: PropTypes.object,
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles))(RoleTab);
