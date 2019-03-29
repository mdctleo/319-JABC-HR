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

  render() {
    const { expiry } = this.state;
    const { documents, onFileLoad, onUpload } = this.props;

    const docs = documents.map((document, index) => {
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
                  onChange={e => onFileLoad(e, documents, index)}
                  data-document-id={document.id}
                />
              </Fab>
              <TextField
                disabled
                id="standard-disabled"
                value={document.fileName}
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
                onClick={() => onUpload(document, index)}
              >
                Submit
              </Button>
              <Button size="small" color="secondary">
                Download template
              </Button>
            </React.Fragment>
          );
        } else {
          buttons = (
            <Button size="small" color="primary">
              Download
            </Button>
          );
        }
      } else if (document.status === 0) {
        buttons = (
          <Button size="small" color="primary">
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
              {content}
            </CardContent>
            <CardActions>{buttons}</CardActions>
          </Card>
        </Grid>
      );
    });

    return (
      <Grid container spacing={16} style={{ paddingTop: 25 }}>
        {docs}
      </Grid>
    );
  }
}

DocumentsContainer.propTypes = {
  documents: PropTypes.array.isRequired,
  onFileLoad: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
};

export default DocumentsContainer;
