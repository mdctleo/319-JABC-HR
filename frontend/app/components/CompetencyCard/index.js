/**
 *
 * CompetencyCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

const styles = theme => ({
  editButton: {
    float: 'right',
    display: 'inline',
    color: 'white',
    width: '100px',
    backgroundColor: '#ff6600',
    borderRadius: '15px',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#ff944d',
    }
  },
  container: {
    width: '95%',
    marginLeft: '2.5%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: '75%',
  },
  fieldContainer: {
    width: '100%',
    marginBottom: '15px',
  },
  positionName: {
    display: 'inline',
    marginTop: '30px',
  },
  formSubheading: {
    display: 'inline',
  },
  card: {
    width: '75%',
  },
});

class CompetencyCard extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
          <Card className={classes.card} name="competency-card">
            <CardContent>
              <TextField
                name="textField"
                label="Name"
                margin="normal"
                defaultValue=" "
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true, }}
             />
             <TextField
               name="textField"
               label="Description"
               margin="normal"
               defaultValue=" "
               variant="outlined"
               fullWidth
               multiline
               rows="4"
               InputProps={{ readOnly: true, }}
             />
         <FormControl component="fieldset">
           <Typography>Rating</Typography>
           <RadioGroup 
             aria-label="position" 
             name="position" 
             row>
           <FormControlLabel
             value="1"
             control={<Radio className={classes.radio}/>}
             label="1"
             labelPlacement="bottom"
            />
            <FormControlLabel
              value="2"
              control={<Radio className={classes.radio}/>}
              label="2"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="3"
              control={<Radio className={classes.radio}/>}
              label="3"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="4"
              control={<Radio className={classes.radio}/>}
              label="4"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="5"
              control={<Radio className={classes.radio}/>}
              label="5"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
    );
  }
}

CompetencyCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CompetencyCard);
