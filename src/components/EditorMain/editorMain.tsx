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
import Button from '@/components/Button/button.tsx';

import classes from './editorMain.module.css';
import { prettifyGraphQL } from '@/helpers/helpers';

type EditorMainProps = {
  schema?: GraphQLSchema;
  isEditor: boolean;
};

const EditorMain = ({ schema, isEditor }: EditorMainProps) => {
  const dispatch = useAppDispatch();
  const [isOpenTools, setIsOpenTools] = useState(false);
  const [editorValue, setEditorValue] = useState('');
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
    setEditorValue(value);
    dispatch(setQuery(value));
  };

  const handlePrettifyQuery = async () => {
    try {
      const formattedCode = prettifyGraphQL(editorValue);

      setEditorValue(formattedCode);
    } catch (error) {
      console.error('Error formatting code:', error);
    }
  };

  return (
    <div className={classes.main}>
      <div className={classes.sessions}>
        <div className={classes.editor}>
          <div className={classes.iconContainer}>
            <Button onClick={handleRunQuery} className={classes.iconBtn} title={graphiQLPage.runQuery}>
              <i>&#10151;</i>
            </Button>
            <Button className={classes.iconBtn} title={graphiQLPage.prettify} onClick={handlePrettifyQuery}>
              <i>&#129529;</i>
            </Button>
          </div>
          <div className={clsx(classes.queryEditorRoot, isOpenTools && classes.queryEditorRootOpen)}>
            <div className={classes.queryEditorWrapper}>
              {isEditor && <QueryEndpoint />}
              {isEditor && (
                <QueryEditor
                  value={editorValue}
                  placeholder={graphiQLPage.queryEnter}
                  extension={extensions(schema)}
                  onChange={onChangeQuery}
                />
              )}
            </div>
          </div>
          <div className={clsx(classes.tools, isOpenTools && classes.toolsOpen)}>
            <ToolsTab isOpenTools={isOpenTools} isEditor={isEditor} />
            <Button
              title={isOpenTools ? graphiQLPage.toolsHide : graphiQLPage.toolsShow}
              className={classes.toolsBtn}
              onClick={() => setIsOpenTools((isOpenTools) => !isOpenTools)}
            >
              <i>{isOpenTools ? Arrow.ARROW_UP : Arrow.ARROW_DOWN}</i>
            </Button>
          </div>
        </div>
        <div className={classes.response}>
          {isEditor && <QueryEditor value={queryResponse} extension={extensions()} isEditable={false} />}
        </div>
      </div>
    </div>
  );
};
export default EditorMain;
