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
  const docs = props.documents.map((document) => (
    <Grid key={document.id} item xs={12} sm={6}>
      <Card className="document-card">
        <CardContent>
          <Typography className="title" color="textSecondary" gutterBottom style={{ wordWrap: 'break-word'}}>
            {document.name}
          </Typography>
          <Typography component="p" style={{ wordWrap: 'break-word'}}>{document.description}</Typography>
          <Typography component="p">
            <b>Due: </b> {document.dueDate}
          </Typography>
          <Typography component="p">
            {!document.done && (
              <Chip
                label="Pending"
                color="secondary"
                style={{ marginTop: 10 }}
              />
            )}
            {document.done && (
              <Chip label="Done" color="primary" style={{ marginTop: 10 }} />
            )}
          </Typography>
        </CardContent>
        <CardActions>
          {document.done && (
            <Button size="small" color="primary">
              Download
            </Button>
          )}
          {!document.done && (
            <Button size="small" color="primary" disabled>
              Download
            </Button>
          )}
          <Button size="small" color="secondary">
            Edit
          </Button>
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
};

export default DocumentsContainer;
