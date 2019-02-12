import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Input from "@material-ui/core/Input/Input";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  objective: {
    color: '#FF5000'
  },
  competency: {
    color: '#00954D'
  }
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
          <Typography variant="h5" component="h3" className={classes.objective}>
            {this.props.type}
          </Typography>
          <Typography component="p">
            {this.props.description}
          </Typography>
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
  rating: PropTypes.number
};

export default withStyles(styles)(PerformanceObjComp);
