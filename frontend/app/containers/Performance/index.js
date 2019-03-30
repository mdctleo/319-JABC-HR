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
  selectRole
} from './selectors';
import actions from './actions';
import connect from 'react-redux/es/connect/connect';
import reducer from './reducer';
import saga from './saga';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { selectProfile } from '../App/selectors';

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
    this.props.getAllPlans();
    this.props.getRole(this.props.profile.fkRole);
  }

  render() {
    const { planList, selectedPlan, selectedReview, profile, role } = this.props;

    return (
      <div>
        <PerformanceModule
          planList={planList}
          profile={profile}
          selectPlan={this.props.selectPlan}
          selectedPlan={selectedPlan}
          selectedReview={selectedReview}
          deleteRows={this.props.deleteRows}
          addRow={this.props.addRow}
          addSection={this.props.addSection}
          deleteSection={this.props.deleteSection}
          deletePerformance={this.props.deletePerformance}
          createPlan={this.props.createPlan}
          createReview={this.props.createReview}
          savePlan={this.props.savePlan}
          saveReview={this.props.saveReview}
          updateSection={this.props.updateSection}
          role={role}
          canEditReview={false}
          ownPage={true}
        />
      </div>
    );
  }
}

PerformancePage.propTypes = {
  planList: PropTypes.array.isRequired,
  getAllPlans: PropTypes.func.isRequired,
  profile: PropTypes.object,
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
  updateSection: PropTypes.func.isRequired,
  getRole: PropTypes.func.isRequired,
  role: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  planList: selectPlanList,
  selectedPlan: selectSelectedPlan,
  selectedReview: selectSelectedReview,
  profile: selectProfile,
  role: selectRole
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
