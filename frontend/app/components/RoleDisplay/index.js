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
import TableHead from '@material-ui/core/TableHead';


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
  subHeading: {
    marginTop: '40px'
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
  }
});

class RoleDisplay extends React.PureComponent  {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, login } = this.props;
    // will replace with login logic eventually
    const role = {name: "Developer", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", competencies: [{name: "C++", description: "Can program in C++", rating: 1},
                                                                                            {name: "Java", description: "Can program in Java", rating: 2}]};
    function generateCompetencies() {
        return (
          <div>
            <TableRow className={classes.tableHead}>
                <TableCell align="left"><Typography variant="caption">NAME</Typography></TableCell>
                <TableCell align="left"><Typography variant="caption">DESCRIPTION</Typography></TableCell>
                <TableCell align="right"><Typography variant="caption">RATING</Typography></TableCell>
            </TableRow>
              {role.competencies.map(function(competency, index){
                  return <TableRow className={classes.row}>
                            <TableCell align="left">{competency.name}</TableCell>
                            <TableCell align="left">{competency.description}</TableCell>
                            <TableCell align="right">{competency.rating}</TableCell>
                         </TableRow>; })}
          </div>
        )};

    return (
        <div className="profile-card">
          <Typography variant="h5">{role.name}</Typography>
          <Typography className={classes.subHeading} variant="subtitle1" color="textSecondary">Description</Typography>
          <Typography className={classes.description}>{role.description}</Typography>
          <Typography className={classes.subHeading} variant="subtitle1" color="textSecondary">Competencies</Typography>
        <Table className={classes.displayTable} fullWidth>
          <TableBody>
          {generateCompetencies()}
          </TableBody>
        </Table> 
        </div>
    );
  }
}

RoleDisplay.propTypes = {
  classes: PropTypes.object.isRequired,
  role: PropTypes.object,
  login: PropTypes.string,
};

export default withStyles(styles)(RoleDisplay);
