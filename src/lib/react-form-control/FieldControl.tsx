import React, { Component, useEffect } from "react";

import { Consumer } from "./FieldContext";
import { FormControl } from "./FormControl";
import { Field } from "./Field";

interface FieldControlProps {
  name?: string;
  control?: FormControl;
  render: React.FC<any>;
  onChange?: (e: React.SyntheticEvent<any>)  => void;
  onFocus?: (e: React.SyntheticEvent<any>)  => void;
  onBlur?: (e: React.SyntheticEvent<any>)  => void;
}

export const FieldControl: React.FC<FieldControlProps> = (props: FieldControlProps) => {
  return (
    <Consumer>
      {contextValue => {
        const control: FormControl = contextValue.formGroup!.getControl(props.name as string);
        return <Field {...props} context={contextValue} control={control} />
      }}
    </Consumer>
  );
};