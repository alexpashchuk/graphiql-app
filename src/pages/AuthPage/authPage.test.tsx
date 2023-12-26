import '@testing-library/jest-dom';
import { vi, describe, it } from 'vitest';
import AuthPage from '@/pages/AuthPage/authPage.tsx';
import { renderWithProviders } from '@/test/test-utils.tsx';

vi.mock('@/hooks/useRedux.ts', async () => {
  const actual: unknown = await vi.importActual('@/hooks/useRedux.ts');
  if (typeof actual !== 'object') throw new Error('Import Actual did not return not an object');
  return {
    ...actual,
    useAppSelector: vi.fn().mockReturnValue({
      view: 'sign-up',
    }),
  };
});

describe('AuthPage tests', () => {
  it('correct view auth page', () => {
    const wrapper = renderWithProviders(<AuthPage />);

    const heading = wrapper.getByRole('heading', { level: 1 });
    expect(heading.textContent).toEqual('Sign Up');
  });
});
