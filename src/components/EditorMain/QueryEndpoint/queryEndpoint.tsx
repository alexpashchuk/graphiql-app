import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch } from '@/hooks/useRedux.ts';
import { setEndpoint } from '@/store/slices/graphqlSlice.tsx';
import Button from '@/components/Button/button.tsx';
import { BASE_URL, ButtonType } from '@/constants/constants.ts';
import EndpointLogo from '@/assets/icons/endpoint.svg';
import { useLocalization } from '@/hooks/useLocalization.ts';

import classes from './queryEndpoint.module.css';

const QueryEndpoint = () => {
  const [value, setValue] = useState(BASE_URL);
  const dispatch = useAppDispatch();
  const { LocalizationData } = useLocalization();
  const { graphiQLPage } = LocalizationData;

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setEndpoint(value));
  };

  return (
    <form className={classes.queryForm} onSubmit={handleSubmit} data-testid="query-form">
      <input
        className={classes.queryUrl}
        type="text"
        placeholder={graphiQLPage.endpointEnter}
        value={value}
        onChange={onInputChange}
      />
      <Button type={ButtonType.SUBMIT} title={graphiQLPage.endpointSubmit}>
        <EndpointLogo />
      </Button>
    </form>
  );
};

export default QueryEndpoint;
