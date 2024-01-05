import { renderWithProviders } from '@/test/test-utils';
import Docs from './docs';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { intTypeDescription, mockGraphQLSchema, stringTypeDescription } from '@/mocks/MockSchema';
import { GraphQLEnumType, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql/type';
import { buildTypeHierarchy } from '@/helpers/helpers';
import { vi } from 'vitest';

describe('Testing docs component', () => {
  it('Renders documentation when "Show Docs" button is clicked', async () => {
    renderWithProviders(<Docs schema={mockGraphQLSchema} />);

    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeDefined();

    userEvent.click(toggleButton);

    await waitFor(() => {
      const h2Element = screen.getByText('Docs');
      expect(h2Element).toBeTruthy();
    });
  });

  it('Renders selected types when a type is clicked', async () => {
    renderWithProviders(<Docs schema={mockGraphQLSchema} />);

    userEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      userEvent.click(screen.getByText('Character'));
      const h3Element = screen.getByText('Character');
      expect(h3Element).toBeTruthy();
    });
  });

  it('Renders documentation container when "Show Docs" button is clicked and schema was not provided', async () => {
    renderWithProviders(<Docs />);
    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeDefined();

    userEvent.click(toggleButton);

    await waitFor(() => {
      const text = screen.getByText('Docs not found');
      expect(text).toBeTruthy();
    });
    const backButton = screen.queryByText('\u2190 Back');
    expect(backButton).toBeNull();
    const characterType = screen.queryByText('Character');
    expect(characterType).toBeNull();
  });
  it('Handles switching between SelectedTypes and TypesMap', async () => {
    renderWithProviders(<Docs schema={mockGraphQLSchema} />);

    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeDefined();

    userEvent.click(toggleButton);

    await waitFor(() => {
      const characterType = screen.getByText('Character');
      expect(characterType).toBeDefined();
    });

    userEvent.click(screen.getByText('Character'));

    await waitFor(() => {
      const backBtn = screen.getByText('\u2190 Back');
      expect(backBtn).toBeDefined();
    });

    userEvent.click(screen.getByText('\u2190 Back'));

    await waitFor(() => {
      const queryType = screen.getByText('Query');
      expect(queryType).toBeDefined();
    });
  });

  it('builds hierarchy for GraphQLObjectType', () => {
    const objectType = new GraphQLObjectType({
      name: 'MockObject',
      fields: {
        field1: { type: GraphQLString, description: 'Field 1' },
        field2: { type: GraphQLInt, description: 'Field 2' },
      },
      description: 'Mock Object Type',
    });

    const result = buildTypeHierarchy(objectType, new Set());

    expect(result).toEqual({
      name: 'MockObject',
      description: 'Mock Object Type',
      fields: [
        {
          name: 'field1',
          description: 'Field 1',
          type: {
            name: 'String',
            description: stringTypeDescription,
          },
        },
        {
          name: 'field2',
          description: 'Field 2',
          type: {
            name: 'Int',
            description: intTypeDescription,
          },
        },
      ],
      subtypes: [
        {
          name: 'String',
          description: stringTypeDescription,
        },
        {
          name: 'Int',
          description: intTypeDescription,
        },
      ],
    });
  });

  it('builds hierarchy for GraphQLEnumType', () => {
    const enumType = new GraphQLEnumType({
      name: 'MockEnum',
      values: {
        VALUE1: { description: 'Value 1' },
        VALUE2: { description: 'Value 2' },
      },
      description: 'Mock Enum Type',
    });

    const result = buildTypeHierarchy(enumType, new Set());

    expect(result).toEqual({
      name: 'MockEnum',
      description: 'Enum values:  VALUE1 VALUE2',
    });
  });
});
