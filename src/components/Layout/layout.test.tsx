import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import WelcomePage from '@/pages/WelcomePage/welcomePage';
import Layout from '../Layout/layout';
import locale from '../../localization/index';
import Docs from '../EditorMain/Docs/docs';
import Header from '../Header/header';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: () => [null, false, null],
}));
vi.mock('@/utils/useWindowScrolled.ts', () => ({
  useWindowScrolled: vi.fn(() => ({ isScrolled: false })),
}));
describe('Testing layout component', () => {
  it('Localization of Welcome page ', async () => {
    const enTitle = locale.en.welcomePage.welcomeTitle;
    const ruTitle = locale.ru.welcomePage.welcomeTitle;

    renderWithProviders(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<WelcomePage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(enTitle)).toBeDefined();

    await userEvent.click(screen.getByText('en'));

    expect(screen.queryByText('ru')).toBeDefined();
    expect(screen.queryByText(ruTitle)).toBeDefined();
  });

  it('Localization of Editor page ', async () => {
    const enDocsInstruction = locale.en.graphiQLPage.docsInstruction;
    const ruDocsInstruction = locale.ru.graphiQLPage.docsInstruction;
    renderWithProviders(
      <MemoryRouter>
        <Header />
        <Docs />
      </MemoryRouter>
    );

    fireEvent.click(await screen.findByText('📒'));

    expect(screen.getByText('Docs')).toBeDefined();
    expect(screen.getByText(enDocsInstruction)).toBeDefined();

    await userEvent.click(screen.getByText('en'));

    expect(screen.queryByText('ru')).toBeDefined();
    expect(screen.queryByText('Документация')).toBeDefined();
    expect(screen.queryByText(ruDocsInstruction)).toBeDefined();
  });
});
