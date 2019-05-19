import React, { useContext } from "react";

import { FieldContext } from "./FormGroupContext";
import { ValidatorErrors } from "./Validators";

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
  const formGroup = useContext(FieldContext);
  if (formGroup === null) {
    throw new Error([
      'Could not find "formGroup" in context.',
      'Wrap the root component in a <FormGroupProvider>.'
    ].join(' '));
  }

  const { values, metaInfos, errors } = formGroup;
  const setValue = (value: any) => formGroup.setValue({ [name]: value });
  return children({
    value: values[name],
    ...metaInfos[name],
    errors: errors ? errors[name] : null,
    setValue,
  });
};