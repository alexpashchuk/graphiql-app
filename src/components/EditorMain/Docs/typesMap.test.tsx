import { renderWithProviders } from '@/test/test-utils';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockGraphQLSchema } from '@/mocks/MockSchema';
import TypesMap from './typesMap';
import { vi } from 'vitest';

describe('Testing TypesMap component', () => {
  it('Handles clicking on a type in TypesMap', async () => {
    renderWithProviders(<TypesMap schema={mockGraphQLSchema} handleTypeClick={() => {}} />);

    const IDType = screen.getByText('ID');
    const CharacterType = screen.getByText('Character');

    expect(IDType).toBeDefined();
    expect(CharacterType).toBeDefined();

    await waitFor(() => {
      const handler = userEvent.setup();
      userEvent.click(CharacterType);
      const spyAnchorTag = vi.spyOn(handler, 'click');
      handler.click(CharacterType);

      expect(spyAnchorTag).toHaveBeenCalledTimes(1);
    });
  });
});
