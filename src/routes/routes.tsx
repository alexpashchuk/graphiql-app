import { createBrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from '@/components/ErrorBoundary/errorBoundary.tsx';
import Layout from '@/components/Layout/layout.tsx';
import AuthLayout from '@/components/Layout/authLayout.tsx';
import GuestLayout from '@/components/Layout/guestLayout.tsx';
import WelcomePage from '@/pages/WelcomePage/welcomePage.tsx';
import AuthPage from '@/pages/AuthPage/authPage.tsx';
import EditorPage from '@/pages/EditorPage/editorPage.tsx';
import NotFoundPage from '@/pages/NotFoundPage/notFoundPage.tsx';
import ErrorPage from '@/pages/ErrorPage/errorPage.tsx';
import { paths } from '@/constants/constants.ts';

const routes = [
  {
    path: paths.welcome,
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <WelcomePage />,
      },
      {
        path: paths.auth,
        element: (
          <AuthLayout>
            <AuthPage />
          </AuthLayout>
        ),
      },
      {
        path: paths.main,
        element: (
          <GuestLayout>
            <EditorPage />
          </GuestLayout>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
].map((route) => ({
  ...route,
  element: <ErrorBoundary fallback={<ErrorPage />}>{route.element}</ErrorBoundary>,
}));

export const router = createBrowserRouter(routes);
