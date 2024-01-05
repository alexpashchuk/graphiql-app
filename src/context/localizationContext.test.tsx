import { act } from '@testing-library/react';
import { renderWithProviders } from '@/test/test-utils';
import { LocalizationContext, LocalizationProvider } from './localizationContext';

describe('LocalizationProvider tests', () => {
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

    expect(localeElement.textContent).toBe('en');

    await act(async () => {
      switchLocaleButton.click();
    });

    expect(localeElement.textContent).toBe('ru');
  });
});
