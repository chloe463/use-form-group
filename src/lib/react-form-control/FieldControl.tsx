import React, { useContext } from "react";

import { FieldContext } from "./FormGroupContext";
import { FormControl } from "./FormControl";
import { Field } from "./Field";

interface FieldControlProps {
  name?: string;
  control?: FormControl<any>;
  render: React.FC<any>;
  onChange?: (e: React.SyntheticEvent<any>)  => void;
  onFocus?: (e: React.SyntheticEvent<any>)  => void;
  onBlur?: (e: React.SyntheticEvent<any>)  => void;
}

export const FieldControl: React.FC<FieldControlProps> = (props: FieldControlProps) => {
  const formGroup = useContext(FieldContext);
  const control = formGroup!.getControl(props.name as string);
  return <Field {...props} control={control} />
};