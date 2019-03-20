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

const styles = theme => ({
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
  }
});

class PerformanceSection extends React.PureComponent {
  render() {
    const { classes, handleAddRow, section } = this.props;

    console.log("IN PerfSection, Number of data for section: " + section.data.length);

    return(
      <div>
        <h4>{section.sectionName}</h4>
        <Button className={classes.buttonStyle} onClick={handleAddRow.bind(this, section.sectionId)}>Add Row</Button>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {section.columns.map(function(column) {
                  return <TableCell>{column}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {section.data.map(function(item) {
                return (
                  <TableRow>
                    {section.columns.map(function(column) {
                      return <TableCell>{item[column]}</TableCell>
                    })
                    }
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

PerformanceSection.propTypes = {
  classes: PropTypes.object.isRequired,
  section: PropTypes.object.isRequired
};

export default withStyles(styles)(PerformanceSection);
