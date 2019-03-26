/**
 *
 * Performance
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import PerformanceModule from '../../components/PerformanceModule';
import { createStructuredSelector } from 'reselect';
import { selectPlanList, selectSelectedPlan } from './selectors';
import actions from './actions';
import connect from 'react-redux/es/connect/connect';
import reducer from './reducer';
import saga from './saga';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
const uniqid = require('uniqid');

const styles = theme => ({
  root: {
    width: '95%',
    marginTop: theme.spacing.unit * 3,
    marginLeft: '2.5%',
    paddingBottom: '100px',
  },
  sectionButton: {
    display: 'block',
    color: 'white',
    width: '150px',
    margin: 'auto',
    marginTop: '20px',
    backgroundColor: '#ff6600',
    borderRadius: '15px',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#ff944d',
    },
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
  deleteWPButton: {
    float: 'right',
    display: 'inline',
    color: 'black',
    width: '150px',
    marginLeft: '15px',
    backgroundColor: '#e5e5e5',
    borderRadius: '15px',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#efefef',
    },
  },
  saveButton: {
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
  tableWrapper: {
    overflowX: 'auto',
  },
  tabsIndicator: {
    display: 'inline-block',
    backgroundColor: '#ff5000',
  },
  container: {
    width: '95%',
    marginLeft: '2.5%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    float: 'right',
    marginTop: '50px',
    marginRight: '2.5%',
    width: '200px',
  },
  appBar: {
    width: '100%',
  },
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
    },
  },
  formButton: {
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
  addDocButton: {
    display: 'inline',
    color: 'white',
    height: '40px',
    width: '200px',
    marginTop: '30px',
    marginRight: '20px',
    backgroundColor: '#ff6600',
    borderRadius: '15px',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#ff944d',
    },
  },
  addColButton: {
    float: 'left',
    display: 'inline',
    color: 'black',
    width: '150px',
    marginTop: '15px',
    backgroundColor: '#e5e5e5',
    borderRadius: '15px',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#fefefe',
    },
  },
});

class PerformancePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {
        firstname: 'Justin',
        lastname: 'Case',
        id: '1',
        sin: '777 777 777',
        role: { name: 'Developer' },
        status: 'Active',
        salary: 60000,
        manager: 'Sarah James',
        type: 'FT',
        vacation: 12,
        address: 'Box 123',
        phone: '555-5555',
      },
      performancePlans: [
        {
          year: '2019',
          sections: [
            {
              sectionId: 1,
              sectionName: 'First Section',
              columns: ['Column 1', 'Column 2', 'Column 3'],
              data: [
                {
                  id: uniqid(),
                  'Column 1': 'Data for column 1',
                  'Column 2': 'Data for column 2',
                  'Column 3': 'Data for column 3',
                },
                {
                  id: uniqid(),
                  'Column 1': '2 Data for column 1',
                  'Column 2': '2 Data for column 2',
                  'Column 3': '2 Data for column 3',
                },
                {
                  id: uniqid(),
                  'Column 1': '3 Data for column 1',
                  'Column 2': '3 Data for column 2',
                  'Column 3': '3 Data for column 3',
                },
              ],
            },
            {
              sectionId: 2,
              sectionName: 'Second Section',
              columns: ['Column 1', 'Column 2'],
              data: [
                {
                  id: uniqid(),
                  'Column 1': 'Data for column 1',
                  'Column 2': 'Data for column 2',
                },
                {
                  id: uniqid(),
                  'Column 1': '2 Data for column 1',
                  'Column 2': '2 Data for column 2',
                },
                {
                  id: uniqid(),
                  'Column 1': '3 Data for column 1',
                  'Column 2': '3 Data for column 2',
                },
              ],
            },
            {
              sectionId: 3,
              sectionName: 'Third Section',
              columns: ['Column 1'],
              data: [
                {
                  id: uniqid(),
                  'Column 1': 'Data for column 1',
                },
                {
                  id: uniqid(),
                  'Column 1': '2 Data for column 1',
                },
                {
                  id: uniqid(),
                  'Column 1': '3 Data for column 1',
                },
              ],
            },
          ],
          performanceReview: {
            year: '2019',
            sections: [
              {
                sectionId: 1,
                sectionName: 'First Section',
                columns: ['Column 1', 'Column 2', 'Column 3'],
                data: [
                  {
                    id: uniqid(),
                    'Column 1': 'Data for column 1',
                    'Column 2': 'Data for column 2',
                    'Column 3': 'Data for column 3',
                  },
                  {
                    id: uniqid(),
                    'Column 1': '2 Data for column 1',
                    'Column 2': '2 Data for column 2',
                    'Column 3': '2 Data for column 3',
                  },
                  {
                    id: uniqid(),
                    'Column 1': '3 Data for column 1',
                    'Column 2': '3 Data for column 2',
                    'Column 3': '3 Data for column 3',
                  },
                ],
              },
              {
                sectionId: 2,
                sectionName: 'Second Section',
                columns: ['Column 1', 'Column 2'],
                data: [
                  {
                    id: uniqid(),
                    'Column 1': 'Data for column 1',
                    'Column 2': 'Data for column 2',
                  },
                  {
                    id: uniqid(),
                    'Column 1': '2 Data for column 1',
                    'Column 2': '2 Data for column 2',
                  },
                  {
                    id: uniqid(),
                    'Column 1': '3 Data for column 1',
                    'Column 2': '3 Data for column 2',
                  },
                ],
              },
              {
                sectionId: 3,
                sectionName: 'Third Section',
                columns: ['Column 1'],
                data: [
                  {
                    id: uniqid(),
                    'Column 1': 'Data for column 1',
                  },
                  {
                    id: uniqid(),
                    'Column 1': '2 Data for column 1',
                  },
                  {
                    id: uniqid(),
                    'Column 1': '3 Data for column 1',
                  },
                ],
              },
            ],
          },
        },
      ],
    };
  }

  componentDidMount() {
    this.props.getAllPlans();
  }

  selectYear = event => {
    if (event.target.value === 0) {
      this.openNewPlanDialog();
    } else {
      this.props.selectPlan(event.target.value);
    }
  };

  render() {
    const { performancePlans, profile } = this.state;
    const { planList, selectedPlan } = this.props;

    return (
      <div>
        <PerformanceModule
          planList={planList}
          performancePlans={performancePlans}
          profile={profile}
          selectYear={this.selectYear}
          selectedPlan={selectedPlan}
          deleteRows={this.props.deleteRows}
          addRow={this.props.addRow}
          addSection={this.props.addSection}
          deleteSection={this.props.deleteSection}
        />
      </div>
    );
  }
}

PerformancePage.propTypes = {
  planList: PropTypes.array.isRequired,
  getAllPlans: PropTypes.func.isRequired,
  selectPlan: PropTypes.func.isRequired,
  selectedPlan: PropTypes.object,
  deleteRows: PropTypes.func.isRequired,
  addRow: PropTypes.func.isRequired,
  addSection: PropTypes.func.isRequired,
  deleteSection: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  planList: selectPlanList,
  selectedPlan: selectSelectedPlan,
});

const mapDispatchToProps = {
  ...actions,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'performance', reducer });
const withSaga = injectSaga({ key: 'performance', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(PerformancePage);
