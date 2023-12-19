import GraphqlEditor from '@/components/EditorMirror/graphqlEditor';
import { useLocalization } from '@/hooks/useLocalization';
import { ViewUpdate } from '@uiw/react-codemirror';
import { useState } from 'react';
import classes from './queryBody.module.css';

const QueryBody = () => {
  const { LocalizationData } = useLocalization();
  const { graphiQLPage } = LocalizationData;
  const [code, setCode] = useState('{ hello }');
  const handlerChange = (value: string, viewUpdate: ViewUpdate) => {
    setCode(value);
    console.log('viewUpdate', viewUpdate);
  };
  // TODO add Query Editor https://app.asana.com/0/1206001149209373/1206205253821612
  return (
    <>
      <h3>{graphiQLPage.editor}</h3>
      <div className={classes.editorCode}>
        <GraphqlEditor initialValue={code} handlerChange={handlerChange} />
      </div>
    </>
  );
};

export default QueryBody;
