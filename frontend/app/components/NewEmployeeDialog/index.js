/**
 *
 * NewEmployeeDialog
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

const styles = theme => ({
    pwd: {
        marginTop: '20px',
    }
});

class NewEmployeeDialog extends React.PureComponent {
  state = {
    newPwd: this.generateRandomPassword(),
  };

  generateRandomPassword() {
    // set profile's password to this random string
    var newPassword = Math.random().toString(36).slice(-8);
    return newPassword;
  }

  handleClose = event => {
    this.props.handleClose();
  }

  render() {
    const { window, newPwd } = this.state;
    const { classes, profile, open } = this.props;

    return (
        <div>
         <Dialog
            open={open}
            onClose={this.handleClose}
            >
            <DialogTitle id="alert-dialog-title">Employee password</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description1">
                  This employee has been given the temporary password below: 
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
            </Dialog>
        </div>
    );
  }
}

NewEmployeeDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(NewEmployeeDialog);
