import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import AssignmentIcon from '@material-ui/icons/Assignment';
import Grid from "@material-ui/core/Grid/Grid";
import green from "@material-ui/core/es/colors/green";
import Avatar from "@material-ui/core/Avatar/Avatar";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: '88vh',
    overflow: 'scroll'
  },
  greenAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: green[500],
  },
});

class PerformanceSideNav extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
          <List component="nav">
            <ListItem button>
              <Avatar className={classes.greenAvatar}>
                <AssignmentIcon/>
              </Avatar>
              <ListItemText primary="2018 Performance Report"/>
            </ListItem>
            <ListItem button>
              <Avatar className={classes.greenAvatar}>
                <AssignmentIcon/>
              </Avatar>
              <ListItemText primary="2017 Performance Report"/>
            </ListItem>
            <ListItem button>
              <Avatar className={classes.greenAvatar}>
                <AssignmentIcon/>
              </Avatar>
              <ListItemText primary="2016 Performance Report"/>
            </ListItem>
            <ListItem button>
              <Avatar className={classes.greenAvatar}>
                <AssignmentIcon/>
              </Avatar>
              <ListItemText primary="2018 Performance Report"/>
            </ListItem>
            <ListItem button>
              <Avatar className={classes.greenAvatar}>
                <AssignmentIcon/>
              </Avatar>
              <ListItemText primary="2017 Performance Report"/>
            </ListItem>
            <ListItem button>
              <Avatar className={classes.greenAvatar}>
                <AssignmentIcon/>
              </Avatar>
              <ListItemText primary="2016 Performance Report"/>
            </ListItem>
            <ListItem button>
              <Avatar className={classes.greenAvatar}>
                <AssignmentIcon/>
              </Avatar>
              <ListItemText primary="2018 Performance Report"/>
            </ListItem>
            <ListItem button>
              <Avatar className={classes.greenAvatar}>
                <AssignmentIcon/>
              </Avatar>
              <ListItemText primary="2017 Performance Report"/>
            </ListItem>
            <ListItem button>
              <Avatar className={classes.greenAvatar}>
                <AssignmentIcon/>
              </Avatar>
              <ListItemText primary="2016 Performance Report"/>
            </ListItem>
            <ListItem button>
              <Avatar className={classes.greenAvatar}>
                <AssignmentIcon/>
              </Avatar>
              <ListItemText primary="2018 Performance Report"/>
            </ListItem>
            <ListItem button>
              <Avatar className={classes.greenAvatar}>
                <AssignmentIcon/>
              </Avatar>
              <ListItemText primary="2017 Performance Report"/>
            </ListItem>
            <ListItem button>
              <Avatar className={classes.greenAvatar}>
                <AssignmentIcon/>
              </Avatar>
              <ListItemText primary="2016 Performance Report"/>
            </ListItem>
          </List>
      </div>

    );
  }

}

export default withStyles(styles)(PerformanceSideNav);
