import * as React from 'react';
import { Dispatch, Action } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { tweetsAPIActions } from 'actions/tweetsAPIActions';

/*
  サーバAPIとの通信用クライアント
*/
const sendTweet = (content: string) => fetch('http://localhost/tweets', {
  method: 'POST',
  mode: 'cors',
  credentials: 'include',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ content }),
});

export const SendTweetAPI: React.FC<{}> = () => {
  const dispatch = useDispatch<Dispatch<Action>>();

  /*
    tweetsAPIReducerが管理するnewContentプロパティ(string型)
    非同期処理開始のトリガーとなるAPIReducerが管理するプロパティ
  */
  const newContent = useSelector<RootState, string>(
    (state) => state.tweetsAPI.newContent,
  );

  React.useEffect(() => {
    if (newContent === '') return;

    // 3. サーバへツイートを送信
    sendTweet(newContent)
      .then(() => {
        /*
          4. SendTweetAPIはupdateTweetsアクションをディスパッチすることで、
             tweetsAPIReducerが管理するupdatingプロパティを更新
        */
        dispatch(tweetsAPIActions.updateTweets());
      })
      .then(() => {
        /*
          非同期処理の終了をディスパッチ
          データの流れでは省略
        */
        dispatch(tweetsAPIActions.sendTweetDone());
      })
      .catch(() => {
        dispatch(tweetsAPIActions.sendTweetDone());
      });
  }, [newContent]); // 2. newContentプロパティの更新を検知

  return null;
};
