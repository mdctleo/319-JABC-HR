/**
 *
 * LoginForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import logo from '../Header/images/jabc-wide-logo.png';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -35,
    marginLeft: -12,
  },
  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
  },
});

class LoginForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();
    this.props.login();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.main}>
        <Paper className={classes.paper}>
          <img src={logo} id="jabc-logo-login" />
          <form className={classes.form} onSubmit={this.submit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                value={this.props.email}
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={this.props.changeText}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={this.props.password}
                onChange={this.props.changeText}
              />
            </FormControl>
            {this.props.errorMessage && (
              <Typography className={classes.errorMessage} variant="body2">
                {this.props.errorMessage}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={this.props.loggingIn}
            >
              Log in
            </Button>
            {this.props.loggingIn && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </form>
        </Paper>
      </div>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  changeText: PropTypes.func.isRequired,
  email: PropTypes.string,
  password: PropTypes.string,
  login: PropTypes.func.isRequired,
  loggingIn: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default withStyles(styles)(LoginForm);
