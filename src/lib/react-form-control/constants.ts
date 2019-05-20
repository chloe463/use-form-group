import { Validator, ValidatorErrors } from "./Validators";

export interface FormGroupValue {
  value: any;
  pristine: boolean;
  dirty: boolean;
  touched: boolean;
  untouched: boolean;
  errors: ValidatorErrors[];
  validator?: Validator | Validator[];
}

export type FormGroupStatus = "VALID" | "INVALID" | null;
