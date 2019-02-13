import React from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/es/styles/withStyles";
import TextField from '@material-ui/core/TextField';
import Avatar from "@material-ui/core/Avatar/Avatar";
import Grid from "@material-ui/core/Grid/Grid";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 5,
  },
  bigAvatar: {
    margin: "10px 10px 0px 0px",
    width: 60,
    height: 60,
    float: 'left'
  },
  textField: {
    width: '80%'
  }
});

class PerformanceCommentPrompt extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    const {classes} = this.props;
    return (
      <div>
        <Avatar alt="Remy Sharp"
                src="https://pbs.twimg.com/profile_images/1016349674675015680/U_Xb558c_400x400.jpg"
                className={classes.bigAvatar}/>
        <TextField
          className={classes.textField}
          margin="normal"
          placeholder={"Press Enter to comment...."}
          multiline={true}
          rowsMax={3}
          variant="outlined"
        />
      </div>
    );
  }

}

PerformanceCommentPrompt.propTypes = {
  classes: PropTypes.object.isRequired,
  picPath: PropTypes.string
};
//

export default withStyles(styles)(PerformanceCommentPrompt);

