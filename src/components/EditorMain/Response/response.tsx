import classes from '@/components/EditorMain/editorMain.module.css';
import ResponseCode from '@/components/ResponseCode/responseCode';
import { useLocalization } from '@/hooks/useLocalization';

const Response = ({ value }: { value: string }) => {
  const { LocalizationData } = useLocalization();
  const { graphiQLPage } = LocalizationData;
  // TODO add Response with CodeMirror
  // CodeMirror https://app.asana.com/0/1206001149209373/1206204401603442
  // Response https://app.asana.com/0/1206001149209373/1206205651066278
  return (
    <div className={classes.response}>
      <h3>{graphiQLPage.response}</h3>
      <ResponseCode response={'code'} />
    </div>
  );
};

export default Response;
