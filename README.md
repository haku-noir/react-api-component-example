# react-api-component-example
Example of API Component

# React + Redux でミドルウェアを使わないシンプルな非同期処理
## はじめに
React.useEffectのみを持つコンポーネント(APIコンポーネント)を利用することで、非同期処理を行う方法を紹介します。APIコンポーネントを用いることで、非同期処理を含めたデータの流れがとてもシンプルになります。

## APIコンポーネントとは
### 特徴
1. propsを受けとらない
2. Elementを返さない
3. Redux Storeのみとデータのやり取りを行う
4. APIReducer(APIコンポーネント専用のReducer)が管理するプロパティの更新を検知して非同期処理を開始する

### SampleAPI.tsx
```typescript
import * as React from 'react';
import { Dispatch, Action } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';

export const SampleAPI: React.FC<{}> = () => { // 1. propsを受けとらない
  /*
    3. Redux Storeのみとデータのやり取りを行う
  */
  const dispatch = useDispatch<Dispatch<Action>>();

  const data = useSelector<RootState, any>(
    state => state.sampleAPI.data
  );

  React.useEffect(() => {
    /*
      非同期処理
    */
  }, [data]); // 4. APIReducerが管理するプロパティの更新を検知して非同期処理を開始する

  return null; // 2. Elementを返さない
};
```
以降、最小構成のツイートアプリであるreact-api-component-exampleを用いて具体例を紹介します。

## ツイート全体の取得 (UpdateTweetsAPI)
### データの流れ
<img width="1115" alt="update_tweets.png" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/455549/009b0431-2ace-cf13-51af-6d8ce295b8d8.png">
1. tweetsAPIReducerが管理するupdatingプロパティの更新をUpdateTweetsAPIが検知
2. UpdateTweetsAPIはサーバからツイート全体を取得
3. UpdateTweetsAPIはentitiesReducerが管理するtweetsプロパティに取得したツイート全体を保存
4. TweetListコンポーネントはtweetsプロパティの更新に伴って再描画。ツイートの一覧を表示

<!--
tweetsAPIReducerのupdatingプロパティが更新されると①、UpdateTweetsAPIはサーバからツイート全体を取得し②、entitiesReducerが管理するtweetsプロパティに保存します③。tweetsプロパティの更新に伴ってTweetListコンポーネントが再描画され④、ツイートの一覧が表示されます。
-->

### UpdateTweetsAPI.tsx
```typescript
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
    (state) => state.tweetsAPI.updating,
  );

  React.useEffect(() => {
    if (!updating) return;

    // 2. サーバからツイート全体を取得
    fetchTweets()
      .then((res) => res.json())
      .then((res) => {
        if (!res.tweets) return;

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
```

## ツイートの送信 (SendTweetAPI)
### データの流れ
<img width="1115" alt="send_tweet.png" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/455549/74e6196f-6436-cb93-1498-5c8fec50af6f.png">
1. TweetFormコンポーネントで送信ボタンが押されると、フォームの内容をtweetsAPIReducerが管理するnewContentプロパティに保存
2. newContentプロパティの更新をSendTweetAPIが検知
3. SendTweetAPIはサーバへツイートを送信
4. SendTweetAPIはupdateTweetsアクションをディスパッチすることで、tweetsAPIReducerが管理するupdatingプロパティを更新
5. updatingプロパティの更新をUpdateTweetsAPIが検知 (以後、上記の**ツイート全体の取得**)

<!--
TweetFormコンポーネントで送信ボタンが押されると、フォームの内容をtweetsAPIReducerのnewContentプロパティに保存します①。newContentプロパティが更新されると②、SendTweetAPIはサーバへツイートを送信します③。ツイートの送信後、ツイートの一覧を更新するためにupdateTweetsアクションをディスパッチします④。すると、tweetsAPIReducerのupdatingプロパティが更新され、それを検知したUpdateTweetsAPIがツイートの取得を行います⑤~⑧。
-->

### SendTweetAPI.tsx
```typescript
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
```

## おわりに
APIコンポートを利用すると、非同期処理をReduxデータフローの中に組み込むことができます。
また、以下のようにコンポーネントとして配置するだけで、APIコンポートはそのまま機能します。

```typescript
/* TweetPanel.tsx */
import * as React from 'react';
import { TweetForm } from 'containers/TweetFormCTR';
import { TweetList } from 'containers/TweetListCTR';
import { UpdateTweetsAPI } from 'api/UpdateTweetsAPI';
import { SendTweetAPI } from 'api/SendTweetAPI';

export const TweetPanel: React.FC<{}> = () => (
  <div>
    <TweetForm />
    <TweetList />
    <UpdateTweetsAPI />
    <SendTweetAPI />
  </div>
);
```
