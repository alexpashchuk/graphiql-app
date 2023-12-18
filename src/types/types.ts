import { Path, FieldValues, UseFormRegister } from 'react-hook-form';

export type InputTextProps<T extends FieldValues> = {
  field?: Path<T>;
  labelText?: string;
  type?: string;
  autocomplete?: string;
  error?: string | undefined;
  register?: UseFormRegister<T>;
  password?: string;
  isProgress?: boolean;
};
