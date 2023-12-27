import { renderWithProviders } from '@/test/test-utils';
import Docs from './docs';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockGraphQLSchema } from '@/mocks/MockSchema';

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
});
