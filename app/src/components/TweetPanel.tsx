import * as React from 'react';
import { TweetForm } from 'containers/TweetFormCTR';
import { TweetList } from 'containers/TweetListCTR';
import { UpdateTweetsAPI } from 'api/UpdateTweetsAPI';
import { SendTweetAPI } from 'api/SendTweetAPI';

type IProps = {};

export const TweetPanel: React.FC<IProps> = (props: IProps) => {
  return (
    <div>
      <TweetForm />
      <TweetList />
      <UpdateTweetsAPI />
      <SendTweetAPI />
    </div>
  );
};
