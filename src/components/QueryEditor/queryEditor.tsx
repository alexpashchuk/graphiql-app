import CodeMirror, { Extension } from '@uiw/react-codemirror';
import { customTheme } from '@/utils/codemirrorExtensions.ts';
import classes from './queryEditor.module.css';

type QueryEditorProps = {
  value: string;
  placeholder?: string;
  extension: Extension[];
  onChange?: (value: string) => void;
  isEditable?: boolean;
};

const QueryEditor = (props: QueryEditorProps) => {
  const { value, placeholder, extension, onChange, isEditable = true } = props;

  return (
    <CodeMirror
      className={classes.editor}
      height="100%"
      value={value}
      placeholder={placeholder}
      extensions={extension}
      onChange={onChange}
      editable={isEditable}
      theme={customTheme}
    />
  );
};
export default QueryEditor;
