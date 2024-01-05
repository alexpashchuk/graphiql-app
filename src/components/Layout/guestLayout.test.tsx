import { renderWithProviders } from '@/test/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import GuestLayout from '@/components/Layout/guestLayout.tsx';
import EditorPage from '@/pages/EditorPage/editorPage.tsx';
import { screen } from '@testing-library/react';

let authenticatedUser: { uid: string; email: string } | null = null;

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: () => [authenticatedUser, false, null],
}));

describe('Guest Layout test', () => {
  it('renders Guest Layout', async () => {
    authenticatedUser = {
      uid: '123',
      email: 'test@example.com',
    };

    renderWithProviders(
      <MemoryRouter>
        <GuestLayout>
          <EditorPage isEditorExist={false} />
        </GuestLayout>
      </MemoryRouter>
    );

    expect(window.location.pathname).toBe('/');
  });
  it('renders children when user is authenticated', async () => {
    authenticatedUser = {
      uid: '123',
      email: 'test@example.com',
    };

    const { container } = renderWithProviders(
      <MemoryRouter>
        <GuestLayout>
          <EditorPage isEditorExist={false} />
        </GuestLayout>
      </MemoryRouter>
    );
    screen.debug();

    expect(container.textContent).toContain('📒');
  });
  it('redirects to home when user is not authenticated', async () => {
    authenticatedUser = null;

    renderWithProviders(
      <MemoryRouter initialEntries={['/editor']}>
        <Routes>
          <Route
            path="/editor"
            element={
              <GuestLayout>
                <EditorPage isEditorExist={false} />
              </GuestLayout>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(window.location.pathname).toBe('/');
  });
});
