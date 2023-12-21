import { useState } from 'react';
import { useLocalization } from '@/hooks/useLocalization.ts';
import classes from '@/components/EditorMain/editorMain.module.css';
import { DocsProps, TypeNode } from '@/types/types';
import { buildTypeHierarchy } from '@/helpers/helpers';
import TypesMap from './typesMap';
import SelectedTypes from './selectedTypes';
import { GraphQLObjectType } from 'graphql/type';

const Docs = ({ schema }: DocsProps) => {
  const { LocalizationData } = useLocalization();
  const { graphiQLPage } = LocalizationData;
  const [selectedType, setSelectedType] = useState<TypeNode | null>(null);
  const [typeHistory, setTypeHistory] = useState<TypeNode[]>([]);

  const handleTypeClick = (typeName: string) => {
    if (schema) {
      if (typeName === 'Query' && schema.getType(typeName) instanceof GraphQLObjectType) {
        if (!selectedType) {
          const selectedType = schema.getType(typeName);
          if (selectedType) {
            const typeNode = buildTypeHierarchy(selectedType, new Set());
            setTypeHistory((prevHistory) => [...prevHistory, typeNode]);
            setSelectedType(typeNode);
          }
        }
      } else {
        const selectedType = schema.getType(typeName);
        if (selectedType) {
          const typeNode = buildTypeHierarchy(selectedType, new Set());
          setTypeHistory((prevHistory) => [...prevHistory, typeNode]);
          setSelectedType(typeNode);
        }
      }
    }
  };

  const handleBackClick = () => {
    if (typeHistory.length > 1) {
      const previousTypes = [...typeHistory];
      previousTypes.pop();
      setTypeHistory(previousTypes);
      setSelectedType(previousTypes[previousTypes.length - 1]);
    } else {
      setSelectedType(null);
      setTypeHistory([]);
    }
  };
  const docsTypes = selectedType ? (
    <SelectedTypes handleBackClick={handleBackClick} handleTypeClick={handleTypeClick} selectedType={selectedType} />
  ) : (
    <TypesMap schema={schema} handleTypeClick={handleTypeClick} />
  );

  return (
    <div className={classes.docs}>
      <h2>{graphiQLPage.docs}</h2>
      <p className={classes.about}>{graphiQLPage.docsInstruction}</p>
      {schema ? <>{docsTypes}</> : <>{graphiQLPage.docsNotFound}</>}
    </div>
  );
};

export default Docs;
