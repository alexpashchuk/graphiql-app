import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './header';
import { renderWithProviders } from '@/test/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: () => [null, false, null],
}));
vi.mock('@/utils/useWindowScrolled.ts', () => ({
  useWindowScrolled: vi.fn(() => ({ isScrolled: false })),
}));
describe('Testing header components', () => {
  it('Localization of the header component', async () => {
    renderWithProviders(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getAllByText('Sign in')).toBeDefined();
    expect(screen.getAllByText('Sign up')).toBeDefined();
    screen.debug();

    await userEvent.click(screen.getByText('en'));

    expect(screen.queryByText('ru')).toBeDefined();
    expect(screen.queryByText('Вход')).toBeDefined();
    expect(screen.queryByText('Регистрация')).toBeDefined();
  });
});
