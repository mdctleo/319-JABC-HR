import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class PerformanceSection extends React.PureComponent {
  render() {
    let section = this.props.section;

    // return(
    //   <div>
    //     <h4>{section.sectionName}</h4>
    //     <table>
    //       <tbody>
    //         <tr>
    //           {section.columns.map(function(column) {
    //             return <td>{column}</td>
    //           })}
    //         </tr>
    //         {section.data.map(function(item) {
    //           return (
    //             <tr>
    //               {section.columns.map(function(column) {
    //                   return <td>{item[column]}</td>
    //                 })
    //               }
    //             </tr>
    //           )
    //         })}
    //         </tbody>
    //     </table>
    //   </div>
    // );

    let classes = this.props.classes;

    return(
      <div>
        <h4>{section.sectionName}</h4>
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

export default PerformanceSection;
