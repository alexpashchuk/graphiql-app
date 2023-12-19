import { FC, useState } from 'react';
import classes from './editorMain.module.css';
import Tabs from '../Tabs/tabs';
import { useLocalization } from '@/hooks/useLocalization';
import { EditorMainProps } from '@/types/types';
import { Arrow } from '@/constants/constants';
import GraphqlEditor from '../EditorMirror/graphqlEditor';
import { ViewUpdate } from '@uiw/react-codemirror';
import ResponseCode from '../ResponseCode/responseCode';

const EditorMain: FC<EditorMainProps> = ({ isOpenDoc }) => {
  const [isOpenTools, setIsOpenTools] = useState(false);
  const { LocalizationData } = useLocalization();
  const { graphiQLPage } = LocalizationData;
  const [code, setCode] = useState('{ hello }');

  const handlerChange = (value: string, viewUpdate: ViewUpdate) => {
    setCode(value);
    console.log('viewUpdate', viewUpdate);
  };

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
          <h3>Editor</h3>
          <div className={classes.editorCode}>
            <GraphqlEditor initialValue={code} handlerChange={handlerChange} />
          </div>

          <div className={classes.tools}>
            <Tabs isOpenTools={isOpenTools} />
            <i className={classes.toolsBtn} onClick={() => setIsOpenTools((isOpenTools) => !isOpenTools)}>
              {isOpenTools ? Arrow.ARROW_UP : Arrow.ARROW_DOWN}
            </i>
          </div>
        </div>
        <div className={classes.response}>
          <h3>Response</h3>
          <ResponseCode response={'code'} />
        </div>
      </div>
    </div>
  );
};
export default EditorMain;
