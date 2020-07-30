import * as React from 'react';
import { EntitiesState } from 'reducers/entitiesReducer';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Tweet } from './Tweet';

type IProps = {
  tweets: EntitiesState["tweets"]
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

export const TweetList: React.FC<IProps> = (props: IProps) => {
  const { tweets } = props;
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {tweets.map((tweet) => (
        <ListItem key={tweet.id} alignItems="flex-start">
          <Tweet tweet={tweet} />
        </ListItem>
      ))}
    </List>
  );
};
