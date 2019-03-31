import Grid from '@material-ui/core/Grid/Grid';
import Card from '@material-ui/core/Card/Card';
import CardContent from '@material-ui/core/CardContent/CardContent';
import Typography from '@material-ui/core/Typography/Typography';
import Chip from '@material-ui/core/Chip/Chip';
import CardActions from '@material-ui/core/CardActions/CardActions';
import Button from '@material-ui/core/Button/Button';
import PropTypes from 'prop-types';
import React from 'react';

const DocumentsContainer = props => {
  const docs = props.documents.map(document => (
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
          <Typography component="p">
            {document.status === 0 && (
              <Chip
                label="Pending"
                color="secondary"
                style={{ marginTop: 10 }}
              />
            )}
            {document.status === 1 && (
              <Chip label="Done" color="primary" style={{ marginTop: 10 }} />
            )}
          </Typography>
        </CardContent>
        <CardActions>
          {document.requireDoc === 1 && (
            <Button
              size="small"
              color="primary"
              disabled={document.status === 0}
              onClick={() => props.downloadFile(document.id)}
            >
              Download
            </Button>
          )}
          {/* <Button size="small" color="secondary">
            Edit
          </Button> */}
        </CardActions>
      </Card>
    </Grid>
  ));

  return (
    <Grid container spacing={16} style={{ paddingTop: 25 }}>
      {docs}
    </Grid>
  );
};

DocumentsContainer.propTypes = {
  documents: PropTypes.array.isRequired,
  downloadFile: PropTypes.func.isRequired,
};

export default DocumentsContainer;
