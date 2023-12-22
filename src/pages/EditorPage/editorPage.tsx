import { useState } from 'react';
import clsx from 'clsx';

import EditorMain from '@/components/EditorMain/editorMain.tsx';
import Docs from '@/components/EditorMain/Docs/docs.tsx';
import { useAppSelector } from '@/hooks/useRedux.ts';
import { selectGraphql } from '@/store/slices/graphqlSlice.tsx';
import { useSchemaQuery } from '@/services/api.ts';

import classes from './editorPage.module.css';

const EditorPage = () => {
  const [isOpenDoc, setIsOpenDoc] = useState(false);
  const { endpoint } = useAppSelector(selectGraphql);

  const { data: schema } = useSchemaQuery(endpoint);

  return (
    <section className={classes.root}>
      <div className={classes.container}>
        <div className={classes.sidebar}>
          <button onClick={() => setIsOpenDoc((isOpenDoc) => !isOpenDoc)}>
            <i className={clsx(classes.iconBtn, isOpenDoc && classes.activeDoc)}>&#128210;</i>
          </button>
        </div>
        {isOpenDoc && <Docs schema={schema} />}
        <EditorMain schema={schema} />
      </div>
    </section>
  );
};

export default EditorPage;
