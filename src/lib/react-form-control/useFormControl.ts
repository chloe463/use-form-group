import { useContext, useCallback, useRef, useEffect } from "react";
import { FieldContext } from "./FormGroupContext";

export function useFormControl<T>(name: string) {
  const formGroup = useContext(FieldContext);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const selectRef = useRef<HTMLSelectElement | null>(null);

  if (formGroup === null) {
    throw new Error(
      ['Could not find "formGroup" in context.', "Wrap the root component in a <FormGroupProvider>."].join(" ")
    );
  }

  const { values, metaInfos, errors, setTouchedOnBlur } = formGroup;
  const setValue = useCallback((value: any) => formGroup.setValue({ [name]: value }), [formGroup, name]);

  useEffect(() => {
    const element = inputRef.current || textareaRef.current || selectRef.current;
    if (!element) {
      return;
    }
    const onBlur = () => setTouchedOnBlur(name);
    element.addEventListener("blur", onBlur);
    return () => {
      element.removeEventListener("blur", onBlur);
    };
    // NOTE: Call this effect onMount only.
    /* eslint-disable-next-line */
  }, []);

  return {
    value: values[name],
    ...metaInfos[name],
    errors: errors[name],
    setValue,
    inputRef,
    selectRef,
    textareaRef,
  };
}
