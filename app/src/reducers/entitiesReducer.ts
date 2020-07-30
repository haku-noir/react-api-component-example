import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { entitiesActions } from 'actions/entitiesActions';

export type TweetState = {
  id: number,
  content: string
};

export type EntitiesState = {
  tweets: TweetState[]
};

const initialState: EntitiesState = {
  tweets: [
    {
      id: 1,
      content: 'Hello',
    },
    {
      id: 2,
      content: 'World',
    },
  ],
};

export const entitiesReducer = reducerWithInitialState(initialState)
  .case(entitiesActions.updateTweets, (state: EntitiesState, payload: EntitiesState['tweets']): EntitiesState => ({
    ...state,
    tweets: payload,
  }));
