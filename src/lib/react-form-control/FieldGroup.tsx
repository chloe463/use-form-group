import React, { Component } from "react";

import { FieldContext } from "./FieldContext";
import { FormGroup } from "./FormGroup";
import { FormControl } from "./FormControl";

interface FieldGroupProps {
  formGroup: FormGroup;
  render: React.FunctionComponent<any>;
}
interface FieldGroupState {
  [key: string]: any;
}


export class FieldGroup extends Component<FieldGroupProps, FieldGroupState> {
  constructor(props: FieldGroupProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    Object.keys(this.props.formGroup.controls).forEach((name: string) => {
      const control = this.props.formGroup.controls[name];
      console.log(control);
      this.setState({ [name]: control.value });
    });
  }

  public render() {
    const { formGroup, render } = this.props;
    return (
      <FieldContext.Provider value={{formGroup}}>
        {render({})}
      </FieldContext.Provider>
    );
  }
}
