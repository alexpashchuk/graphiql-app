import { useState } from 'react';
import { AxiosError } from 'axios';
import clsx from 'clsx';
import { GraphQLSchema } from 'graphql/type';

import { useGraphqlDataQuery } from '@/services/api.ts';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux.ts';
import { selectGraphql, setQuery } from '@/store/slices/graphqlSlice.tsx';
import { useLocalization } from '@/hooks/useLocalization';

import { extensions } from '@/utils/codemirrorExtensions.ts';
import { parseStringToJSON } from '@/utils/parseStringToJSON.ts';
import QueryEditor from '@/components/QueryEditor/queryEditor.tsx';
import ToolsTab from '@/components/ToolsTab/toolsTab.tsx';
import { Arrow } from '@/constants/constants';
import QueryEndpoint from '@/components/EditorMain/QueryEndpoint/queryEndpoint.tsx';

import classes from './editorMain.module.css';

type EditorMainProps = {
  schema?: GraphQLSchema;
};

const EditorMain = ({ schema }: EditorMainProps) => {
  const dispatch = useAppDispatch();
  const [isOpenTools, setIsOpenTools] = useState(false);
  const [queryResponse, setQueryResponse] = useState('');
  const { LocalizationData } = useLocalization();
  const { graphiQLPage } = LocalizationData;
  const { endpoint, query, headers, variables } = useAppSelector(selectGraphql);

  const onSuccess = <T,>(data: T) => {
    const responseValue = JSON.stringify(data, null, '\t');
    setQueryResponse(responseValue);
  };

  const onError = (error: AxiosError | Error) => {
    if (error instanceof AxiosError) {
      setQueryResponse(JSON.stringify(error.response?.data || error.message, null, '\t'));
    } else {
      setQueryResponse(error.message);
    }
  };

  const { mutate } = useGraphqlDataQuery(onSuccess, onError);

  const handleRunQuery = () => {
    try {
      mutate({
        endpoint,
        query,
        headers: parseStringToJSON(headers || '{}'),
        variables: parseStringToJSON(variables || '{}'),
      });
    } catch (err) {
      setQueryResponse((err as Error).message);
    }
  };

  const onChangeQuery = (value: string) => {
    dispatch(setQuery(value));
  };

  return (
    <div className={classes.main}>
      <div className={classes.sessions}>
        <div className={classes.editor}>
          <div className={classes.iconContainer}>
            <button onClick={handleRunQuery}>
              <i className={classes.iconBtn}>&#10151;</i>
            </button>
            {/*TODO add Prettifying button https://app.asana.com/0/1206001149209373/1206205651066280*/}
            <i className={classes.iconBtn}>&#129529;</i>
          </div>
          <div className={clsx(classes.queryEditorRoot, isOpenTools && classes.queryEditorRootOpen)}>
            <div className={classes.queryEditorWrapper}>
              <QueryEndpoint />
              <QueryEditor
                value=""
                placeholder={graphiQLPage.queryEnter}
                extension={extensions(schema)}
                onChange={onChangeQuery}
              />
            </div>
          </div>
          <div className={clsx(classes.tools, isOpenTools && classes.toolsOpen)}>
            <ToolsTab isOpenTools={isOpenTools} />
            <i className={classes.toolsBtn} onClick={() => setIsOpenTools((isOpenTools) => !isOpenTools)}>
              {isOpenTools ? Arrow.ARROW_UP : Arrow.ARROW_DOWN}
            </i>
          </div>
        </div>
        <div className={classes.response}>
          <QueryEditor value={queryResponse} extension={extensions()} isEditable={false} />
        </div>
      </div>
    </div>
  );
};
export default EditorMain;
