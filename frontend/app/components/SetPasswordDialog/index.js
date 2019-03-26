/**
 *
 * ResetPasswordDialog
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
const generator = require('generate-password');

const styles = theme => ({
    pwd: {
        marginTop: '20px',
    }
});

class SetPasswordDialog extends React.PureComponent {
  state = {
    window: 0,
    newPwd: this.generateRandomPassword(),
  };

  nextWindow = event => {
      this.setState({ window: 1 });
  }

  generateRandomPassword() {
    return generator.generate({
      length: 10,
      numbers: true,
      symbols: true,
      strict: true,
    });
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
            >
            <DialogTitle id="alert-dialog-title">{"Reset password"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                Are you sure you want to reset this employee's password? Once you have done this, you can not undo it.
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
            >
            <DialogTitle id="alert-dialog-title">Reset password</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description1">
                  This employee's password has been changed to:
                </DialogContentText>
                <DialogContentText className={classes.pwd} id="alert-dialog-pwd">
                {newPwd}
                </DialogContentText>
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

SetPasswordDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(SetPasswordDialog);
