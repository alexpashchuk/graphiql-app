import { FC } from 'react';
import { useLocalization } from '@/hooks/useLocalization';
import { GraphQLSchema } from 'graphql/type';

import classes from './docs.module.css';

type TypesMapProps = {
  schema?: GraphQLSchema;
  handleTypeClick: (name: string) => void;
};

const TypesMap: FC<TypesMapProps> = ({ schema, handleTypeClick }) => {
  const { LocalizationData } = useLocalization();
  const { graphiQLPage } = LocalizationData;
  const queryType = schema?.getQueryType();
  const typeMap = schema?.getTypeMap();

  return (
    <>
      <h3 className={classes.subtitle}>&#10004; {graphiQLPage.rootType}</h3>
      <p>
        query:{' '}
        <span className={classes.type} onClick={() => handleTypeClick(queryType!.name)}>
          {queryType?.name}
        </span>
      </p>
      <div>
        <h3 className={classes.subtitle}>&#10004; {graphiQLPage.schemaTypes}</h3>
        {Object.values(typeMap!)
          .filter((type) => !type.name.startsWith('_') && type.name !== 'Query')
          .map((type, ind) => (
            <div key={ind}>
              <p className={classes.type} onClick={() => handleTypeClick(type.name)}>
                {type.name}
              </p>
            </div>
          ))}
      </div>
    </>
  );
};
export default TypesMap;
