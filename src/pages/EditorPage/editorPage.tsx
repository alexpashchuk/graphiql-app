import { useState } from 'react';
import classes from './editorPage.module.css';
import EditorMain from '@/components/EditorMain/editorMain';
import InputText from '@/components/InputText/inputText';

const EditorPage = () => {
  const [isOpenDoc, setIsOpenDoc] = useState(false);
  return (
    <section className={classes.root}>
      <div className={classes.inputContainer}>
        <InputText />
      </div>

      <div className={classes.container}>
        <div className={classes.sidebar}>
          <i
            className={`${classes.iconBtn} ${isOpenDoc && classes.activeDoc}`}
            onClick={() => setIsOpenDoc(!isOpenDoc)}
          >
            &#128210;
          </i>
        </div>
        <EditorMain isOpenDoc={isOpenDoc} />
      </div>
    </section>
  );
};

export default EditorPage;
