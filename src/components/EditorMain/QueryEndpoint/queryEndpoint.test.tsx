import { fireEvent } from '@testing-library/react';
import { renderWithProviders } from '@/test/test-utils.tsx';
import QueryEndpoint from '@/components/EditorMain/QueryEndpoint/queryEndpoint.tsx';
import { BASE_URL } from '@/constants/constants.ts';
import { vi } from 'vitest';
import { setEndpoint } from '@/store/slices/graphqlSlice.tsx';

const mockDispatch = vi.fn();
vi.mock('@/hooks/useRedux', async () => ({
  ...(await vi.importActual<Record<string, unknown>>('@/hooks/useRedux')),
  useAppDispatch: () => mockDispatch,
}));

describe('Query Endpoint', () => {
  it('change input value and form submit', () => {
    const wrapper = renderWithProviders(<QueryEndpoint />);
    const input = wrapper.getByPlaceholderText('Enter an API endpoint') as HTMLInputElement;
    fireEvent.change(input, { target: { value: BASE_URL } });
    expect(input.value).toBe(BASE_URL);
    fireEvent.submit(input);
    expect(mockDispatch).toHaveBeenCalledWith(setEndpoint(BASE_URL));
  });
});
