import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { tweetsAPIActions } from 'actions/tweetsAPIActions';
import { TweetState } from './entitiesReducer';

export type TweetsAPIState = {
  update: boolean,
  newTweet: TweetState,
};

const initialState: TweetsAPIState = {
  update: true,
  newTweet: {
    id: 0,
    content: ''
  },
};

export const tweetsAPIReducer = reducerWithInitialState(initialState)
  .case(tweetsAPIActions.updateTweets, (state: TweetsAPIState): TweetsAPIState => ({
    ...state,
    update: true,
  }))
  .case(tweetsAPIActions.updateTweetsDone, (state: TweetsAPIState): TweetsAPIState => ({
    ...state,
    update: false,
  }))
  .case(tweetsAPIActions.sendTweet, (state: TweetsAPIState, payload: TweetState): TweetsAPIState => ({
    ...state,
    newTweet: payload
  }));
