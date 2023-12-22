import { useState } from 'react';
import clsx from 'clsx';

import { useLocalization } from '@/hooks/useLocalization.ts';
import { DocsProps, TypeNode } from '@/types/types';
import { buildTypeHierarchy } from '@/helpers/helpers';
import Button from '@/components/Button/button.tsx';
import TypesMap from './typesMap';
import SelectedTypes from './selectedTypes';
import { GraphQLObjectType } from 'graphql/type';

import classes from './docs.module.css';

const Docs = ({ schema }: DocsProps) => {
  const { LocalizationData } = useLocalization();
  const { graphiQLPage } = LocalizationData;
  const [selectedType, setSelectedType] = useState<TypeNode | null>(null);
  const [typeHistory, setTypeHistory] = useState<TypeNode[]>([]);
  const [isOpenDoc, setIsOpenDoc] = useState(false);

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
    <div className={clsx(classes.sidebar, isOpenDoc && classes.activeSidebar)}>
      <Button
        title={isOpenDoc ? graphiQLPage.docsHide : graphiQLPage.docsShow}
        className={clsx(classes.iconBtn, isOpenDoc && classes.activeDoc)}
        onClick={() => setIsOpenDoc((isOpenDoc) => !isOpenDoc)}
      >
        <i>&#128210;</i>
      </Button>
      {isOpenDoc && (
        <div className={classes.docs}>
          <h2>{graphiQLPage.docs}</h2>
          <p className={classes.about}>{graphiQLPage.docsInstruction}</p>
          {schema ? <>{docsTypes}</> : <>{graphiQLPage.docsNotFound}</>}
        </div>
      )}
    </div>
  );
};

export default Docs;
