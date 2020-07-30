import * as React from 'react';
import { Dispatch, Action } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { TweetState } from 'reducers/entitiesReducer';
import { sendTweet } from 'clients/tweetsAPI';
import { tweetsAPIActions } from 'actions/tweetsAPIActions';

export const SendTweetAPI: React.FC<{}> = () => {
  const dispatch = useDispatch<Dispatch<Action>>();

  const newTweet = useSelector<RootState, TweetState>(state => state.tweetsAPI.newTweet);

  React.useEffect(() => {
    sendTweet(newTweet)
      .then(() => {
        dispatch(tweetsAPIActions.updateTweets());
      })
      .catch(() => {
        dispatch(tweetsAPIActions.updateTweets());
      });
  }, [newTweet]);

  return null;
};
