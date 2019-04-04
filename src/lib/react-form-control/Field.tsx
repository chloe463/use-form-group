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

export interface FieldState {
}

export class Field extends Component<FieldProps, FieldState> {
  constructor(props: FieldProps, context: any) {
    super(props);
    this.context = context;
  }

  public render() {
    const { render, children, onChange, onFocus, onBlur, control } = this.props;
    const props = {
      children,
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
    return (
      render(props, this.context)
    );
  }
}
