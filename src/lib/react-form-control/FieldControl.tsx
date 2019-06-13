import React from "react";
import { ValidatorErrors } from "./Validators";
import { useFormControl } from "./useFormControl";

export interface FieldControlChildrenProps {
  value: any;
  pristine: boolean;
  dirty: boolean;
  touched: boolean;
  untouched: boolean;
  errors: ValidatorErrors;
  setValue: (value: any) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  selectRef: React.RefObject<HTMLSelectElement | null>;
}

interface FieldControlProps {
  name: string;
  children: React.FC<FieldControlChildrenProps>;
}

export const FieldControl: React.FC<FieldControlProps> = (props: FieldControlProps) => {
  const { name, children } = props;
  const { value, errors, setValue, ...meta } = useFormControl(name);
  return children({
    value,
    errors,
    setValue,
    ...meta,
  });
};
