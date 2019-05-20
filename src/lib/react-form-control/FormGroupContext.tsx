import React, { createContext, ReactNode } from "react";
import { FormGroup } from "./useFormGroup";

export const FieldContext = createContext<null | FormGroup>(null);

interface FormGroupProviderProps {
  formGroup: FormGroup;
  children?: ReactNode;
}

export function FormGroupProvider({ formGroup, children }: FormGroupProviderProps) {
  return <FieldContext.Provider value={formGroup}>{children}</FieldContext.Provider>;
}
