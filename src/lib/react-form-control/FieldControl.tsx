import React from "react";
import { ValidatorErrors } from "./Validators";
import { useFormControl } from "./useFormControl";

export interface FieldControlChildrenProps {
  value: any;
  pristine: boolean;
  dirty: boolean;
  touched: boolean;
  untouched: boolean;
  errors: ValidatorErrors;
  setValue: (value: any) => void;
}

interface FieldControlProps {
  name: string;
  children: React.FC<FieldControlChildrenProps>;
}

export const FieldControl: React.FC<FieldControlProps> = (props: FieldControlProps) => {
  const { name, children } = props;
  const { value, errors, setValue, ...meta } = useFormControl(name);
  return children({
    value,
    errors,
    setValue,
    ...meta,
  });
};
