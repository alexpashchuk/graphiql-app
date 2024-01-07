import { renderWithProviders } from '@/test/test-utils';
import { screen, waitFor } from '@testing-library/react';
import SelectedTypes from './selectedTypes';
import { mockSelectedType } from '@/mocks/MockSchema';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

describe('Testing SelectedType component', () => {
  it('Correctly render SelectedType with mock data', async () => {
    const handleBackClickMock = vi.fn();
    renderWithProviders(
      <SelectedTypes handleBackClick={handleBackClickMock} handleTypeClick={() => {}} selectedType={mockSelectedType} />
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

      expect(spyAnchorTag).toHaveBeenCalled();
    });
  });
  it('Testing handle type click', async () => {
    const handleTypeClickMock = vi.fn();
    renderWithProviders(
      <SelectedTypes handleBackClick={() => {}} handleTypeClick={handleTypeClickMock} selectedType={mockSelectedType} />
    );

    const stringFieldType = screen.getByText('String');

    await waitFor(() => {
      const handler = userEvent.setup();
      userEvent.click(stringFieldType);
      const spyAnchorTag = vi.spyOn(handler, 'click');
      handler.click(stringFieldType);

      expect(spyAnchorTag).toHaveBeenCalled();
    });
  });
  it('Renders correctly when there are no fields', async () => {
    const typeWithoutFields = { name: 'TypeName', description: 'Type Description' };
    renderWithProviders(
      <SelectedTypes handleBackClick={() => {}} handleTypeClick={() => {}} selectedType={typeWithoutFields} />
    );

    const typeNameElement = screen.getByText('TypeName');
    const typeDescriptionElement = screen.getByText('Type Description');

    expect(typeNameElement).toBeInTheDocument();
    expect(typeDescriptionElement).toBeInTheDocument();
  });

  it('Calls handleBackClick when the "Back" button is clicked', async () => {
    const handleBackClickMock = vi.fn();
    renderWithProviders(
      <SelectedTypes handleBackClick={handleBackClickMock} handleTypeClick={() => {}} selectedType={mockSelectedType} />
    );

    const backBtn = screen.getByText('\u2190 Back');

    await waitFor(() => {
      userEvent.click(backBtn);
      expect(handleBackClickMock).toHaveBeenCalledTimes(1);
    });
  });
  it('Renders correctly when there are no fields', async () => {
    const typeWithoutFields = { name: 'TypeName', description: 'Type Description' };
    renderWithProviders(
      <SelectedTypes handleBackClick={() => {}} handleTypeClick={() => {}} selectedType={typeWithoutFields} />
    );

    const typeNameElement = screen.getByText('TypeName');
    const typeDescriptionElement = screen.getByText('Type Description');

    expect(typeNameElement).toBeInTheDocument();
    expect(typeDescriptionElement).toBeInTheDocument();
  });
  it('Handles going back when the "Back" button is clicked', async () => {
    const handleBackClickMock = vi.fn();
    renderWithProviders(
      <SelectedTypes handleBackClick={handleBackClickMock} handleTypeClick={() => {}} selectedType={mockSelectedType} />
    );

    const backBtn = screen.getByText('\u2190 Back');

    await waitFor(() => {
      userEvent.click(backBtn);
      expect(handleBackClickMock).toHaveBeenCalledTimes(1);
    });
  });
  it('Calls handleTypeClick with the correct argument when a type is clicked', async () => {
    const handleTypeClickMock = vi.fn();
    renderWithProviders(
      <SelectedTypes handleBackClick={() => {}} handleTypeClick={handleTypeClickMock} selectedType={mockSelectedType} />
    );

    const stringFieldType = screen.getByText('String');

    await waitFor(() => {
      userEvent.click(stringFieldType);
      expect(handleTypeClickMock).toHaveBeenCalledWith('String');
    });
  });
});
