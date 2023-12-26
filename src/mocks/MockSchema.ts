import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID } from 'graphql';

const characterType = new GraphQLObjectType({
  name: 'Character',
  description: 'An individual character in the Rick and Morty universe',
  fields: {
    id: { type: GraphQLID, description: 'The ID of the character' },
    name: { type: GraphQLString, description: 'The name of the character' },
  },
});

const characterListType = new GraphQLObjectType({
  name: 'CharacterList',
  description: 'A list of characters in the Rick and Morty universe',
  fields: {
    results: { type: new GraphQLList(characterType), description: 'The list of characters' },
  },
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    characters: {
      type: characterListType,
      description: 'Get a list of characters',
      resolve: () => ({ results: [] }),
    },
  },
});

const mockGraphQLSchema = new GraphQLSchema({
  query: queryType,
});
const mockSelectedType = {
  name: 'Character',
  description: 'An individual character in the Rick and Morty universe',
  fields: [
    {
      name: 'id',
      description: 'The ID of the character',
      type: {
        name: 'ID',
      },
    },
    {
      name: 'name',
      description: 'The name of the character',
      type: {
        name: 'String',
      },
    },
  ],
};
export { mockGraphQLSchema, mockSelectedType };
