import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import QueryEditor from './queryEditor';
import { renderWithProviders } from '@/test/test-utils';
import { vi } from 'vitest';

vi.mock('./mockExtensions', async () => ({
  ...(await vi.importActual('./mockExtensions')),
  mockGraphqlExtension: vi.fn(),
  mockJsonLanguageExtension: vi.fn(),
  mockAutocompletionExtension: vi.fn(),
  mockEditorViewLineWrappingExtension: vi.fn(),
  mockPrecHigh: vi.fn(),
  mockKeymapOf: vi.fn(),
  mockAcceptCompletion: vi.fn(),
}));
const value = `query getAllCharacters($page: Int, $filter: FilterCharacter) {
  characters(page: $page, filter: $filter) {
    info {
      count
    }
    results {
      id
      name
    }
  }
}`;

describe('QueryEditor component', () => {
  it('renders with the provided value and placeholder', async () => {
    const placeholder = 'Enter your query...';

    renderWithProviders(<QueryEditor value={value} placeholder={placeholder} extension={[]} />);

    const editor = await screen.findByRole('textbox');

    await waitFor(() => {
      expect(editor).toContainHTML('characters(page: $page, filter: $filter)');
    });
  });
});
