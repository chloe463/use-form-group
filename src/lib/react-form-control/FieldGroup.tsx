import React  from "react";

import { FormGroupProvider } from "./FormGroupContext";
import { FormGroup } from "./FormGroup";

interface FieldGroupProps {
  formGroup: FormGroup;
  render: React.FunctionComponent<any>;
}

export const FieldGroup: React.FC<FieldGroupProps> = (props: FieldGroupProps) => {
  const { formGroup, render } = props;
  return (
    <FormGroupProvider formGroup={formGroup}>
      {render({})}
    </FormGroupProvider>
  );
};
