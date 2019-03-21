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

const styles = theme => ({
    pwd: {
        marginTop: '20px',
    },
    dialogWindow: {
        width: '80%',
    }
});

class ChangePasswordDialog extends React.PureComponent {
  state = {
    window: 0,
    newPwd: this.generateRandomPassword(),
  };

  nextWindow = event => {
      this.setState({ window: 1 });
  }

  generateRandomPassword() {
    // set profile's password to this random string
    var newPassword = Math.random().toString(36).slice(-8);
    return newPassword;
  }

  handleClose = event => {
    this.props.handleClose();
    this.setState({ window: 0 });
  }

  render() {
    const { window, newPwd } = this.state;
    const { classes, profile, open } = this.props;

    return (
        <div>
        { window == 0 ?
            (<Dialog
            open={open}
            onClose={this.handleClose}
            fullWidth
            >
            <DialogTitle id="alert-dialog-title">{"Change password"}</DialogTitle>
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
            </Dialog>) : 
            (<Dialog
            open={open}
            onClose={this.handleClose}
            fullWidth
            >
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
                />
                <DialogContentText id="alert-dialog-description1">
                  Confirm Password:
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="changePwd-dialog-confirm"
                  fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose} color="primary" autoFocus>
                OK
                </Button>
            </DialogActions>
            </Dialog>)
        }
        </div>
    );
  }
}

ChangePasswordDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(ChangePasswordDialog);
