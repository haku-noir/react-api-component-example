import {
  createStore as reduxCreateStore, combineReducers, compose, applyMiddleware,
} from 'redux';
import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router';
import { History } from 'history';
import logger from 'redux-logger';
import { EntitiesState, entitiesReducer } from 'reducers/entitiesReducer';
import { TweetsAPIState, tweetsAPIReducer } from 'reducers/tweetsAPIReducer';

export type RootState = {
  router: RouterState,
  entires: EntitiesState,
  tweetsAPI: TweetsAPIState
};

export const createStore = (history: History) => {
  const rootReducer = combineReducers<RootState>({
    router: connectRouter(history),
    entires: entitiesReducer,
    tweetsAPI: tweetsAPIReducer
  });

  return reduxCreateStore(
    rootReducer,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        logger,
      ),
    ),
  );
}
