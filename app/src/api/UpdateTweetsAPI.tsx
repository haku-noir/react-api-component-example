import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch, Action } from 'redux';
import { RootState } from 'store';
import { fetchTweets } from 'clients/tweetsAPI';
import { entitiesActions } from 'actions/entitiesActions';
import { tweetsAPIActions } from 'actions/tweetsAPIActions';

export const UpdateTweetsAPI: React.FC<{}> = () => {
  const dispatch = useDispatch<Dispatch<Action>>();

  const updating = useSelector<RootState, boolean>(
    state => state.tweetsAPI.updating
  );

  React.useEffect(() => {
    if(!updating) return;

    fetchTweets()
      .then(res => res.json())
      .then(res => {
        if(!res.tweets) return;
        dispatch(entitiesActions.updateTweets(res.tweets));
      })
      .then(() => {
        dispatch(tweetsAPIActions.updateTweetsDone());
      })
      .catch(() => {
        dispatch(tweetsAPIActions.updateTweetsDone());
      });
  }, [updating]);

  return null;
};
