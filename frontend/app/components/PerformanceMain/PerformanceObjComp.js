import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import PerformanceComment from "./PerformanceComment";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 5,
    marginBottom: '20px'
  },
  rating: {
    float: 'right;'
  },
  description: {
    marginTop: '5px'
  },
});

class PerformanceObjComp extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    const {classes} = this.props;
    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <Grid container spacing={24}>
            <Grid item xs={12} md={9}>
              <Typography variant="h5">
                {this.props.type}
              </Typography>
              <Typography variant="h7" className={classes.description}>
                {this.props.description}
              </Typography>
              <PerformanceComment
              comment={this.props.comment}
              path={"test"}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" className={classes.rating}>
                {this.props.rating}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }

}

PerformanceObjComp.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.string,
  description: PropTypes.string,
  comment: PropTypes.string,
  rating: PropTypes.string
};

export default withStyles(styles)(PerformanceObjComp);
