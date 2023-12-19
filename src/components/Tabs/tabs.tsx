import { FC, useState } from 'react';
import classes from './tabs.module.css';
import { TabEnum } from '@/constants/constants';
import clsx from 'clsx';
import { ViewUpdate } from '@uiw/react-codemirror';
import GraphqlEditor from '../EditorMirror/graphqlEditor';

interface TabsProps {
  isOpenTools: boolean;
}
const Tabs: FC<TabsProps> = ({ isOpenTools }) => {
  const [activeTab, setActiveTab] = useState(TabEnum.VARIABLES);
  const [codeContent, setCodeContent] = useState({
    Variables: '{Variables content}',
    Headers: '{Headers content}',
  });

  const handleTabClick = (tab: TabEnum) => {
    setActiveTab(tab);
  };

  const handleCodeChange = (value: string, viewUpdate: ViewUpdate, tab?: string) => {
    setCodeContent({
      ...codeContent,
      [tab as string]: value,
    });
  };

  return (
    <>
      <div>
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
          {activeTab === TabEnum.VARIABLES && (
            <GraphqlEditor initialValue={codeContent.Variables} handlerChange={handleCodeChange} />
          )}
          {activeTab === TabEnum.HEADERS && (
            <GraphqlEditor initialValue={codeContent.Headers} handlerChange={handleCodeChange} />
          )}
        </div>
      )}
    </>
  );
};

export default Tabs;
