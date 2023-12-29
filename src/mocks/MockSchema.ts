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

const mockSchemaQuery = {
  getQueryType: () => queryType,
  getTypeMap: () => {
    return {
      Character: characterType,
      CharacterList: characterListType,
      Query: queryType,
    };
  },
};

export { mockGraphQLSchema, mockSelectedType, mockSchemaQuery };

export const stringTypeDescription =
  'The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.';
export const intTypeDescription =
  'The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.';
