import { act, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/test-utils';
import EditorMain from './editorMain';
import { mockGraphQLSchema } from '@/mocks/MockSchema';

describe('EditorMain component', () => {
  it('renders EditorMain correctly', async () => {
    renderWithProviders(<EditorMain />);
    screen.debug();
    // expect(screen.getByText('Enter your query')).toBeInTheDocument();
  });
  // it('handles the run query button click', async () => {
  //   // Mock the response data
  //   const mockData = { data: { result: { results: ['Mocked result'] } } };

  //   // Mock the useGraphqlDataQuery hook response
  //   vi.mock('@/services/api.ts', () => ({
  //     useGraphqlDataQuery: vi.fn((onSuccess) => {
  //       onSuccess(mockData);
  //       return { mutate: vi.fn() }; // Mock the mutate function
  //     }),
  //   }));

  //   renderWithProviders(<EditorMain schema={mockGraphQLSchema} />);

  //   // Find and click the run query button
  //   const runQueryButton = screen.getByTitle('Run query');
  //   userEvent.click(runQueryButton);

  //   // Your assertions based on the expected behavior go here
  //   await waitFor(() => {
  //     expect(screen.getByText(JSON.stringify(mockData.data))).toBeInTheDocument();
  //   });
  // });

  // it('handles the run query button click', async () => {
  //   const mockData = { data: 'your mock data' };
  //   vi.mock('@/services/api.ts', () => ({
  //     useGraphqlDataQuery: vi.fn((onSuccess) => {
  //       onSuccess(mockData);
  //       return { mutate: vi.fn() };
  //     }),
  //   }));

  //   renderWithProviders(<EditorMain />);

  //   const runQueryButton = screen.getByTitle('Run query');
  //   userEvent.click(runQueryButton);

  //   await waitFor(() => {
  //     expect(screen.getByText(JSON.stringify(mockData.data))).toBeInTheDocument();
  //   });
  // });
});
