import React, { Component, Children } from "react";

import { FormControl } from "./FormControl";

export interface FieldProps {
  name?: string;
  control: FormControl<any> | null;
  render?: React.FunctionComponent<any>;
  children?: React.FunctionComponent<any>;
  onChange?: (e: React.SyntheticEvent<any>)  => void;
  onFocus?: (e: React.SyntheticEvent<any>)  => void;
  onBlur?: (e: React.SyntheticEvent<any>)  => void;
}

export const Field: React.FC<FieldProps> = (props: FieldProps) => {
  const { render, children, onChange, onFocus, onBlur, control } = props;
  console.log(control);
  const childProps = {
    // onChange: (e: React.SyntheticEvent<any>) => {
    onChange: (e: React.SyntheticEvent<HTMLInputElement, Event>) => {
      // control.setValue(e.currentTarget.value);
      onChange && onChange(e);
    },
    onFocus,
    onBlur,
    value: control ? control.value : null,
    touched: control ? control.touched : null,
    errors: control ? control.errors : null,
  };
  if (render) {
    return render(childProps);
  } else if (children) {
    return children(childProps);
  }
  return null;
};