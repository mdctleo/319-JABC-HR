/**
 *
 * Onboarding
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import UploadIcon from '@material-ui/icons/FileCopy';
import CallIcon from '@material-ui/icons/Call';
import DraftIcon from '@material-ui/icons/Drafts';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Fab from '@material-ui/core/Fab';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';

const DocumentsContainer = props => {
  const docs = props.documents.map((document, index) => (
    <Grid key={document.id} item xs={12} sm={6}>
      <Card className="document-card">
        <CardContent>
          <Typography className="title" color="textSecondary" gutterBottom style={{wordWrap: 'break-word'}}>
            {document.name}
          </Typography>
          <Typography component="p" style={{wordWrap: 'break-word'}}>{document.description}</Typography>
          <Typography component="p">
            <b>Due: </b> {document.dueDate}
          </Typography>
          {!document.done && (
            <div>
              <Fab
                color="primary"
                component="label"
                size="medium"
                style={{ marginRight: 15, marginTop: 15 }}
              >
                <UploadIcon />
                <input
                  type="file"
                  style={{ display: 'none' }}
                  onChange={e => props.onFileLoad(e, props.documents, index)}
                  data-document-id={document.id}
                />
              </Fab>
              <TextField
                disabled
                id="standard-disabled"
                value={document.fileName}
                margin="normal"
                style={{ width: 'calc(100% - 80px)' }}
              />
            </div>
          )}
        </CardContent>
        {!document.done && (
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => props.onUpload(document, index)}
            >
              Upload
            </Button>
            <Button size="small" color="secondary">
              Download template
            </Button>
          </CardActions>
        )}
        {document.done && (
          <CardActions>
            <Button size="small" color="primary">
              Download
            </Button>
          </CardActions>
        )}
      </Card>
    </Grid>
  ));
  return (
    <Grid container spacing={16} style={{ paddingTop: 25 }}>
      {docs}
    </Grid>
  );
};

DocumentsContainer.propTypes = {
  documents: PropTypes.array.isRequired,
  onFileLoad: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
};

/* eslint-disable react/prefer-stateless-function */
export default class Onboarding extends React.PureComponent {
  state = {
    tabValue: 0,
    openHelp: false,
    documentsActive: [],
    documentsDone: [],
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

  documents = [
    {
      id: 1,
      name: 'Criminal record',
      description: 'Please upload your criminal record.',
      dueDate: '20/02/2019',
      done: false,
      fileName: 'None',
    },
    {
      id: 2,
      name: 'Visa',
      description: 'Please upload your visa.',
      dueDate: '20/02/2019',
      done: false,
      fileName: 'None',
    },
    {
      id: 3,
      name: 'Insurance form',
      description: 'Please upload your insurance form.',
      dueDate: '20/02/2019',
      done: true,
      fileName: 'None',
    },
  ];

  fileLoad(e, documents, i) {
    const newDocuments = documents;
    newDocuments[i].fileName = e.target.files[0].name;
    this.setState({ documentsActive: newDocuments });
    this.forceUpdate();
  }

  componentDidMount() {
    const newDocumentsActive = this.documents.filter(
      document => !document.done,
    );
    this.setState({
      documentsActive: newDocumentsActive,
    });
    const newDocumentsDone = this.documents.filter(document => document.done);
    this.setState({
      documentsDone: newDocumentsDone,
    });
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
    return (
      <div>
        <h1>Welcome, Jane!</h1>
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
              <Tabs value={this.state.tabValue} onChange={this.handleChangeTab}>
                <Tab label={`Active (${this.state.documentsActive.length})`} />
                <Tab label={`Done (${this.state.documentsDone.length})`} />
                <Tab label="Get Help" onClick={this.handleOpenHelp} />
              </Tabs>
            </AppBar>
            {this.state.tabValue === 0 && (
              <DocumentsContainer
                documents={this.state.documentsActive}
                onFileLoad={(e, docs, i) => this.fileLoad(e, docs, i)}
                onUpload={(doc, i) => this.documentUpload(doc, i)}
              />
            )}
            {this.state.tabValue === 1 && (
              <DocumentsContainer
                documents={this.state.documentsDone}
                onFileLoad={this.fileLoad}
              />
            )}
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
Onboarding.contextTypes = {
  muiTheme: PropTypes.object,
};
