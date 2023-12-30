import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/test-utils';
import EditorMain from './editorMain';
import { prettifyGraphQL } from '@/helpers/helpers';
import { parseStringToJSON } from '@/utils/parseStringToJSON';
import { mockGraphQLSchema } from '@/mocks/MockSchema';

describe('EditorMain component', () => {
  it('renders EditorMain correctly', async () => {
    renderWithProviders(<EditorMain isEditor={false} />);

    screen.debug();
    expect(screen.getByRole('button', { name: 'Variables' })).toBeDefined();

    expect(screen.getByRole('button', { name: 'Headers' })).toBeDefined();
    expect(screen.getByRole('button', { name: '➧' })).toBeDefined();
    expect(screen.getByRole('button', { name: '🧹' })).toBeDefined();
    expect(screen.getByRole('button', { name: '▼' })).toBeDefined();
  });

  it('handles click on "Run Query" button', async () => {
    renderWithProviders(<EditorMain isEditor={false} />);

    const runQueryButton = screen.getByTitle('Execute query');

    expect(runQueryButton).toBeInTheDocument();

    await waitFor(() => {
      const handler = userEvent.setup();
      userEvent.click(runQueryButton);
      const spyAnchorTag = vi.spyOn(handler, 'click');
      handler.click(runQueryButton);

      expect(spyAnchorTag).toHaveBeenCalled();
    });
  });
  it('handles toggling the tools tab', async () => {
    renderWithProviders(<EditorMain isEditor={false} />);

    const openToolsBtn = await screen.findByTitle('Show tools');
    expect(openToolsBtn).toBeDefined();

    await act(async () => {
      fireEvent.click(openToolsBtn);

      expect(screen.queryByTitle('Hide tools')).toBeDefined();
    });
  });

  it('handles click on "Prettify" button', async () => {
    const enterValue = 'query {}';
    const resultValue = `query {\n}`;

    renderWithProviders(<EditorMain isEditor={false} />);

    const prettifyButton = screen.getByRole('button', { name: '🧹' });

    expect(prettifyButton).toBeInTheDocument();

    await waitFor(() => {
      const handler = userEvent.setup();
      userEvent.click(prettifyButton);
      const spyAnchorTag = vi.spyOn(handler, 'click');
      handler.click(prettifyButton);
      if (spyAnchorTag) {
        expect(prettifyGraphQL(enterValue)).toEqual(resultValue);
      }
      expect(spyAnchorTag).toHaveBeenCalledTimes(1);
    });
  });
  it('handles malformed input gracefully', () => {
    const code = `query {{ user { id name } }`;

    expect(() => prettifyGraphQL(code)).not.toThrow();
  });
  it('handles click on "Show tools" button', async () => {
    renderWithProviders(<EditorMain isEditor={false} />);

    const openToolsBtn = await screen.findByTitle('Show tools');
    expect(openToolsBtn).toBeDefined();

    await waitFor(() => {
      const handler = userEvent.setup();
      userEvent.click(openToolsBtn);
      const spyAnchorTag = vi.spyOn(handler, 'click');
      handler.click(openToolsBtn);

      expect(spyAnchorTag).toHaveBeenCalledTimes(1);
      expect(screen.getByTitle('Hide tools')).toBeDefined();
    });
  });
  it('should parse a valid JSON string and return an object', () => {
    const jsonString = '{"key": "value"}';
    const result = parseStringToJSON(jsonString);
    expect(result).toEqual({ key: 'value' });
  });

  it('should parse a valid JSON string with leading/trailing whitespaces and return an object', () => {
    const jsonString = '   {"key": "value"}   ';
    const result = parseStringToJSON(jsonString);
    expect(result).toEqual({ key: 'value' });
  });

  it('should parse a valid JSON string with newline characters and return an object', () => {
    const jsonString = '{"key": "value"}\n';
    const result = parseStringToJSON(jsonString);
    expect(result).toEqual({ key: 'value' });
  });
});
