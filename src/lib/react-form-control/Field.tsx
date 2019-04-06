import React, { Component } from "react";

import { FormControl } from "./FormControl";
import { ValidatorErrors, ValidatorFn, ValidatorPromiseFn, AsyncValidatorFn } from "./Validators";

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
      let errors: ValidatorErrors[] = [];
      if (control.validator) {
        if (Array.isArray(control.validator)) {
          errors = control.validator
            .map(validator => validator(value))
            .filter(Boolean);
        } else {
          errors = [ control.validator(value) ];
        }
      }
      control.updateState({
        value,
        touched: true,
        errors
      });
      onChange && onChange(e);
    },
    onFocus,
    onBlur,
    value: control.value,
    touched: control.touched,
  };
  return render(childProps);
};