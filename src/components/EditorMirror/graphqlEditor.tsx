import { EditorProps } from '@/types/types';
import CodeMirror from '@uiw/react-codemirror';
import { FC } from 'react';
import classes from './graphqlEditor.module.css';
import { graphql } from 'cm6-graphql';
import { autocompletion, closeBrackets } from '@codemirror/autocomplete';
import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => 'Hello, GraphQL!',
    },
  },
});

const myGraphQLSchema = new GraphQLSchema({
  query: QueryType,
});

const GraphqlEditor: FC<EditorProps> = ({ initialValue, handlerChange }) => {
  return (
    <CodeMirror
      className={classes.editor}
      value={initialValue}
      extensions={[graphql(myGraphQLSchema), autocompletion(), closeBrackets()]}
      onChange={(value, viewUpdate) => handlerChange(value, viewUpdate)}
    />
  );
};
export default GraphqlEditor;
