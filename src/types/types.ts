import { ViewUpdate } from '@uiw/react-codemirror';
import { GraphQLSchema } from 'graphql';
import { Path, FieldValues, UseFormRegister } from 'react-hook-form';

export type InputTextProps<T extends FieldValues> = {
  field?: Path<T>;
  labelText?: string;
  type?: string;
  autocomplete?: string;
  error?: string | undefined;
  register?: UseFormRegister<T>;
  password?: string;
  dataTestId?: string;
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
export type DocsProps = {
  schema?: GraphQLSchema;
};

export type TypeNode = {
  name: string;
  description?: string | null;
  fields?: FieldNode[];
  subtypes?: TypeNode[];
};

export type FieldNode = {
  name: string;
  description?: string | null;
  type: TypeNode;
};
