import { GraphQLSchema } from 'graphql/type';
import { graphql } from 'cm6-graphql';
import { acceptCompletion, autocompletion } from '@codemirror/autocomplete';
import { EditorView, keymap, Prec } from '@uiw/react-codemirror';
import { jsonLanguage } from '@codemirror/lang-json';
import { tags as t } from '@lezer/highlight';
import createTheme from '@uiw/codemirror-themes';

export const extensions = (schema?: GraphQLSchema) => [
  schema ? graphql(schema) : jsonLanguage,
  autocompletion(),
  EditorView.lineWrapping,
  Prec.high(
    keymap.of([
      {
        key: 'Tab',
        run: acceptCompletion,
      },
    ])
  ),
];

export const customTheme = createTheme({
  theme: 'light',
  settings: {
    background: 'var(--color-light)',
    foreground: 'var(--color-dark)',
    caret: 'var(--color-dark)',
    selection: '#80C7FF',
    gutterBackground: '#FFFFFF',
    gutterForeground: '#00000070',
    lineHighlight: '#C1E2F8',
  },
  styles: [
    { tag: t.comment, color: '#AAAAAA' },
    {
      tag: [t.keyword, t.operator, t.typeName, t.tagName, t.propertyName],
      color: 'var(--color-accent)',
      fontWeight: 'bold',
    },
    {
      tag: [t.attributeName, t.definition(t.propertyName)],
      color: '#008e9b',
    },
    {
      tag: [t.className, t.string, t.special(t.brace)],
      color: '#CF4F5F',
    },
    {
      tag: t.number,
      color: '#CF4F5F',
      fontWeight: 'bold',
    },
    {
      tag: t.variableName,
      fontWeight: 'bold',
    },
  ],
});
