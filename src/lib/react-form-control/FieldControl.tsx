import React, { useContext, useCallback } from "react";

import { FieldContext } from "./FormGroupContext";
import { FormControl } from "./FormControl";

export interface FieldControlChildrenProps {
  control: FormControl<any>;
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

  const control  = formGroup.controls[name];
  const setValue = useCallback((value: any) => formGroup.setValue(name, value), [name]);
  return children({
    control,
    setValue,
  });
};