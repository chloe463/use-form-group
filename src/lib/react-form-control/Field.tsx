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
      const value = e.currentTarget.value;
      control.setValue(value);
      control.setTouched(true);
      if (control.validator) {
        if (Array.isArray(control.validator)) {
          const errors = control.validator
            .map(validator => validator(value))
            .filter(Boolean);
          control.setErrors(errors);
        } else {
          const error = control.validator(value);
          control.setErrors([ error ]);
        }
      }
      onChange && onChange(e);
    },
    onFocus,
    onBlur,
    value: control.value,
    touched: control.touched,
  };
  return render(childProps);
};