import { ResponseProps } from '@/types/types';
import { FC } from 'react';

const ResponseCode: FC<ResponseProps> = ({ response }) => {
  return <pre>{response}</pre>;
};
export default ResponseCode;
