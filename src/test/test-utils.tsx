import React, { PropsWithChildren } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { getStoreWithPreloadedState, RootState } from '../store/store';

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
  const Wrapper: React.FC<PropsWithChildren<object>> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
