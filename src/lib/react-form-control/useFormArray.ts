import { useContext, useCallback } from "react";
import { FieldContext } from "./FormGroupContext";
import { useFormControl } from "./useFormControl";

export function useFormArray<T>(name: string) {
  const formGroup = useContext(FieldContext);
  const formControl = useFormControl(name);

  const addOrRemoveValue = useCallback(
    ({ value, checked }: { value: any; checked?: boolean }) => {
      // NOTE: The formGroup must not be null, because useFormControl checks it and throws exception if formGroup is null.
      /* eslint-disable @typescript-eslint/no-non-null-assertion */
      const currentValues: any[] = formGroup!.values[name];
      formGroup!.setValue({
        [name]: checked ? [...currentValues, value] : [...currentValues].filter(v => v !== value),
      });
      /* eslint-enable */
    },
    [formGroup, name]
  );

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const selected = useCallback((value: any) => formGroup!.values[name].indexOf(value) !== -1, [formGroup, name]);
  return {
    ...formControl,
    addOrRemoveValue,
    selected,
  };
}
