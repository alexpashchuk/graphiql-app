import EditorMain from '@/components/EditorMain/editorMain.tsx';
import Docs from '@/components/EditorMain/Docs/docs.tsx';
import { useAppSelector } from '@/hooks/useRedux.ts';
import { selectGraphql } from '@/store/slices/graphqlSlice.tsx';
import { useSchemaQuery } from '@/services/api.ts';

import classes from './editorPage.module.css';
type EditorPageProps = {
  isEditorExist?: boolean;
};
const EditorPage = ({ isEditorExist = true }: EditorPageProps) => {
  const { endpoint } = useAppSelector(selectGraphql);
  const { data: schema } = useSchemaQuery(endpoint);

  return (
    <section className={classes.root}>
      <div className={classes.container}>
        <Docs schema={schema} />
        <EditorMain schema={schema} isEditor={isEditorExist} />
      </div>
    </section>
  );
};

export default EditorPage;
