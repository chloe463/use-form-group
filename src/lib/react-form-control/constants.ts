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

export type FormGroupStatus = "VALID" | "INVALID" | undefined;
export interface IFormGroup {
  status: FormGroupStatus;
  controls: {
    [key: string]: IFormGroupValue;
  }
}

export const UPDATE_VALUE = "UPDATE_VALUE";
export const UPDATE_ERROR = "UPDATE_ERROR";
export const FOCUS_ON_FIELD = "FOCUS_ON_FIELD";
export const BLUR_FIELD = "BLUR_FIELD";

export const updateValue = (key: string, value: any) => ({
  type: UPDATE_VALUE as typeof UPDATE_VALUE,
  payload: {
    key,
    value,
  }
});

export const updateError = (key: string, errors: ValidatorErrors[]) => ({
  type: UPDATE_ERROR as typeof UPDATE_ERROR,
  payload: {
    key,
    errors,
  }
});

export const focusOnField = (key: string) => ({
  type: FOCUS_ON_FIELD as typeof FOCUS_ON_FIELD,
  payload: {
    key,
  }
});

export const blurField = (key: string) => ({
  type: BLUR_FIELD as typeof BLUR_FIELD,
  payload: {
    key,
  }
});

export type Actions =
  ReturnType<typeof updateValue> |
  ReturnType<typeof updateError> |
  ReturnType<typeof focusOnField> |
  ReturnType<typeof blurField>;
