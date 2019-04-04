import React, { Component } from "react";

import { FormControl } from "./FormControl";

export interface FieldProps {
  name?: string;
  control: FormControl;
  render: React.FunctionComponent<any>;
  onChange?: (e: React.SyntheticEvent<any>)  => void;
  onFocus?: (e: React.SyntheticEvent<any>)  => void;
  onBlur?: (e: React.SyntheticEvent<any>)  => void;
  context: any;
}

export const Field: React.FC<FieldProps> = (props: FieldProps) => {
  const { render, onChange, onFocus, onBlur, control } = props;
  const childProps = {
    onChange: (e: React.SyntheticEvent<any>) => {
      console.log(e.currentTarget.value);
      control.setValue(e.currentTarget.value);
      onChange && onChange(e);
    },
    onFocus,
    onBlur,
    value: control.value,
    touched: control.touched,
  };
  return render(childProps);
};