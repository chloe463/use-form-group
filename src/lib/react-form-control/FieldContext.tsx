import { createContext } from "react";
import { FormGroup } from "./FormGroup";

interface ContextValue {
  formGroup: FormGroup | null;
}
export const FieldContext = createContext<ContextValue>({
  formGroup: null
});
