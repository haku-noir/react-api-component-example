import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { TweetState } from 'reducers/entitiesReducer';

type IProps = {
  send: (newTweet: TweetState) => void
};

const useStyles = makeStyles(() => ({
  root: {
    width: 1000,
    display: 'flex',
    flexGrow: 1,
  },
  textfield: {
    width: 1000 * 10 / 12,
    height: 48,
    '& label.Mui-focused': {
      color: 'blue',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'blue',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
      },
      '&:hover fieldset': {
        borderColor: 'blue',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'blue',
      },
    },
  },
  button: {
    width: 1000 * 1 / 12,
    height: 48,
    margin: 8,
    background: 'linear-gradient(45deg, #21CBF3 0%, #21CBF3 100%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
  },
}));

export const TweetForm: React.FC<IProps> = (props: IProps) => {
  const { send } = props;
  const classes = useStyles();
  const [text, updateText] = React.useState('');

  return (
    <Grid container className={classes.root}>
      <Grid item xs={10}>
        <TextField
          className={classes.textfield}
          label="Tweet"
          variant="outlined"
          onChange={(event) => { updateText(String(event.target.value)); }}
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          className={classes.button}
          onClick={() => send({id: 0, content: text}) }
        >
        Send
        </Button>
      </Grid>
    </Grid>
  );
};
