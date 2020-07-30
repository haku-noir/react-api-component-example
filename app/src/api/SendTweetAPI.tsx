import * as React from 'react';
import { Dispatch, Action } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { sendTweet } from 'clients/tweetsAPI';
import { tweetsAPIActions } from 'actions/tweetsAPIActions';

export const SendTweetAPI: React.FC<{}> = () => {
  const dispatch = useDispatch<Dispatch<Action>>();

  const newContent = useSelector<RootState, string>(
    state => state.tweetsAPI.newContent
  );

  React.useEffect(() => {
    if(newContent === '') return;

    sendTweet(newContent)
      .then(() => {
        dispatch(tweetsAPIActions.updateTweets());
      })
      .then(() => {
        dispatch(tweetsAPIActions.sendTweetDone());
      })
      .catch(() => {
        dispatch(tweetsAPIActions.sendTweetDone());
      });
  }, [newContent]);

  return null;
};
