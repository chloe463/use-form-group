import { createContext } from "react";
import { FormGroup } from "./FormGroup";

interface ContextValue {
  formGroup: FormGroup | null;
}
export const { Provider, Consumer } = createContext<ContextValue>({
  formGroup: null
});
