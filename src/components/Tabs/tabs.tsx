import { FC, useEffect, useRef, useState } from 'react';
import classes from './tabs.module.css';
import { TabEnum } from '@/constants/constants';
import clsx from 'clsx';

interface TabsProps {
  isOpenTools: boolean;
}
const Tabs: FC<TabsProps> = ({ isOpenTools }) => {
  const [activeTab, setActiveTab] = useState(TabEnum.VARIABLES);
  const [codeContent, setCodeContent] = useState({
    Variables: '',
    Headers: '',
  });
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    if (isOpenTools) {
      textAreaRef.current?.focus();
    }
  }, [isOpenTools]);

  const handleTabClick = (tab: TabEnum) => {
    setActiveTab(tab);
  };

  const handleCodeChange = (tab: string, content: string) => {
    setCodeContent({
      ...codeContent,
      [tab]: content,
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
        <div>
          {activeTab === TabEnum.VARIABLES && (
            <textarea
              className={classes.textarea}
              ref={textAreaRef}
              placeholder="variables content"
              value={codeContent.Variables}
              onChange={(e) => handleCodeChange(TabEnum.VARIABLES, e.target.value)}
            />
          )}
          {activeTab === TabEnum.HEADERS && (
            <textarea
              className={classes.textarea}
              ref={textAreaRef}
              placeholder="headers content"
              value={codeContent.Headers}
              onChange={(e) => handleCodeChange(TabEnum.HEADERS, e.target.value)}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Tabs;
