import { FC, useState } from 'react';

import { Arrow } from '@/constants/constants';
import Response from '@/components/EditorMain/Response/response.tsx';
import Tabs from '@/components/Tabs/tabs.tsx';
import QueryBody from '@/components/EditorMain/QueryBody/queryBody.tsx';

import { useGraphqlDataQuery } from '@/services/api.ts';
import { useAppSelector } from '@/hooks/useRedux.ts';
import { selectGraphql } from '@/store/slices/graphqlSlice.tsx';

import classes from './editorMain.module.css';

import { useLocalization } from '@/hooks/useLocalization';
import { EditorMainProps } from '@/types/types';
import GraphqlEditor from '../EditorMirror/graphqlEditor';
import { ViewUpdate } from '@uiw/react-codemirror';
import ResponseCode from '../ResponseCode/responseCode';

const EditorMain: FC<EditorMainProps> = ({ isOpenDoc }) => {
  const [isOpenTools, setIsOpenTools] = useState(false);
  const { LocalizationData } = useLocalization();
  const { graphiQLPage } = LocalizationData;
  const [code, setCode] = useState('{ hello }');
  const [queryResponse, setQueryResponse] = useState('');
  const { endpoint } = useAppSelector(selectGraphql);

  const onSuccess = <T,>(data: T) => {
    const responseValue = JSON.stringify(data, null, '\t');
    setQueryResponse(responseValue);
  };

  const { mutate } = useGraphqlDataQuery(onSuccess);

  const handleRunQuery = () => {
    // TODO add query headers variables
    // Query Editor https://app.asana.com/0/1206001149209373/1206205253821612
    // Headers and Variables https://app.asana.com/0/1206001149209373/1206205253821616
    mutate({
      endpoint,
      query:
        'query getAllCharacters($page: Int, $filter: FilterCharacter) {\n' +
        '  characters(page: $page, filter: $filter) {\n' +
        '    info {\n' +
        '      count\n' +
        '    }\n' +
        '    results {\n' +
        '      id\n' +
        '      name\n' +
        '    }\n' +
        '  }\n' +
        '}',
      headers: '',
      variables: '',
    });
  };

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
            <button onClick={handleRunQuery}>
              <i className={classes.iconBtn}>&#10151;</i>
            </button>
            {/*TODO add Prettifying button https://app.asana.com/0/1206001149209373/1206205651066280*/}
            <i className={classes.iconBtn}>&#129529;</i>
          </div>
          <QueryBody />
          <h3>{graphiQLPage.editor}</h3>
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
        <Response value={queryResponse} />
        <div className={classes.response}>
          <h3>{graphiQLPage.response}</h3>
          <ResponseCode response={'code'} />
        </div>
      </div>
    </div>
  );
};
export default EditorMain;
