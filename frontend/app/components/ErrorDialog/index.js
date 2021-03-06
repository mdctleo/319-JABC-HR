import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class ErrorDialog extends React.PureComponent {
  state = {};

  static getDerivedStateFromProps(props) {
    if (props.message !== '') {
      return { m: props.message };
    }
    return null;
  }

  render() {
    const { message, clearError } = this.props;
    const { m } = this.state;
    return (
      <Dialog
        open={message !== ''}
        onClose={clearError}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Error</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {m}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={clearError} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ErrorDialog.propTypes = {
  message: PropTypes.string,
  clearError: PropTypes.func.isRequired,
};

export default ErrorDialog;
