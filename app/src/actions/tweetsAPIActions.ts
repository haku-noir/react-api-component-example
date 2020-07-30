import actionCreatorFactory from 'typescript-fsa';
import { TweetState } from 'reducers/entitiesReducer';

const actionCreator = actionCreatorFactory();

export const tweetsAPIActions = {
  updateTweets: actionCreator<void>('API_UPDATE_TWEETS'),
  updateTweetsDone: actionCreator<void>('API_UPDATE_TWEETS_DONE'),
  sendTweet: actionCreator<TweetState>('API_SEND_TWEET'),
};
