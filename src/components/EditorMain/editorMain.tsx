import { FC, useState } from 'react';
import classes from './editorMain.module.css';
import Tabs from '../Tabs/tabs';
import { useLocalization } from '@/hooks/useLocalization';
import { EditorMainProps } from '@/types/types';

const EditorMain: FC<EditorMainProps> = ({ isOpenDoc }) => {
  const [isOpenTools, setIsOpenTools] = useState(false);
  const { LocalizationData } = useLocalization();
  const { graphiQLPage } = LocalizationData;
  return (
    <div className={classes.main}>
      {isOpenDoc && (
        <div className={classes.docs}>
          <h2>{graphiQLPage.docs}</h2>
          <p>{graphiQLPage.docsInstruction}</p>
        </div>
      )}

      <div className={classes.sessions}>
        <div className={classes.editor}>
          <div className={classes.iconContainer}>
            <i className={classes.iconBtn}>&#10151;</i>
            <i className={classes.iconBtn}>&#129529;</i>
          </div>
          <div>
            <h3>Editor</h3>
          </div>

          <div className={classes.tools}>
            <Tabs isOpenTools={isOpenTools} />
            <i className={classes.toolsBtn} onClick={() => setIsOpenTools(!isOpenTools)}>
              {isOpenTools ? '\u25B2' : '\u25BC'}
            </i>
          </div>
        </div>
        <div className={classes.response}>
          <h3>Response</h3>
        </div>
      </div>
    </div>
  );
};
export default EditorMain;
