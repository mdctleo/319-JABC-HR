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

class PerformanceComment extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    const {classes} = this.props;
    return (
      <div>
        <Avatar alt="Remy Sharp"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Gregor_Kiczales_AOSD.jpg/220px-Gregor_Kiczales_AOSD.jpg"
                className={classes.bigAvatar}/>
        <TextField
          className={classes.textField}
          defaultValue="Hello World"
          label={"Gregor"}
          value={this.props.comment}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          multiline={true}
          rowsMax={3}
          variant="outlined"
        />
      </div>
    );
  }

}

PerformanceComment.propTypes = {
  classes: PropTypes.object.isRequired,
  comment: PropTypes.string,
  picPath: PropTypes.string
};
//

export default withStyles(styles)(PerformanceComment);

