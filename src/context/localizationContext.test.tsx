import { act, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@/test/test-utils';
import { LocalizationContext, LocalizationProvider } from './localizationContext';
import { Locale } from '@/constants/constants';
import { vi } from 'vitest';
const localStorageMock = (() => {
  type StorageType = Record<string, string | null>;

  let store: StorageType = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      if (key === 'LocaleIndex' && value === 'invalid') {
        console.error(`Failed to set ${key} with value ${value}`);
      } else {
        store[key] = value.toString();
      }
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const localeIndex = Object.values(Locale);

describe('LocalizationProvider tests', () => {
  it('renders with the initial locale from localStorage', () => {
    localStorageMock.setItem('LocaleIndex', localeIndex.indexOf(Locale.RU).toString());

    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    const { getByTestId } = renderWithProviders(
      <LocalizationProvider>
        <LocalizationContext.Consumer>
          {({ locale }) => <span data-testid="locale">{locale}</span>}
        </LocalizationContext.Consumer>
      </LocalizationProvider>
    );

    const localeElement = getByTestId('locale');
    expect(localeElement.textContent).toBe(Locale.RU);
    localStorageMock.clear();
  });
  it('switches locale when handleSwitchLocale is called', async () => {
    let renderedResult;

    await act(async () => {
      renderedResult = renderWithProviders(
        <LocalizationProvider>
          <LocalizationContext.Consumer>
            {({ locale, handleSwitchLocale }) => (
              <div>
                <span data-testid="locale">{locale}</span>
                <button onClick={handleSwitchLocale} data-testid="switch-locale-button">
                  Switch Locale
                </button>
              </div>
            )}
          </LocalizationContext.Consumer>
        </LocalizationProvider>
      );
    });

    const localeElement = renderedResult!.getByTestId('locale');
    const switchLocaleButton = renderedResult!.getByTestId('switch-locale-button');

    expect(localeElement.textContent).toBe(Locale.EN);
    localStorageMock.setItem('LocaleIndex', localeIndex.indexOf(Locale.EN).toString());

    await act(async () => {
      switchLocaleButton.click();
    });
    await waitFor(() => {
      expect(localStorageMock.getItem('LocaleIndex')).toBe(localeIndex.indexOf(Locale.RU).toString());
    });

    expect(localeElement.textContent).toBe(Locale.RU);
    localStorageMock.clear();
  });
  it('handles error when setting invalid LocaleIndex', async () => {
    const { getByTestId } = renderWithProviders(
      <LocalizationProvider>
        <LocalizationContext.Consumer>
          {({ handleSwitchLocale }) => (
            <button onClick={handleSwitchLocale} data-testid="switch-locale-button">
              Switch Locale
            </button>
          )}
        </LocalizationContext.Consumer>
      </LocalizationProvider>
    );

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    act(() => {
      fireEvent.click(getByTestId('switch-locale-button'));
    });

    consoleErrorSpy.mockRestore();
    localStorageMock.clear();
  });
});
