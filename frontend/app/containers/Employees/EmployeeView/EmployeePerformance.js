import orange from '@material-ui/core/colors/orange';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import PerformanceModule from '../../../components/PerformanceModule';
let uniqid = require('uniqid');

const styles = theme => ({
  root: {
    width: '95%',
    marginTop: theme.spacing.unit * 3,
    marginLeft: '2.5%',
    paddingBottom: '100px',
  },
  addButton: {
    display: 'inline',
    float: 'right',
    marginTop: '50px',
    marginRight: '2.5%',
    color: 'white',
    width: '150px',
    backgroundColor: '#ff6600',
    borderRadius: '15px',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#ff944d',
    },
  },
  formButtons: {
    float: 'right',
    display: 'inline',
    color: 'white',
    width: '100px',
    marginRight: '2.5%',
    backgroundColor: '#ff6600',
    borderRadius: '15px',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#ff944d',
    },
  },
  table: {
    minWidth: 800,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  tabsIndicator: {
    backgroundColor: '#ff5000',
  },
  miniTabs: {
    backgroundColor: 'white',
  },
  typography: {
    padding: theme.spacing.unit * 3,
  },
  container: {
    width: '75%',
    marginTop: '50px',
    marginLeft: '5%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  employeeName: {
    display: 'inline',
    marginTop: '30px',
    marginBottom: '30px',
  },
  topFieldContainer: {
    marginTop: '30px',
  },
  textField: {
    width: '90%',
  },
  fieldContainer: {
    width: '100%',
    marginBottom: '15px',
  },
  positionName: {
    marginTop: '30px',
  },
  formSubheading: {
    marginTop: '30px',
  },
  card: {
    width: '75%',
  },
  fab: {
    marginTop: '30px',
    marginBottom: '30px',
    marginLeft: '37.5%',
    display: 'inline',
    backgroundColor: ' #00954D',
    color: 'white',
  },
  formControl: {
    float: 'right',
    marginRight: '2.5%',
    marginBottom: '30px',
    width: '200px',
  },
  editButton: {
    marginRight: '25%',
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
  editWPButton: {
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
  docDisplay: {
    marginTop: '30px',
    marginLeft: '30px',
  },
  saveButton: {
    float: 'right',
    display: 'inline',
    color: 'white',
    height: '40px',
    width: '100px',
    marginTop: '30px',
    marginRight: '20px',
    backgroundColor: '#ff6600',
    borderRadius: '15px',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#ff944d',
    },
  },
  cancelButton: {
    float: 'right',
    display: 'inline',
    height: '40px',
    width: '100px',
    marginTop: '30px',
    marginLeft: '20px',
    borderRadius: '15px',
  },
  colorSwitchBase: {
    color: orange[300],
    '&$colorChecked': {
      color: orange[500],
      '& + $colorBar': {
        backgroundColor: orange[500],
      },
    },
  },
  colorBar: {},
  colorChecked: {},
  switch: {
    float: 'right',
    display: 'inline',
  },
  addOIButton: {
    float: 'right',
    color: 'white',
    width: '250px',
    padding: '0',
    height: '40px',
    backgroundColor: '#ff6600',
    borderRadius: '15px',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#ff944d',
    },
  },
  onBoardingHeader: {
    height: '50px',
    width: '100%',
  },
  addOIDialogField: {
    marginBottom: '30px',
  },
});

class EmployeePerformance extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {firstname: "Justin", lastname: "Case", id: "1", sin: "777 777 777", role: {name: "Developer"}, status: "Active", salary: 60000, manager: "Sarah James", type: "FT", vacation: 12, address: "Box 123", phone: "555-5555"},
      performancePlans: [
        {
          year: "2019",
          sections: [
            {
              sectionId: 1,
              sectionName: "First Section",
              columns: ["Column 1", "Column 2", "Column 3"],
              data: [
                {
                  id: uniqid(),
                  "Column 1": "Data for column 1",
                  "Column 2": "Data for column 2",
                  "Column 3": "Data for column 3"
                },
                {
                  id: uniqid(),
                  "Column 1": "2 Data for column 1",
                  "Column 2": "2 Data for column 2",
                  "Column 3": "2 Data for column 3"
                },
                {
                  id: uniqid(),
                  "Column 1": "3 Data for column 1",
                  "Column 2": "3 Data for column 2",
                  "Column 3": "3 Data for column 3"
                }
              ]
            },
            {
              sectionId: 2,
              sectionName: "Second Section",
              columns: ["Column 1", "Column 2"],
              data: [
                {
                  id: uniqid(),
                  "Column 1": "Data for column 1",
                  "Column 2": "Data for column 2"
                },
                {
                  id: uniqid(),
                  "Column 1": "2 Data for column 1",
                  "Column 2": "2 Data for column 2"
                },
                {
                  id: uniqid(),
                  "Column 1": "3 Data for column 1",
                  "Column 2": "3 Data for column 2"
                }
              ]
            },
            {
              sectionId: 3,
              sectionName: "Third Section",
              columns: ["Column 1"],
              data: [
                {
                  id: uniqid(),
                  "Column 1": "Data for column 1"
                },
                {
                  id: uniqid(),
                  "Column 1": "2 Data for column 1"
                },
                {
                  id: uniqid(),
                  "Column 1": "3 Data for column 1"
                }
              ]
            },
          ],
          performanceReview: {
            year: "2019",
            sections: [
              {
                sectionId: 1,
                sectionName: "First Section",
                columns: ["Column 1", "Column 2", "Column 3"],
                data: [
                  {
                    id: uniqid(),
                    "Column 1": "Data for column 1",
                    "Column 2": "Data for column 2",
                    "Column 3": "Data for column 3"
                  },
                  {
                    id: uniqid(),
                    "Column 1": "2 Data for column 1",
                    "Column 2": "2 Data for column 2",
                    "Column 3": "2 Data for column 3"
                  },
                  {
                    id: uniqid(),
                    "Column 1": "3 Data for column 1",
                    "Column 2": "3 Data for column 2",
                    "Column 3": "3 Data for column 3"
                  }
                ]
              },
              {
                sectionId: 2,
                sectionName: "Second Section",
                columns: ["Column 1", "Column 2"],
                data: [
                  {
                    id: uniqid(),
                    "Column 1": "Data for column 1",
                    "Column 2": "Data for column 2"
                  },
                  {
                    id: uniqid(),
                    "Column 1": "2 Data for column 1",
                    "Column 2": "2 Data for column 2"
                  },
                  {
                    id: uniqid(),
                    "Column 1": "3 Data for column 1",
                    "Column 2": "3 Data for column 2"
                  }
                ]
              },
              {
                sectionId: 3,
                sectionName: "Third Section",
                columns: ["Column 1"],
                data: [
                  {
                    id: uniqid(),
                    "Column 1": "Data for column 1"
                  },
                  {
                    id: uniqid(),
                    "Column 1": "2 Data for column 1"
                  },
                  {
                    id: uniqid(),
                    "Column 1": "3 Data for column 1"
                  }
                ]
              },
            ]
          }
        }
      ]
    };
  }

  render() {
    const { performancePlans, profile } = this.state;

    return (
      <div>
        <PerformanceModule performancePlans={performancePlans} profile={profile} />
      </div>
    );
  }
}

EmployeePerformance.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EmployeePerformance);
