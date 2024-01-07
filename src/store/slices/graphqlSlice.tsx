import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/store/store.tsx';
import { BASE_URL } from '@/constants/constants.ts';

type GraphqlData = {
  endpoint: string;
  query: string;
  variables: string;
  headers: string;
};

const initialState: GraphqlData = {
  endpoint: BASE_URL,
  query: '',
  variables: '',
  headers: '',
};

const graphqlSlice = createSlice({
  name: 'graphqlSlice',
  initialState,
  reducers: {
    setEndpoint(state, actions: PayloadAction<string>) {
      state.endpoint = actions.payload;
    },
    setQuery(state, actions: PayloadAction<string>) {
      state.query = actions.payload;
    },
    setVariables(state, actions: PayloadAction<string>) {
      state.variables = actions.payload;
    },
    setHeaders(state, actions: PayloadAction<string>) {
      state.headers = actions.payload;
    },
  },
});

export const { setEndpoint, setQuery, setVariables, setHeaders } = graphqlSlice.actions;

export const selectGraphql = (state: RootState) => state.graphql;

export default graphqlSlice.reducer;
