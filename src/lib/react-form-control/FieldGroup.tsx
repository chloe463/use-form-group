import React  from "react";

import { FieldContext } from "./FieldContext";
import { FormGroup } from "./FormGroup";

interface FieldGroupProps {
  formGroup: FormGroup;
  render: React.FunctionComponent<any>;
}

export const FieldGroup: React.FC<FieldGroupProps> = (props: FieldGroupProps) => {
  const { formGroup, render } = props;
  return (
    <FieldContext.Provider value={{formGroup}}>
      {render({})}
    </FieldContext.Provider>
  );
};
