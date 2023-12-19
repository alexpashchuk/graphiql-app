import { useLocalization } from '@/hooks/useLocalization.ts';
import { GraphQLSchema } from 'graphql/type';
import classes from '@/components/EditorMain/editorMain.module.css';

type DocsProps = {
  schema: GraphQLSchema | undefined;
};

const Docs = ({ schema }: DocsProps) => {
  const { LocalizationData } = useLocalization();
  const { graphiQLPage } = LocalizationData;

  // TODO queryType navigation https://app.asana.com/0/1206001149209373/1206205253821605
  const queryType = schema?.getQueryType();
  const typeMap = schema?.getTypeMap();

  return (
    <div className={classes.docs}>
      <h2>{graphiQLPage.docs}</h2>
      <p>{graphiQLPage.docsInstruction}</p>
      {schema ? (
        <div>
          <p>{queryType?.name}</p>
          {typeMap && Object.values(typeMap).map((type) => <p key={type.name}>{type.name}</p>)}
        </div>
      ) : (
        <div>Docs not found</div>
      )}
    </div>
  );
};

export default Docs;
