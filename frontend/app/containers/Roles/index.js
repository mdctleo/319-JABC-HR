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
import { selectAllRoles, selectSelectedRole, selectRoleDomainJS } from './selectors';
import { withStyles } from '@material-ui/core/styles';

import { ViewRole, RolesTable } from 'components/RolePageComponents';

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
    editButtonClicked: false,
    tableSettings: {
      order: 'asc',
      orderBy: 'position',
      page: 0,
      rowsPerPage: 25,
      selected: [],
    },
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleBackButton = () => {
    this.props.getRole(null);
    this.props.setEditing(false);
  };

  handleAddButton = () => {
    this.setState({ displayedPage: 'add' });
    this.props.setEditing(true);
  };

  handleEditButton = () => {
    this.props.setEditing(true);
  };

  handleDeleteButton = () => {
    const profiles = this.state.selected;
    this.state.data.filter(n => !profiles.includes(n.id));
  };

  handleDeleteSingleButton = (event, profile) => {
    const data = this.state.data;
    this.setState({ data: data.filter(n => n.id != profile.id) });
  };

  handleSaveButton = () => {
    const id = this.state.selectedProfile.id;
    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].id == id) {
        this.state.data[i].description = document.getElementById(
          'rf-description',
        ).value;
        this.state.data[i].name = document.getElementById('rf-name').value;
        const competencies = [];
        const foundCompetencyCells = document.getElementsByClassName('rf-rows');
        for (var i = 0; i < foundCompetencyCells.length; i++) {
          const input = foundCompetencyCells[i].firstChild.firstChild;
          if (i % 3 == 0) {
            input.value
              ? competencies.push({ name: input.value })
              : competencies.push({ name: input.defaultValue });
          } else if (i % 3 == 1) {
            competencies[Math.floor(i / 3)].description = input.value
              ? input.value
              : input.defaultValue;
          } else {
            competencies[Math.floor(i / 3)].rating = input.value
              ? input.value
              : input.defaultValue;
          }
        }
        this.state.data[i].competencies = competencies;
      }
    }
    this.setState({ value: 1 });
    this.setState({ displayedPage: 'table' });
    this.props.setEditing(false);
  };

  handleSubmitButton = (event, value) => {
    const id = this.state.selectedProfile.id;
    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].id == id) {
        this.state.data[i].description = document.getElementById(
          'rf-description',
        ).value;
        this.state.data[i].name = document.getElementById('rf-name').value;
        const competencies = [];
        const foundCompetencyCells = document.getElementsByClassName('rf-rows');
        for (var i = 0; i < foundCompetencyCells.length; i++) {
          const input = foundCompetencyCells[i].firstChild.firstChild;
          console.log('made it into inner loop');
          if (i % 3 == 0) {
            input.value
              ? competencies.push({ name: input.value })
              : competencies.push({ name: input.defaultValue });
          } else if (i % 3 == 1) {
            competencies[Math.floor(i / 3)].description = input.value
              ? input.value
              : input.defaultValue;
          } else {
            competencies[Math.floor(i / 3)].rating = input.value
              ? input.value
              : input.defaultValue;
          }
        }
        this.state.data[i].competencies = competencies;
      }
    }
    this.setState({ value: 1 });
    this.setState({ displayedPage: 'table' });
    this.props.setEditing(false);
  };

  handleAddSubmitButton = (event, value) => {
    const description = document.getElementById('rf-description').value;
    const name = document.getElementById('rf-name').value;
    const competencies = [];
    const foundCompetencyCells = document.getElementsByClassName('rf-rows');
    for (let i = 0; i < foundCompetencyCells.length; i++) {
      const input = foundCompetencyCells[i].firstChild.firstChild;
      if (i % 3 == 0) {
        input.value
          ? competencies.push({ name: input.value })
          : competencies.push({ name: input.defaultValue });
      } else if (i % 3 == 1) {
        competencies[Math.floor(i / 3)].description = input.value
          ? input.value
          : input.defaultValue;
      } else {
        competencies[Math.floor(i / 3)].rating = input.value
          ? input.value
          : input.defaultValue;
      }
    }
    const data = this.state.data;
    this.setState({
      data: data.concat(createData(name, description, competencies)),
    });
    this.setState({ value: 1 });
    this.props.setEditing(false);
  };

  handleAddSaveButton = (event, value) => {
    const description = document.getElementById('rf-description').value;
    const name = document.getElementById('rf-name').value;
    const competencies = [];
    const foundCompetencyCells = document.getElementsByClassName('rf-rows');
    for (let i = 0; i < foundCompetencyCells.length; i++) {
      const input = foundCompetencyCells[i].firstChild.firstChild;
      if (i % 3 == 0) {
        input.value
          ? competencies.push({ name: input.value })
          : competencies.push({ name: input.defaultValue });
      } else if (i % 3 == 1) {
        competencies[Math.floor(i / 3)].description = input.value
          ? input.value
          : input.defaultValue;
      } else {
        competencies[Math.floor(i / 3)].rating = input.value
          ? input.value
          : input.defaultValue;
      }
    }
    const data = this.state.data;
    this.setState({
      data: data.concat(createData(name, description, competencies)),
    });
    this.setState({ value: 1 });
    this.props.setEditing(false);
  };

  selectProfile = profile => {
    this.props.getRole(profile.id);
  };

  render() {
    const { classes, allRoles, selectedRole, roleDomain } = this.props;
    const { editing } = roleDomain;
    const { tableSettings } = this.state;

    return (
      <div>
        <h1>Roles</h1>
        <Button className={classes.addButton} onClick={this.handleAddButton}>
          Add Role
        </Button>
        {!selectedRole ? (
          <RolesTable
            allRoles={allRoles}
            selectProfile={this.selectProfile}
            tableSettings={tableSettings}
            updateTableSettings={settings =>
              this.setState(state => ({
                tableSettings: { ...state.tableSettings, ...settings },
              }))
            }
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
