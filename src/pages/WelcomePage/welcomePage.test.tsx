import { vi } from 'vitest';
import { renderWithProviders } from '@/test/test-utils.tsx';
import { fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { SIGN_IN, SIGN_UP } from '@/constants/constants.ts';
import { setAuthView } from '@/store/slices/userSlice.tsx';
import WelcomePage from '@/pages/WelcomePage/welcomePage.tsx';
import { BrowserRouter } from 'react-router-dom';

const mockDispatch = vi.fn();
vi.mock('@/hooks/useRedux', async () => ({
  ...(await vi.importActual<Record<string, unknown>>('@/hooks/useRedux')),
  useAppDispatch: () => mockDispatch,
}));

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: () => [null, false, null],
}));

describe('Welcome Page test', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('change auth view sign in', async () => {
    const wrapper = renderWithProviders(
      <BrowserRouter>
        <WelcomePage />
      </BrowserRouter>
    );
    const signInButton = wrapper.queryByText(/Sign in/i) as HTMLButtonElement;

    await act(async () => {
      fireEvent.click(signInButton);
    });

    expect(mockDispatch).toHaveBeenCalledWith(setAuthView(SIGN_IN));
  });

  it('change auth view to sign up ', async () => {
    const wrapper = renderWithProviders(
      <BrowserRouter>
        <WelcomePage />
      </BrowserRouter>
    );
    const signUpButton = wrapper.queryByText(/Sign up/i) as HTMLButtonElement;

    await act(async () => {
      fireEvent.click(signUpButton);
    });

    expect(mockDispatch).toHaveBeenCalledWith(setAuthView(SIGN_UP));
  });
});
