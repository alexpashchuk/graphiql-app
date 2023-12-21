import {
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLType,
} from 'graphql';
import { FieldNode, TypeNode } from '@/types/types';

export const buildTypeHierarchy = (parentType: GraphQLType, visitedTypes: Set<string>): TypeNode => {
  const typeName = parentType instanceof GraphQLObjectType ? parentType.name : parentType.toString();

  if (visitedTypes.has(typeName)) {
    return {
      name: typeName,
      description: parentType instanceof GraphQLObjectType ? parentType.description ?? null : null,
    };
  }

  visitedTypes.add(typeName);

  if (parentType instanceof GraphQLObjectType || parentType instanceof GraphQLInputObjectType) {
    const fields = parentType.getFields();
    const subtypes: TypeNode[] = [];
    const fieldNodes: FieldNode[] = [];

    for (const fieldName in fields) {
      const field = fields[fieldName];
      const fieldType = field.type;
      const subtype = buildTypeHierarchy(fieldType, new Set(visitedTypes));
      subtypes.push(subtype);

      const fieldNode: FieldNode = {
        name: fieldName,
        description: field.description ?? null,
        type: subtype,
      };

      fieldNodes.push(fieldNode);
    }

    return {
      name: typeName,
      description: parentType.description ?? null,
      fields: fieldNodes,
      subtypes,
    };
  } else if (parentType instanceof GraphQLEnumType) {
    const enumValues = parentType.getValues();

    const valuesWithDescriptions = enumValues.map((enumValue) => ({
      name: enumValue.name,
      description: enumValue.description,
    }));

    return {
      name: typeName,
      description: `Enum values:  ${valuesWithDescriptions.map((v) => `${v.name}`).join(' ')}`,
    };
  } else if (parentType instanceof GraphQLList) {
    const innerType = parentType.ofType;
    const subtype = buildTypeHierarchy(innerType, new Set(visitedTypes));
    return {
      name: subtype.name,
      description: subtype.description,
      subtypes: subtype.subtypes,
    };
  } else if (parentType instanceof GraphQLNonNull) {
    const innerType = parentType.ofType;
    const subtype = buildTypeHierarchy(innerType, new Set(visitedTypes));
    return {
      name: subtype.name,
      description: subtype.description,
      subtypes: subtype.subtypes,
    };
  } else if (parentType instanceof GraphQLScalarType) {
    return {
      name: typeName,
      description: parentType.description ?? null,
    };
  } else {
    return {
      name: typeName,
      description: null,
    };
  }
};
