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

const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <WelcomePage />,
      },
      {
        path: '/auth',
        element: (
          <AuthLayout>
            <AuthPage />
          </AuthLayout>
        ),
      },
      {
        path: '/editor',
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
