/**
 *
 * RoleDisplay
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

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
  subHeading: {
    marginTop: '40px',
  },
  displayTable: {
    marginTop: '20px', 
    tableLayout: 'fixed', 
    width: '100%'
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
  tableWrapper: {
    width: '75%',
  },
  couldOverflow: {
    wordWrap: 'break-word', 
    padding: '20px'
  }
});

class RoleDisplay extends React.PureComponent {
  render() {
    const { classes, role } = this.props;

    function generateCompetencies() {
      return (
        <React.Fragment>
          <TableRow className={classes.tableHead}>
            <TableCell align="left">
              <Typography variant="caption" className={classes.couldOverflow}>NAME</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="caption" className={classes.couldOverflow}>DESCRIPTION</Typography>
            </TableCell>
          </TableRow>
          {role.competencies.map(competency => (
            <TableRow key={competency.id} className={classes.row}>
              <TableCell align="left" className={classes.couldOverflow}>{competency.name}</TableCell>
              <TableCell align="left" className={classes.couldOverflow}>{competency.description}</TableCell>
            </TableRow>
          ))}
        </React.Fragment>
      );
    }

    return (
      <div className="profile-card">
        <Typography variant="h5">{role.name}</Typography>
        <Typography
          className={classes.subHeading}
          variant="subtitle1"
          color="textSecondary"
        >
          Description
        </Typography>
        <Typography className={classes.description}>
          {role.description}
        </Typography>
        <Typography
          className={classes.subHeading}
          variant="subtitle1"
          color="textSecondary"
        >
          Competencies
        </Typography>
        <Table className={classes.displayTable}>
          <TableBody>{generateCompetencies()}</TableBody>
        </Table>
      </div>
    );
  }
}

RoleDisplay.propTypes = {
  classes: PropTypes.object.isRequired,
  role: PropTypes.object,
};

export default withStyles(styles)(RoleDisplay);
