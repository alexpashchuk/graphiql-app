import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './header';
import { renderWithProviders } from '@/test/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

// vi.mock('react-firebase-hooks/auth', () => ({
//   useAuthState: () => [null, false, null],
// }));
// vi.mock('@/utils/useWindowScrolled.ts', () => ({
//   useWindowScrolled: vi.fn(() => ({ isScrolled: false })),
// }));
describe('Testing header components', () => {
  beforeAll(() => {
    vi.mock('react-firebase-hooks/auth', () => ({
      useAuthState: () => [null, false, null],
    }));
    vi.mock('@/utils/useWindowScrolled.ts', () => ({
      useWindowScrolled: vi.fn(() => ({ isScrolled: false })),
    }));
  });
  it('Localization of the header component, handles language switch correctly', async () => {
    renderWithProviders(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.queryByText('Sign in')).toBeDefined();
    expect(screen.queryByText('Sign up')).toBeDefined();

    await userEvent.click(screen.getByText('en'));

    expect(screen.queryByText('ru')).toBeDefined();
    expect(screen.queryByText('Вход')).toBeDefined();
    expect(screen.queryByText('Регистрация')).toBeDefined();

    await userEvent.click(screen.queryByText('ru')!);
    expect(screen.queryByText('en')).toBeDefined();
  });
  it('Renders correctly when user is not authenticated', async () => {
    renderWithProviders(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.queryByText('Sign in')).toBeDefined();
    expect(screen.queryByText('Sign up')).toBeDefined();
  });

  it('Opens and closes the menu correctly', async () => {
    renderWithProviders(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.queryByTitle(/Menu close/i)).toBeNull();

    fireEvent.click(screen.getByTitle(/Menu open/i));
    await waitFor(() => screen.getByTitle(/Menu close/i));

    expect(screen.getByTitle(/Menu close/i)).toBeDefined();

    fireEvent.click(screen.getByTitle(/Menu close/i));
    await waitFor(() => screen.getByTitle(/Menu open/i));

    expect(screen.queryByTitle(/Menu close/i)).toBeNull();
  });

  it('Renders correctly when the user is authenticated', async () => {
    vi.mock('react-firebase-hooks/auth', () => ({
      useAuthState: () => [{ uid: '123', email: 'test@example.com', name: 'Test' }, false, null],
    }));

    renderWithProviders(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.queryByText('Test')).toBeDefined();
    expect(screen.queryByText('Logout')).toBeDefined();

    expect(screen.queryByText('Sign in')).toBeNull();
    expect(screen.queryByText('Sign up')).toBeNull();

    await userEvent.click(screen.getByText('Logout'));
  });
});
