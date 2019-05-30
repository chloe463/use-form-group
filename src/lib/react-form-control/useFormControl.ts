import { useContext, useCallback } from "react";
import { FieldContext } from "./FormGroupContext";

export function useFormControl<T>(name: string) {
  const formGroup = useContext(FieldContext);
  if (formGroup === null) {
    throw new Error(
      ['Could not find "formGroup" in context.', "Wrap the root component in a <FormGroupProvider>."].join(" ")
    );
  }

  const { values, metaInfos, errors } = formGroup;
  const setValue = useCallback((value: any) => formGroup.setValue({ [name]: value }), [formGroup, name]);
  return {
    value: values[name],
    ...metaInfos[name],
    errors: errors ? errors[name] : null,
    setValue,
  };
}
