import { vi } from 'vitest';
import { renderWithProviders } from '@/test/test-utils.tsx';
import { waitFor } from '@testing-library/react';
import { TabEnum } from '@/constants/constants.ts';
import { BrowserRouter } from 'react-router-dom';
import ToolsTab from '@/components/ToolsTab/toolsTab.tsx';
import userEvent from '@testing-library/user-event';

const setState = {
  activeTab: TabEnum.VARIABLES,
  setActiveTab: (activeTab: TabEnum) => {
    setState.activeTab = activeTab;
  },
};

vi.mock('react', async () => {
  const actual = await vi.importActual<typeof import('react')>('react');
  return {
    ...actual,
    useState: vi.fn(() => [setState.activeTab, setState.setActiveTab]),
  };
});

describe('Tools Tab test', () => {
  it('change variables / headers view', async () => {
    const wrapper = renderWithProviders(
      <BrowserRouter>
        <ToolsTab isOpenTools={false} />
      </BrowserRouter>
    );

    const VariablesButton = wrapper.queryByText(TabEnum.VARIABLES) as HTMLButtonElement;
    const HeadersButton = wrapper.getByText(TabEnum.HEADERS) as HTMLButtonElement;

    await waitFor(() => userEvent.click(VariablesButton));
    expect(setState.activeTab).toEqual(TabEnum.VARIABLES);

    await waitFor(() => userEvent.click(HeadersButton));
    expect(setState.activeTab).toEqual(TabEnum.HEADERS);
  });
});
