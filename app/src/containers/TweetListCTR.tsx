import * as React from 'react';
import { Dispatch, Action } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { TweetList as TweetListComp } from 'components/TweetList';
import { RootState } from 'store';
import { EntitiesState } from 'reducers/entitiesReducer';

type IProps = {};

export const TweetList: React.FC<IProps> = (props: IProps) => {
  const dispatch = useDispatch<Dispatch<Action>>();

  const tweets = useSelector<RootState, EntitiesState["tweets"]>(
    state => state.entities.tweets
  );

  const _props = { tweets }

  return <TweetListComp {..._props}/>;
};
