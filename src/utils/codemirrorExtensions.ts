import { GraphQLSchema } from 'graphql/type';
import { graphql } from 'cm6-graphql';
import { acceptCompletion, autocompletion } from '@codemirror/autocomplete';
import { keymap, Prec } from '@uiw/react-codemirror';
import { jsonLanguage } from '@codemirror/lang-json';

export const extensions = (schema?: GraphQLSchema) => [
  schema ? graphql(schema) : jsonLanguage,
  autocompletion(),
  Prec.high(
    keymap.of([
      {
        key: 'Tab',
        run: acceptCompletion,
      },
    ])
  ),
];
