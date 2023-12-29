import { useState } from 'react';
import clsx from 'clsx';

import { TabEnum } from '@/constants/constants';
import QueryEditor from '@/components/QueryEditor/queryEditor.tsx';
import { extensions } from '@/utils/codemirrorExtensions.ts';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux.ts';
import { selectGraphql, setHeaders, setVariables } from '@/store/slices/graphqlSlice.tsx';

import classes from './toolsTab.module.css';
import { boolean } from 'yup';

type ToolsTabProps = {
  isOpenTools: boolean;
  isEditor?: boolean;
};

const ToolsTab = ({ isOpenTools, isEditor }: ToolsTabProps) => {
  const dispatch = useAppDispatch();
  const { headers, variables } = useAppSelector(selectGraphql);
  const [activeTab, setActiveTab] = useState(TabEnum.VARIABLES);

  const handleVariablesChange = (value: string) => {
    dispatch(setVariables(value));
  };
  const handleHeadersChange = (value: string) => {
    dispatch(setHeaders(value));
  };

  const handleTabClick = (tab: TabEnum) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className={classes.headerTools}>
        <button
          className={clsx(classes.tab, activeTab === TabEnum.VARIABLES && classes.active)}
          onClick={() => handleTabClick(TabEnum.VARIABLES)}
        >
          {TabEnum.VARIABLES}
        </button>
        <button
          className={clsx(classes.tab, activeTab === TabEnum.HEADERS && classes.active)}
          onClick={() => handleTabClick(TabEnum.HEADERS)}
        >
          {TabEnum.HEADERS}
        </button>
      </div>
      {isOpenTools && (
        <div className={classes.editorTools}>
          {activeTab === TabEnum.VARIABLES && isEditor && (
            <QueryEditor value={variables} onChange={handleVariablesChange} extension={extensions()} />
          )}
          {activeTab === TabEnum.HEADERS && isEditor && (
            <QueryEditor value={headers} onChange={handleHeadersChange} extension={extensions()} />
          )}
        </div>
      )}
    </>
  );
};

export default ToolsTab;
