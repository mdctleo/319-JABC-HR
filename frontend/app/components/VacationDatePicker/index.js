import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  formButton: {
    display: 'inline',
    color: 'white',
    height: '40px',
    width: '100px',
    marginTop: '30px',
    backgroundColor: '#ff6600',
    borderRadius: '15px',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#ff944d',
    },
  }
});

class VacationDatePickers extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  handleSave = () => {
    // do something here
  };

  render() {
    const {classes} = this.props;

    return (
      <form className={classes.container} noValidate>
        <Grid container spacing={24}>
          <Grid item sm={12}>
            <TextField
              id="endDate"
              label="Start Date"
              type="date"
              defaultValue="2017-05-24"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="startDate"
              label="End Date"
              type="date"
              defaultValue="2017-05-24"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item sm={12}>
            <Button className={classes.formButton} onClick={this.handleSave}>
              Request
            </Button>
          </Grid>
        </Grid>

      </form>
    );
  }
}

VacationDatePickers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VacationDatePickers);
