import { mockGraphQLSchema, mockSelectedType } from '@/mocks/MockSchema';
import { vi } from 'vitest';
import EditorPage from './editorPage';
import { renderWithProviders } from '@/test/test-utils';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('@/services/api.ts', async () => {
  const actual = await vi.importActual('@/services/api.ts');
  return {
    ...actual,
    useSchemaQuery: vi.fn(() => ({
      mockGraphQLSchema,

      getQueryType: () => mockSelectedType,
      getTypeMap: () => {
        const typeMap = { Character: mockSelectedType };
        return typeMap;
      },
    })),
    useGraphqlDataQuery: vi.fn((onSuccess, onError) => {
      const mutate = async () => {
        const responseData = {};
        onSuccess(responseData);
      };

      return { mutate };
    }),
  };
});
describe('Testing EditorPage component', () => {
  it('Render EditorPage correctly', async () => {
    renderWithProviders(<EditorPage isEditorExist={false} />);

    const toggleButton = await screen.findByTitle('Show Docs');
    expect(toggleButton).toBeDefined();

    const openToolsBtn = await screen.findByTitle('Show tools');
    expect(openToolsBtn).toBeDefined();
  });
  it('Open docs on the Editor page correctly', async () => {
    renderWithProviders(<EditorPage isEditorExist={false} />);
    screen.debug();
    const toggleButton = await screen.findByTitle('Show Docs');
    expect(toggleButton).toBeDefined();

    await act(async () => {
      await userEvent.click(toggleButton);
    });

    await waitFor(() => {
      const h2Element = screen.getByText('Docs');
      expect(h2Element).toBeTruthy();
    });
  });
});
