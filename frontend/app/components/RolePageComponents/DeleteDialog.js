import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class DeleteRoleDialog extends React.PureComponent {
  state = { list: [] };

  static getDerivedStateFromProps(props) {
    if (props.toBeDeleted.length > 0) {
      return { list: props.toBeDeleted };
    }
    return null;
  }

  render() {
    const { toBeDeleted, cancelDelete, confirmDelete } = this.props;
    const { list } = this.state;

    const single = list.length === 1;
    let message = '';
    if (single) {
      message = `Are you sure you want to delete this role?`;
    } else {
      message = `Are you sure you want to delete these ${list.length} roles?`;
    }
    message +=
      '\nDeleted roles will no longer be viewable in employee profiles and history.';

    return (
      <Dialog
        open={toBeDeleted.length > 0}
        onClose={cancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Deleting role
          {!single && 's'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            No
          </Button>
          <Button onClick={confirmDelete} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

DeleteRoleDialog.propTypes = {
  toBeDeleted: PropTypes.array.isRequired,
  cancelDelete: PropTypes.func.isRequired,
  confirmDelete: PropTypes.func.isRequired,
};

export default DeleteRoleDialog;
