import { ChangeEvent, useState } from 'react';
import clsx from 'clsx';

import EditorMain from '@/components/EditorMain/editorMain.tsx';
import Docs from '@/components/EditorMain/Docs/docs.tsx';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux.ts';
import { selectGraphql, setEndpoint } from '@/store/slices/graphqlSlice.tsx';
import { useSchemaQuery } from '@/services/api.ts';

import classes from './editorPage.module.css';

const EditorPage = () => {
  const [isOpenDoc, setIsOpenDoc] = useState(false);
  const { endpoint } = useAppSelector(selectGraphql);
  const dispatch = useAppDispatch();

  const { data: schema } = useSchemaQuery(endpoint);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEndpoint(e.target.value));
  };

  return (
    <section className={classes.root}>
      <input type="text" value={endpoint} onChange={onInputChange} />
      <div className={classes.container}>
        <div className={classes.sidebar}>
          <i
            className={clsx(classes.iconBtn, isOpenDoc && classes.activeDoc)}
            onClick={() => setIsOpenDoc((isOpenDoc) => !isOpenDoc)}
          >
            &#128210;
          </i>
        </div>
        {isOpenDoc && <Docs schema={schema} />}
        <EditorMain isOpenDoc={isOpenDoc} />
      </div>
    </section>
  );
};

export default EditorPage;
