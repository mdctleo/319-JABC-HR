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
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  addButton: {
    display: 'block',
    margin: 'auto',
    marginTop: '10px',
    marginBottom: '10px',
    color: 'white',
    backgroundColor: '#ff6600',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#ff944d',
    }
  },
  root: {
    marginTop: '30px',
  },
  tableHead: {
    backgroundColor: '#fcfcfc',
  }
});

class PerformanceSection extends React.PureComponent {
  render() {
    const { classes, handleAddRow, section } = this.props;

    console.log("IN PerfSection, Number of data for section: " + section.data.length);

    return(
      <div>
         <Typography
          className={classes.subHeading}
          variant="subtitle1"
        >
          {section.sectionName}
        </Typography>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow className={classes.tableHead}>
                {section.columns.map(function(column) {
                  return <TableCell align='left'>
                          <Typography
                            variant="subtitle2"
                        >{column}</Typography></TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {section.data.map(function(item) {
                console.log("Adding row");
                return (
                  <TableRow>
                    {section.columns.map(function(column) {
                      console.log("Adding column");
                      return <TableCell align='left'>{item[column]}</TableCell>
                    })
                    }
                  </TableRow>
                )
              })}
              <TableRow>
                <TableCell colSpan={section.columns.length}>
                  <IconButton onClick={handleAddRow.bind(this, section.sectionId)} className={classes.addButton}>
                    <AddIcon fontSize="small"/>
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

PerformanceSection.propTypes = {
  classes: PropTypes.object.isRequired,
  handleAddRow: PropTypes.func.isRequired,
  section: PropTypes.object.isRequired
};

export default withStyles(styles)(PerformanceSection);
