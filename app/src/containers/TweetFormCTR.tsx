import * as React from 'react';
import { Dispatch, Action } from 'redux';
import { useDispatch } from 'react-redux';
import { TweetForm as TweetFormComp } from 'components/TweetForm';
import { tweetsAPIActions } from 'actions/tweetsAPIActions';

export const TweetForm: React.FC<{}> = () => {
  const dispatch = useDispatch<Dispatch<Action>>();

  const _props = {
    send: (newContent: string) => {
      dispatch(tweetsAPIActions.sendTweet(newContent));
    },
  };

  return <TweetFormComp {..._props} />;
};
