import { renderWithProviders } from '@/test/test-utils';
import { screen, waitFor } from '@testing-library/react';
import SelectedTypes from './selectedTypes';
import { mockSelectedType } from '@/mocks/MockSchema';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

describe('Testing docs component', () => {
  it('Handles going back when the "Back" button is clicked in SelectedTypes', async () => {
    renderWithProviders(
      <SelectedTypes handleBackClick={() => {}} handleTypeClick={() => {}} selectedType={mockSelectedType} />
    );

    const backBtn = screen.getByText('\u2190 Back');
    const characterType = screen.getByText('Character');
    const typeDescription = screen.getByText('An individual character in the Rick and Morty universe');
    const idField = screen.getByText('id');
    const idFieldDescription = screen.getByText('The ID of the character');
    const stringFieldType = screen.getByText('String');

    expect(backBtn).toBeDefined();
    expect(characterType).toBeDefined();
    expect(typeDescription).toBeDefined();
    expect(idField).toBeDefined();
    expect(idFieldDescription).toBeDefined();
    expect(stringFieldType).toBeDefined();

    await waitFor(() => {
      const handler = userEvent.setup();
      userEvent.click(backBtn);
      const spyAnchorTag = vi.spyOn(handler, 'click');
      handler.click(backBtn);

      expect(spyAnchorTag).toHaveBeenCalledTimes(1);
    });
  });
});
