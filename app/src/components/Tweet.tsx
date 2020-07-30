import * as React from 'react';
import { TweetState } from 'reducers/entitiesReducer';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

type IProps = {
  tweet: TweetState
};

const useStyles = makeStyles(() => createStyles({
  root: {
    width: '100%',
  },
}));

export const Tweet: React.FC<IProps> = (props: IProps) => {
  const { tweet } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={(
          <Avatar alt="Anonymous" src="" />
        )}
        title={(
          <Typography>
            Anonymous
          </Typography>
        )}
        subheader={(
          <Typography variant="body1" component="p">
            {tweet.content}
          </Typography>
        )}
      />
    </Card>
  );
};
