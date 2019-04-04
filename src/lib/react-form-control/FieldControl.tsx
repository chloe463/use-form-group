import React, { Component } from "react";

import { Consumer } from "./FieldContext";
import { FormControl } from "./FormControl";
import { Field } from "./Field";

interface FieldControlProps {
  name?: string;
  control?: FormControl;
  render: React.FunctionComponent<any>;
  onChange?: (e: React.SyntheticEvent<any>)  => void;
  onFocus?: (e: React.SyntheticEvent<any>)  => void;
  onBlur?: (e: React.SyntheticEvent<any>)  => void;
}
interface FieldControlState {}

interface FieldChildComponentProps {
}

export class FieldControl extends Component<FieldControlProps, FieldControlState> {
  constructor(props: FieldControlProps, context: any) {
    super(props);
  }

  public render() {
    return (
      <Consumer>
        {contextValue => {
          const control: FormControl = contextValue.formGroup!.getControl(this.props.name as string);
          return <Field {...this.props} context={contextValue} control={control} />
        }}
      </Consumer>
    );
  }
}
