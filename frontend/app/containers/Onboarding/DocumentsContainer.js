import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import UploadIcon from '@material-ui/icons/FileCopy';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';

class DocumentsContainer extends React.PureComponent {
  state = { expiry: {} };

  changeExpiry = (event, id) => {
    const { value } = event.target;
    this.setState(prevState => ({
      expiry: { ...prevState.expiry, [id]: value },
    }));
  };

  downloadTemplate = (document) => {
    window.open(document.template,'_blank')
  }

  downloadFile = (document) => {
    window.open(document.file,'_blank')
  }

  render() {
    const { expiry } = this.state;
    const { tasks, onFileLoad, onUpload } = this.props;

    const renderTasks = tasks.map((document, index) => {
      let content = null;
      if (document.status === 0) {
        if (document.requireDoc === 1) {
          content = (
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
                  onChange={e => onFileLoad(e, tasks, index)}
                  data-document-id={document.id}
                />
              </Fab>
              <TextField
                disabled
                id="standard-disabled"
                value={(document.fileData && document.fileData.name) || ''}
                margin="normal"
                style={{ width: 'calc(100% - 80px)' }}
              />
              <TextField
                value={expiry[document.id] || ''}
                placeholder="YYYY-MM-DD"
                helperText="If your document has an expiry date, enter it here"
                label="Expiry Date"
                onChange={event => this.changeExpiry(event, document.id)}
              />
            </div>
          );
        }
      }

      let buttons = null;
      if (document.requireDoc === 1) {
        if (document.status === 0) {
          buttons = (
            <React.Fragment>
              <Button
                size="small"
                color="primary"
                onClick={() => onUpload(document, expiry[document.id])}
                disabled={!document.fileData}
              >
                Submit
              </Button>
              {document.fkDocumentType && (
                <Button
                  size="small"
                  color="secondary"
                  onClick={() =>
                    this.downloadTemplate(document)
                  }
                >
                  Download template
                </Button>
              )}
            </React.Fragment>
          );
        } else {
          buttons = (
            <Button
              size="small"
              color="primary"
              onClick={() => this.downloadFile(document)}
            >
              Download
            </Button>
          );
        }
      } else if (document.status === 0) {
        buttons = (
          <Button
            size="small"
            color="primary"
            onClick={() => onUpload(document, expiry[document.id])}
          >
            Done
          </Button>
        );
      }

      return (
        <Grid key={document.id} item xs={12} sm={6}>
          <Card className="document-card">
            <CardContent>
              {document.documentType && (
                <Typography
                  className="title"
                  color="textSecondary"
                  gutterBottom
                  style={{ wordWrap: 'break-word' }}
                >
                  {document.documentType.name}
                </Typography>
              )}
              {document.documentType &&
                document.documentType.description && (
                  <Typography component="p" style={{ wordWrap: 'break-word' }}>
                    {document.documentType.description}
                  </Typography>
                )}
              {document.description && (
                <Typography component="p" style={{ wordWrap: 'break-word' }}>
                  {document.description}
                </Typography>
              )}
              {document.dueDate && (
                <Typography component="p">
                  <b>Due: </b> {document.dueDate}
                </Typography>
              )}
              {document.expiryDate && (
                <Typography component="p">
                  <b>Expires on: </b> {document.expiryDate}
                </Typography>
              )}
              {content}
            </CardContent>
            <CardActions>{buttons}</CardActions>
          </Card>
        </Grid>
      );
    });

    return (
      <Grid container spacing={16} style={{ paddingTop: 25 }}>
        {renderTasks}
      </Grid>
    );
  }
}

DocumentsContainer.propTypes = {
  tasks: PropTypes.array.isRequired,
  onFileLoad: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
  downloadTemplate: PropTypes.func.isRequired,
  downloadFile: PropTypes.func.isRequired,
};

export default DocumentsContainer;
