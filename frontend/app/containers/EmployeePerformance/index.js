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
import {
  selectPlanList,
  selectSelectedPlan,
  selectSelectedReview,
  selectRole,
} from './selectors';
import { selectProfile } from '../App/selectors';
import actions from './actions';
import connect from 'react-redux/es/connect/connect';
import reducer from './reducer';
import saga from './saga';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

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
  componentDidMount() {
    const { reset, getAllPlans, getRole, selectedEmployee } = this.props;
    reset();
    getAllPlans(selectedEmployee);
    if (selectedEmployee.fkRole) {
      getRole(selectedEmployee);
    }
  }

  render() {
    const {
      planList,
      selectedPlan,
      selectedReview,
      selectedEmployee,
      role,
      currentUser,
    } = this.props;

    return (
      <div>
        <PerformanceModule
          planList={planList}
          profile={selectedEmployee}
          selectPlan={this.props.selectPlan}
          selectedPlan={selectedPlan}
          selectedReview={selectedReview}
          deleteRows={this.props.deleteRows}
          addRow={this.props.addRow}
          addSection={this.props.addSection}
          deleteSection={this.props.deleteSection}
          updateSection={this.props.updateSection}
          deletePerformance={isPlan => this.props.deletePerformance(isPlan, selectedEmployee)}
          createPlan={plan => this.props.createPlan(plan, selectedEmployee)}
          createReview={review =>
            this.props.createReview(review, selectedEmployee)
          }
          savePlan={this.props.savePlan}
          saveReview={this.props.saveReview}
          role={role}
          canEditReview={currentUser.id !== selectedEmployee.id || currentUser.adminLevel >= 2}
          ownPage={currentUser.id === selectedEmployee.id}
          currentUserAdminLevel={currentUser.adminLevel}
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
  selectedReview: PropTypes.object,
  deleteRows: PropTypes.func.isRequired,
  addRow: PropTypes.func.isRequired,
  addSection: PropTypes.func.isRequired,
  deleteSection: PropTypes.func.isRequired,
  deletePerformance: PropTypes.func.isRequired,
  createPlan: PropTypes.func.isRequired,
  createReview: PropTypes.func.isRequired,
  savePlan: PropTypes.func.isRequired,
  saveReview: PropTypes.func.isRequired,
  selectedEmployee: PropTypes.object.isRequired,
  reset: PropTypes.func.isRequired,
  updateSection: PropTypes.func.isRequired,
  role: PropTypes.object,
  getRole: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  planList: selectPlanList,
  selectedPlan: selectSelectedPlan,
  selectedReview: selectSelectedReview,
  role: selectRole,
  currentUser: selectProfile,
});

const mapDispatchToProps = {
  ...actions,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'employeePerformance', reducer });
const withSaga = injectSaga({ key: 'employeePerformance', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(PerformancePage);
