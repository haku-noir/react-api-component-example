import * as React from 'react';
import { Dispatch, Action } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { tweetsAPIActions } from 'actions/tweetsAPIActions';

const sendTweet = (content: string) => fetch('http://localhost/tweets', {
  method: 'POST',
  mode: 'cors',
  credentials: 'include',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ content }),
});

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
