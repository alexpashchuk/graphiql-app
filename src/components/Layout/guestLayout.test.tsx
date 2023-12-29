import { renderWithProviders } from '@/test/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import GuestLayout from '@/components/Layout/guestLayout.tsx';
import EditorPage from '@/pages/EditorPage/editorPage.tsx';

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
});
