import { EnhancedStore, configureStore } from '@reduxjs/toolkit';

import userReducer from './slices/userSlice.tsx';
import graphqlReducer from './slices/graphqlSlice.tsx';

const store = configureStore({
  reducer: {
    user: userReducer,
    graphql: graphqlReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

export const getStoreWithPreloadedState = (preloadedState?: RootState): EnhancedStore => {
  return configureStore({
    reducer: {
      user: userReducer,
      graphql: graphqlReducer,
    },
    preloadedState,
  });
};
