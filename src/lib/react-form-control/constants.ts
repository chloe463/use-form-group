import { Validator, ValidatorErrors } from "./Validators";

export interface IFormGroupValue {
  value: any;
  pristine: boolean;
  dirty: boolean;
  touched: boolean;
  untouched: boolean;
  errors: ValidatorErrors[];
  validator?: Validator | Validator[];
}

export type FormGroupStatus = "VALID" | "INVALID" | null;
