import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/test-utils';
import EditorMain from './editorMain';
import { vi } from 'vitest';
import { useGraphqlDataQuery } from '@/services/api';

// Mock the graphql query hook
const mockMutate = vi.fn();
vi.mock('@/services/api.ts', () => ({
  useGraphqlDataQuery: vi.fn(() => ({ mutate: mockMutate })),
}));

describe('EditorMain component', () => {
  beforeEach(() => {
    // Reset mocks and clear any setup
    vi.clearAllMocks();
  });

  it('renders EditorMain component with default state', () => {
    renderWithProviders(<EditorMain />);
    screen.debug();
    // Add your assertions for initial render
    // expect(screen.getByText('Run Query')).toBeInTheDocument();
    // expect(screen.getByText('Prettify')).toBeInTheDocument();
    // ... add more assertions based on your UI
  });

  // it('handles run query button click', async () => {
  //   // Mock the graphql hook response
  //   const mockMutate = vi.fn();
  //   (useGraphqlDataQuery as jest.Mock).mockReturnValue({ mutate: mockMutate });

  //   renderWithProviders(<EditorMain />);

  //   // Simulate user input and click
  //   userEvent.type(screen.getByRole('textbox'), 'your-graphql-query-here');
  //   fireEvent.click(screen.getByText('Run Query'));

  //   // Assert that the graphql hook was called with the expected parameters
  //   await waitFor(() =>
  //     expect(mockMutate).toHaveBeenCalledWith({
  //       endpoint: 'your-endpoint',
  //       query: 'your-graphql-query-here',
  //       headers: {},
  //       variables: {},
  //     })
  //   );

  //   // Assert that the response is displayed
  //   expect(screen.getByText('Your response data')).toBeInTheDocument();
  // });

  // it('handles prettify query button click', () => {
  //   renderWithProviders(<EditorMain />);

  //   // Simulate user input and click
  //   userEvent.type(screen.getByRole('textbox'), 'your-unformatted-graphql-query-here');
  //   fireEvent.click(screen.getByText('Prettify'));

  //   // Assert that the query is prettified
  //   expect(screen.getByRole('textbox')).toHaveValue('your formatted graphql query');
  // });

  // it('toggles tools tab visibility', () => {
  //   renderWithProviders(<EditorMain />);

  //   // Assert that the tools tab is initially hidden
  //   expect(screen.queryByText('Tools')).not.toBeInTheDocument();

  //   // Click the toggle button
  //   fireEvent.click(screen.getByTitle('Toggle Tools'));

  //   // Assert that the tools tab is now visible
  //   expect(screen.getByText('Tools')).toBeInTheDocument();
  // });
});
