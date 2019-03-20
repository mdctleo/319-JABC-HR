/**
 *
 * Roles
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import actions from './actions';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import {
  selectAllRoles,
  selectSelectedRole,
  selectRoleDomainJS,
} from './selectors';
import { withStyles } from '@material-ui/core/styles';

import {
  ViewRole,
  RolesTable,
  DeleteRoleDialog,
} from 'components/RolePageComponents';

import Button from '@material-ui/core/Button';
import grey from '@material-ui/core/colors/grey';
import connect from 'react-redux/es/connect/connect';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

const styles = theme => ({
  root: {
    width: '95%',
    marginTop: theme.spacing.unit * 3,
    marginLeft: '2.5%',
    paddingBottom: '100px',
  },
  addButton: {
    float: 'right',
    display: 'inline',
    marginTop: '50px',
    marginRight: '2.5%',
    color: 'white',
    width: '125px',
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
  formButtons: {
    float: 'right',
    display: 'inline',
    color: 'white',
    width: '100px',
    marginRight: '2.5%',
    marginTop: '50px',
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
  tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 3,
  },
  container: {
    width: '95%',
    marginLeft: '2.5%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: '75%',
  },
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
  topFieldContainer: {
    width: '100%',
    marginBottom: '15px',
    marginTop: '50px',
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
  deleteIcon: {
    color: grey[300],
  },
});

class Roles extends React.Component {
  componentDidMount() {
    this.props.getAllRoles();
  }

  state = {
    toBeDeleted: [],
    tableSettings: {
      order: 'asc',
      orderBy: 'position',
      page: 0,
      rowsPerPage: 25,
      selected: [],
    },
  };

  handleBackButton = () => {
    this.props.getRole(null);
    this.props.setEditing(false);
  };

  handleAddButton = () => {
    this.props.setEditing(true);
  };

  handleEditButton = () => {
    this.props.setEditing(true);
  };

  handleDeleteButton = () => {
    this.setState(prevState => ({
      toBeDeleted: prevState.tableSettings.selected,
    }));
  };

  handleDeleteSingleButton = profile => {
    this.setState({
      toBeDeleted: [profile.id],
    });
  };

  handleSaveButton = role => {
    this.props.saveRole(role);
  };

  selectProfile = profile => {
    this.props.getRole(profile.id);
  };

  confirmDelete = () => {
    this.props.deleteRoles(this.state.toBeDeleted);
    this.setState({ toBeDeleted: [] });
  };

  render() {
    const { classes, allRoles, selectedRole, roleDomain } = this.props;
    const { editing } = roleDomain;
    const { tableSettings, toBeDeleted } = this.state;

    return (
      <div>
        <DeleteRoleDialog
          toBeDeleted={toBeDeleted}
          cancelDelete={() => this.setState({ toBeDeleted: [] })}
          confirmDelete={this.confirmDelete}
        />
        <h1>Roles</h1>
        {!selectedRole && (
          <Button className={classes.addButton} onClick={this.handleAddButton}>
            Add Role
          </Button>
        )}
        {!selectedRole && !editing ? (
          <RolesTable
            allRoles={allRoles}
            selectProfile={this.selectProfile}
            tableSettings={tableSettings}
            updateTableSettings={settings =>
              this.setState(state => ({
                tableSettings: { ...state.tableSettings, ...settings },
              }))
            }
            handleDeleteButton={this.handleDeleteButton}
            handleDeleteSingleButton={this.handleDeleteSingleButton}
          />
        ) : (
          <ViewRole
            editButtonClicked={editing}
            handleBackButton={this.handleBackButton}
            handleEditButton={this.handleEditButton}
            cancelEdit={() => this.props.setEditing(false)}
            handleSaveButton={this.handleSaveButton}
            selectedProfile={selectedRole}
          />
        )}
      </div>
    );
  }
}

Roles.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedRole: PropTypes.object,
  roleDomain: PropTypes.object,
  allRoles: PropTypes.array,
  getAllRoles: PropTypes.func,
  getRole: PropTypes.func,
  setEditing: PropTypes.func,
  saveRole: PropTypes.func,
  deleteRoles: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  allRoles: selectAllRoles,
  selectedRole: selectSelectedRole,
  roleDomain: selectRoleDomainJS,
});

const mapDispatchToProps = {
  ...actions,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'roles', reducer });
const withSaga = injectSaga({ key: 'roles', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(Roles);
