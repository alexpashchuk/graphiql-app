import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/store/store.tsx';

type GraphqlData = {
  endpoint: string;
};

const initialState: GraphqlData = {
  endpoint: 'https://rickandmortyapi.com/graphql',
};

const graphqlSlice = createSlice({
  name: 'graphqlSlice',
  initialState,
  reducers: {
    setEndpoint(state, actions: PayloadAction<string>) {
      state.endpoint = actions.payload;
    },
  },
});

export const { setEndpoint } = graphqlSlice.actions;

export const selectGraphql = (state: RootState) => state.graphql;

export default graphqlSlice.reducer;
