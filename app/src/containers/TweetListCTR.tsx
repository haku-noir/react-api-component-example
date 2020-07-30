import * as React from 'react';
import { useSelector } from 'react-redux';
import { TweetList as TweetListComp } from 'components/TweetList';
import { RootState } from 'store';
import { EntitiesState } from 'reducers/entitiesReducer';

export const TweetList: React.FC<{}> = () => {
  const tweets = useSelector<RootState, EntitiesState['tweets']>(
    (state) => state.entities.tweets,
  );

  const _props = { tweets };

  return <TweetListComp {..._props} />;
};
