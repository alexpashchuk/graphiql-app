import React, { PropsWithChildren } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { getStoreWithPreloadedState, RootState } from '../store/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: ReturnType<typeof getStoreWithPreloadedState>;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = getStoreWithPreloadedState(preloadedState as RootState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  const queryClient = new QueryClient();
  const Wrapper: React.FC<PropsWithChildren<object>> = ({ children }) => {
    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </Provider>
    );
  };
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
