import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch, Action } from 'redux';
import { RootState } from 'store';
import { entitiesActions } from 'actions/entitiesActions';
import { tweetsAPIActions } from 'actions/tweetsAPIActions';

/*
  サーバAPIとの通信用クライアント
*/
const fetchTweets = () => fetch('http://localhost/tweets', {
  method: 'GET',
  mode: 'cors',
  credentials: 'include',
});

export const UpdateTweetsAPI: React.FC<{}> = () => {
  const dispatch = useDispatch<Dispatch<Action>>();

  /*
    tweetsAPIReducerが管理するupdatingプロパティ(boolean型)
    非同期処理開始のトリガーとなるAPIReducerが管理するプロパティ
  */
  const updating = useSelector<RootState, boolean>(
    state => state.tweetsAPI.updating
  );

  React.useEffect(() => {
    if(!updating) return;

    // 2. サーバからツイート全体を取得
    fetchTweets()
      .then(res => res.json())
      .then(res => {
        if(!res.tweets) return;

        // 3. entitiesReducerが管理するtweetsプロパティに取得したツイート全体を保存
        dispatch(entitiesActions.updateTweets(res.tweets));
      })
      .then(() => {
        /*
          非同期処理の終了をディスパッチ
          データの流れでは省略
        */
        dispatch(tweetsAPIActions.updateTweetsDone());
      })
      .catch(() => {
        dispatch(tweetsAPIActions.updateTweetsDone());
      });
  }, [updating]); // 1. updatingプロパティの更新を検知

  return null;
};
