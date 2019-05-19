import { ValidatorErrors, Validator, AsyncValidator, mergeValidators } from "./Validators";

export interface FormControl<T> {
  value: T,
  pristine: boolean,
  dirty: boolean,
  touched: boolean,
  untouched: boolean,
  errors: ValidatorErrors[],
  validator?: Validator | Validator[],
  asyncValidator?: AsyncValidator | AsyncValidator[],
}

export function buildInitialFormControl<T>(
  value: T,
  validator?: Validator | Validator[],
  asyncValidator?: AsyncValidator | AsyncValidator[]
): FormControl<T> {
  return {
    value,
    pristine: true,
    dirty: false,
    touched: false,
    untouched: true,
    errors: [],
    validator,
    asyncValidator,
  }
};
