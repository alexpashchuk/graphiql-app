import axios, { AxiosError } from 'axios';
import { buildClientSchema, getIntrospectionQuery } from 'graphql';
import { useMutation, useQuery } from '@tanstack/react-query';

type RequestQuery = {
  endpoint: string;
  query: string;
  variables: string;
  headers: string;
};
// TODO add Error handling https://app.asana.com/0/1206001149209373/1206205651066276
const fetchQueryResponse = async ({ endpoint, query, variables, headers }: RequestQuery) => {
  const { data } = await axios.post(
    endpoint,
    { query, variables },
    {
      headers: { 'Content-Type': 'application/json', headers },
    }
  );
  return data;
};

const fetchSchema = async (endpoint: string) => {
  const { data } = await axios.post(
    endpoint,
    { query: getIntrospectionQuery() },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );

  return buildClientSchema(data.data);
};

export const useSchemaQuery = (endpoint: string) => {
  return useQuery({
    queryKey: ['schema', endpoint],
    queryFn: () => fetchSchema(endpoint),
  });
};

export const useGraphqlDataQuery = (onSuccess: <T>(data: T) => void, onError: (error: AxiosError | Error) => void) => {
  return useMutation({
    mutationKey: ['response'],
    mutationFn: fetchQueryResponse,
    onSuccess: onSuccess,
    onError: onError,
  });
};
