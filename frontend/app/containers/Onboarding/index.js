/**
 *
 * Onboarding
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { selectPendingTasks, selectDoneTasks } from './selectors';
import { selectProfile } from '../App/selectors';
import reducer from './reducer';
import saga from './saga';
import Modal from '@material-ui/core/Modal/Modal';
import Typography from '@material-ui/core/Typography/Typography';
import List from '@material-ui/core/List/List';
import ListSubheader from '@material-ui/core/ListSubheader/ListSubheader';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import DraftIcon from '@material-ui/icons/Drafts';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Tabs from '@material-ui/core/Tabs/Tabs';
import Tab from '@material-ui/core/Tab/Tab';
import DocumentsContainer from './DocumentsContainer';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import CallIcon from '@material-ui/icons/Call';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';

import actions from './actions';
import PropTypes from 'prop-types';

/* eslint-disable react/prefer-stateless-function */
export class Onboarding extends React.PureComponent {
  state = {
    tabValue: 0,
    openHelp: false,
    openSnack: false,
  };

  handleOpenHelp = () => {
    this.setState({ openHelp: true });
  };

  handleCloseHelp = () => {
    this.setState({ openHelp: false });
  };

  handleChangeTab = (event, value) => {
    this.setState({ tabValue: value });
  };

  fileLoad(e, documents, i) {
    const newDocuments = documents;
    newDocuments[i].fileData = e.target.files[0];
    this.setState({ documentsActive: newDocuments });
    this.forceUpdate();
  };

  componentDidMount() {
    this.props.getTasks();
  }

  documentUpload(document, i) {
    this.setState(prevState => {
      const newDocument = document;
      const newDocumentsActive = prevState.documentsActive;
      const newDocumentsDone = prevState.documentsDone;
      newDocument.done = true;
      newDocumentsActive.splice(i, 1);
      newDocumentsDone.push(newDocument);
      return {
        documentsActive: newDocumentsActive,
        documentsDone: newDocumentsDone,
        openSnack: true,
      };
    });
    this.forceUpdate();
  }

  render() {
    const { pendingTasks, doneTasks } = this.props;

    return (
      <div>
        <h1>Welcome, {this.props.user && this.props.user.firstname}!</h1>
        <div className="onboarding-content">
          <Modal
            aria-labelledby="onboarding-modal-title"
            aria-describedby="onboarding-modal-description"
            open={this.state.openHelp}
            onClose={this.handleCloseHelp}
          >
            <div className="onboarding-modal">
              <Typography variant="h5">Questions or Problems?</Typography>
              <Typography variant="subtitle1">
                <List
                  component="nav"
                  subheader={
                    <ListSubheader component="div">Contact us </ListSubheader>
                  }
                >
                  <ListItem>
                    <ListItemIcon>
                      <DraftIcon />
                    </ListItemIcon>
                    <a href="mailto:help@jabc.com">help@jabc.com</a>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CallIcon />
                    </ListItemIcon>
                    <a href="tel:7771234567">7771234567</a>
                  </ListItem>
                </List>
              </Typography>
            </div>
          </Modal>
          <div className="documents">
            <AppBar position="static">
              <Toolbar style={{ minHeight: 0 }}>
                <Tabs
                  value={this.state.tabValue}
                  onChange={this.handleChangeTab}
                >
                  <Tab label={`Active (${pendingTasks.length})`} />
                  <Tab label={`Done (${doneTasks.length})`} />
                </Tabs>
                <Button color="inherit" onClick={this.handleOpenHelp}>
                  Get Help
                </Button>
              </Toolbar>
            </AppBar>
            <DocumentsContainer
              documents={this.state.tabValue === 0 ? pendingTasks : doneTasks}
              onFileLoad={(e, documents, i) => this.fileLoad(e, documents, i)}
              onUpload={this.props.uploadDocument}
              downloadTemplate={this.props.downloadTemplate}
              downloadFile={this.props.downloadFile}
            />
          </div>
          <Snackbar
            open={this.state.openSnack}
            autoHideDuration={3000}
            onClose={() => this.setState({ openSnack: false })}
            ContentProps={{
              'aria-describedby': 'snackbar-fab-message-id',
              className: 'success-snack',
            }}
            message={
              <span id="snackbar-fab-message-id">Document completed</span>
            }
          />
        </div>
      </div>
    );
  }
}

Onboarding.propTypes = {
  user: PropTypes.object,
  getTasks: PropTypes.func.isRequired,
  pendingTasks: PropTypes.array.isRequired,
  doneTasks: PropTypes.array.isRequired,
  uploadDocument: PropTypes.func.isRequired,
  downloadTemplate: PropTypes.func.isRequired,
  downloadFile: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: selectProfile,
  pendingTasks: selectPendingTasks,
  doneTasks: selectDoneTasks,
});

const mapDispatchToProps = {
  ...actions,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'onboarding', reducer });
const withSaga = injectSaga({ key: 'onboarding', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Onboarding);
