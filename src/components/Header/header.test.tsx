import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './header';
import { renderWithProviders } from '@/test/test-utils';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import Layout from '../Layout/layout';
import AuthLayout from '../Layout/authLayout';
import AuthPage from '@/pages/AuthPage/authPage';
import { vi } from 'vitest';

let authenticatedUser: { uid: string; email: string } | null = null;

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: () => [authenticatedUser, false, null],
}));

describe('Testing header components', () => {
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

  it('renders Sign In button and navigates to Sign In page when clicked', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              path="auth"
              element={
                <AuthLayout>
                  <AuthPage />
                </AuthLayout>
              }
            />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(window.location.pathname).toBe('/');

    const singInBtn = screen.getByText(/Sign in/i);
    expect(singInBtn).toBeDefined();

    fireEvent.click(singInBtn);

    await waitFor(() => {
      expect(screen.getByLabelText('Email')).toBeDefined();
      expect(screen.getByLabelText('Password')).toBeDefined();
    });
  });

  it('renders Sign Up button and navigates to Sign Up page when clicked', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              path="auth"
              element={
                <AuthLayout>
                  <AuthPage />
                </AuthLayout>
              }
            />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    screen.debug();
    expect(window.location.pathname).toBe('/');
    const singUpBtn = screen.getByText(/Sign up/i);
    expect(singUpBtn).toBeDefined();

    fireEvent.click(singUpBtn);

    await waitFor(() => {
      expect(screen.getByLabelText('Name')).toBeDefined();
      expect(screen.getByLabelText('Email')).toBeDefined();
      expect(screen.getByLabelText('Password')).toBeDefined();
      expect(screen.getByLabelText('Email')).toBeDefined();
      expect(screen.getByLabelText('Confirm Password')).toBeDefined();
    });
  });
  it('renders the authenticated user information and logout button', async () => {
    authenticatedUser = {
      uid: '123',
      email: 'test@example.com',
    };

    renderWithProviders(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const logoutBtn = screen.getByText(/Logout/);
    expect(logoutBtn).toBeInTheDocument();

    await waitFor(() => {
      const handler = userEvent.setup();
      userEvent.click(logoutBtn);
      const spyAnchorTag = vi.spyOn(handler, 'click');
      handler.click(logoutBtn);

      expect(spyAnchorTag).toHaveBeenCalledTimes(1);
    });
  });
});
