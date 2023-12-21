import classes from '@/components/EditorMain/editorMain.module.css';
import { useLocalization } from '@/hooks/useLocalization';
import { TypeNode } from '@/types/types';
import { FC } from 'react';

type SelectedTypesProps = {
  handleBackClick: () => void;
  handleTypeClick: (name: string) => void;
  selectedType: TypeNode;
};
const SelectedTypes: FC<SelectedTypesProps> = ({ handleBackClick, handleTypeClick, selectedType }) => {
  const { LocalizationData } = useLocalization();
  const { graphiQLPage } = LocalizationData;
  return (
    <div>
      <button className={classes.back} onClick={handleBackClick}>
        {graphiQLPage.back}
      </button>
      <h3>{selectedType.name}</h3>
      <p>{selectedType.description ?? ''}</p>
      {selectedType.fields?.map((field, ind) => (
        <div key={ind}>
          <h4>{field.name}</h4>
          <p>{field.description ?? ''}</p>
          <p>
            Type:{' '}
            <span className={classes.type} onClick={() => handleTypeClick(field.type.name)}>
              {field.type.name}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};
export default SelectedTypes;
