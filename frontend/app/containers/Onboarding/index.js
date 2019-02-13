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
import CardMedia from '@material-ui/core/CardMedia';
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
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Fab from '@material-ui/core/Fab';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';

import onboardingImg from 'images/onboarding.png';

const DocumentContainer = (props => {
  const docs = props.documents.map((document, index) => (
    <Grid key={document.id} item xs={12} sm={6}>
      <Card className="document-card">
        <CardContent>
          <Typography className="title" color="textSecondary" gutterBottom>
            {document.name}
          </Typography>
          <Typography component="p">{document.description}</Typography>
          {!document.done && (
            <div>
              <Fab
                color="primary"
                component="label"
                size="medium"
                style={{marginRight:15,marginTop:15}}
              >
                <UploadIcon/>
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={e => props.onFileLoad(e, props.documents, index)}
                  data-document-id={document.id}
                />
              </Fab>
              <TextField
                disabled
                id="standard-disabled"
                value={document.fileName}
                margin="normal"
                style={{width:'calc(100% - 80px)'}}
              />
            </div>
          )}
        </CardContent>
        {!document.done && (
          <CardActions>
            <Button size="small" color="primary" onClick={ e => props.onUpload(document, index)}>Upload</Button>
            <Button size="small" color="secondary">Download template</Button>
          </CardActions>
        )}
        {document.done && (
          <CardActions>
            <Button size="small" color="primary">Download</Button>
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
});

DocumentContainer.propTypes = {
  documents: PropTypes.array.isRequired,
  onFileLoad: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
};

/* eslint-disable react/prefer-stateless-function */
export default class Onboarding extends React.PureComponent {
  state = {
    tabValue: 0,
    openHelp: false,
    openFAQ: false,
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

  handleOpenFAQ = () => {
    this.setState({ openFAQ: true });
  };

  handleCloseFAQ = () => {
    this.setState({ openFAQ: false });
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

  componentDidMount(){
    const documentsActive = this.documents.filter( document => !document.done );
    this.setState({documentsActive: documentsActive});
    const documentsDone = this.documents.filter( document => document.done );
    this.setState({documentsDone: documentsDone});
  }

  documentUpload(document, i){
    const newDocument = document;
    const newDocumentsActive = this.state.documentsActive;
    const newDocumentsDone = this.state.documentsDone;
    newDocument.done = true;
    newDocumentsActive.splice(i, 1);
    newDocumentsDone.push(newDocument);

    this.setState({ documentsActive: newDocumentsActive, documentsDone: newDocumentsDone, openSnack: true });
    this.forceUpdate();
  }

  render() {
    return (
      <div id="onboarding-content">
        <Card className="onboarding-card">
          <CardMedia
            className="onboarding-img"
            image={onboardingImg}
            title="Contemplative Reptile"
          />
          <h2 className="onboarding-header">Welcome, John!</h2>
          <Grid container spacing={0}>
            <Grid item xs={6} className="onboarding-option">
              <Button variant="contained" color="primary">{this.state.documentsActive.length} Documents left</Button>
            </Grid>
            <Grid item xs={3} className="onboarding-option faq">
              <Button variant="contained" className="tertiary" onClick={this.handleOpenFAQ}>FAQ</Button>
              <Modal
                aria-labelledby="onboarding-modal-title"
                aria-describedby="onboarding-modal-description"
                open={this.state.openFAQ}
                onClose={this.handleCloseFAQ}
              >
                <div className="onboarding-modal">
                  <Typography variant="h5">Frequently Asked Questions</Typography>
                  <div className="faq-section">
                    <ExpansionPanel>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className="faq-question">How to fill the required documents?</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Typography>
                          On the document section in the onboarding page, you will find the necessary templates that you need download and fill out on Word.
                        </Typography>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className="faq-question">How to upload the required documents?</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Typography>
                          After filling out your required documents, just upload them.
                        </Typography>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </div>
                </div>
              </Modal>
            </Grid>
            <Grid item xs={3} className="onboarding-option help">
              <Button variant="contained" color="secondary" onClick={this.handleOpenHelp}>Get help</Button>
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
                      subheader={<ListSubheader component="div">Contact us </ListSubheader>}
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
            </Grid>
          </Grid>
        </Card>
        <div className="documents">
          <AppBar position="static">
            <Tabs value={this.state.tabValue} onChange={this.handleChangeTab}>
              <Tab label={`Active (${this.state.documentsActive.length})`} />
              <Tab label={`Done (${this.state.documentsDone.length})`} />
            </Tabs>
          </AppBar>
          {this.state.tabValue === 0 && <DocumentContainer documents={this.state.documentsActive} onFileLoad={ (e,docs,i) => this.fileLoad(e,docs,i)} onUpload={ (doc,i) => this.documentUpload(doc,i)}></DocumentContainer>}
          {this.state.tabValue === 1 && <DocumentContainer documents={this.state.documentsDone} onFileLoad={this.fileLoad}></DocumentContainer>}
        </div>
        <Snackbar
          open={this.state.openSnack}
          autoHideDuration={3000}
          onClose={()=>this.setState({ openSnack: false })}
          ContentProps={{
            'aria-describedby': 'snackbar-fab-message-id',
            className:"success-snack",
          }}
          message={<span id="snackbar-fab-message-id">Document completed</span>}
        />
      </div>
    );
  }
}
Onboarding.contextTypes = {
  muiTheme: PropTypes.object,
};