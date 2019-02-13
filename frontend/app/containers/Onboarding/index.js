/**
 *
 * Onboarding
 *
 */

import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
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
import CallIcon from '@material-ui/icons/Call';
import DraftIcon from '@material-ui/icons/Drafts';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import onboardingImg from 'images/onboarding.png';

/* eslint-disable react/prefer-stateless-function */
export default class Onboarding extends React.PureComponent {
  state = {
    openHelp: false,
    openFAQ: false,
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
              <Button variant="contained" color="primary"># Documents left</Button>
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
      </div>
    );
  }
}
