import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class DeleteRoleDialog extends React.PureComponent {
  render() {
    const { toBeDeleted, cancelDelete, confirmDelete } = this.props;

    const single = toBeDeleted.length === 1;
    let message = '';
    if (single) {
      message = `Are you sure you want to delete this role?`;
    } else {
      message = `Are you sure you want to delete these ${
        toBeDeleted.length
      } roles?`;
    }

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
          <Button onClick={confirmDelete} variant="contained" color="secondary">
            Delete
          </Button>
          <Button onClick={cancelDelete} color="primary">
            Cancel
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
