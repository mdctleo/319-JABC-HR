/**
 *
 * ChangePasswordDialog
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography/Typography';

const styles = theme => ({
  pwd: {
    marginTop: '20px',
  },
  dialogWindow: {
    width: '80%',
  },
});

class ChangePasswordDialog extends React.PureComponent {
  state = {
    window: 0,
    password1: '',
    password2: '',
  };

  nextWindow = event => {
    this.setState({ window: 1 });
  };

  handleClose = event => {
    this.props.handleClose();
    this.setState({ window: 0 });
  };

  handleChange = name => event => {
    const { value } = event.target;
    this.setState({ [name]: value });
  };

  updatePassword = () => {
    this.props.updatePassword(this.state.password1);
    this.handleClose();
  };

  render() {
    const { window, password1, password2 } = this.state;
    const { open } = this.props;
    const verified = password1 === password2;

    return (
      <div>
        {window === 0 ? (
          <Dialog open={open} onClose={this.handleClose} fullWidth>
            <DialogTitle id="alert-dialog-title">
              {'Change password'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to change your password?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                No
              </Button>
              <Button onClick={this.nextWindow} color="primary" autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        ) : (
          <Dialog open={open} onClose={this.handleClose} fullWidth>
            <DialogTitle id="alert-dialog-title">Change password</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description1">
                New Password:
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="changePwd-dialog-pwd"
                fullWidth
                value={password1}
                onChange={this.handleChange('password1')}
                type="password"
              />
              <DialogContentText id="alert-dialog-description1">
                Confirm Password:
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="changePwd-dialog-confirm"
                fullWidth
                value={password2}
                onChange={this.handleChange('password2')}
                type="password"
              />
              {!verified && (
                <Typography
                  color="error"
                  variant="body2"
                >
                  Passwords must match
                </Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.updatePassword}
                color="primary"
                autoFocus
                disabled={!verified || password1 === ''}
              >
                OK
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    );
  }
}

ChangePasswordDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
};

export default withStyles(styles)(ChangePasswordDialog);
