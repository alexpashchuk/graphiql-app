import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routes } from '@/routes/routes.tsx';

describe('NotFoundPage tests', () => {
  it('the 404 page is displayed when navigating to an invalid route', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/404'],
    });

    render(<RouterProvider router={router} />);

    const titleElement = screen.getByRole('heading');
    expect(titleElement).toBeInTheDocument();

    const textElement = screen.getByText(/Page not found/i);
    expect(textElement).toBeInTheDocument();

    const buttonElement = screen.getByRole('link', { name: /Back Home/i });
    expect(buttonElement).toBeInTheDocument();
  });
});
