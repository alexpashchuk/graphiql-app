import { ViewUpdate } from '@uiw/react-codemirror';
import { Path, FieldValues, UseFormRegister } from 'react-hook-form';

export type InputTextProps<T extends FieldValues> = {
  field?: Path<T>;
  labelText?: string;
  type?: string;
  autocomplete?: string;
  error?: string | undefined;
  register?: UseFormRegister<T>;
  password?: string;
  isProgress?: boolean;
};

export type EditorMainProps = {
  isOpenDoc: boolean;
};

export type EditorProps = {
  initialValue: string;
  handlerChange: (value: string, viewUpdate: ViewUpdate, tab?: string) => void;
};

export type ResponseProps = {
  response: string;
};
