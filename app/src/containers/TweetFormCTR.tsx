import * as React from 'react';
import { Dispatch, Action } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { TweetForm as TweetFormComp } from 'components/TweetForm';
import { RootState } from 'store';
import { TweetState } from 'reducers/entitiesReducer';
import { tweetsAPIActions } from 'actions/tweetsAPIActions';

type IProps = {};

export const TweetForm: React.FC<IProps> = (props: IProps) => {
  const dispatch = useDispatch<Dispatch<Action>>();

  const state = useSelector<RootState, RootState>(state => state);

  const _props = {
    send: (newTweet: TweetState) => {
      dispatch(tweetsAPIActions.sendTweet(newTweet));
    }
  }

  return <TweetFormComp {..._props}/>;
};
