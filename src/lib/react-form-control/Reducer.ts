import {
  IFormGroup,
  Actions,
  UPDATE_VALUE,
  UPDATE_ERROR,
  FOCUS_ON_FIELD,
  BLUR_FIELD,
} from "./constants";
import { Validator, ValidatorErrors } from "./Validators";

const validate = (value: any, validator: Validator | Validator[]) =>
  Array.isArray(validator) ?
    validator.map(fn => fn(value)).filter(Boolean) :
    validator(value);

export function reducer(state: IFormGroup, action: Actions): IFormGroup {
  switch(action.type) {
    case UPDATE_VALUE:
      const { key, value } = action.payload;
      const { validator } = state.controls[key];
      const errors: ValidatorErrors = validator ? validate(value, validator) : [];

      return Object.assign({}, state, {
        status: errors && errors.length ? "INVALID" : "VALID",
        controls: {
          ...state.controls,
          [key]: {
            ...state.controls[key],
            value,
            pristine: false,
            dirty: true,
            touched: true,
            untouched: false,
            errors,
          }
        }
      });
    case BLUR_FIELD:
      return Object.assign({}, state, {
        [action.payload.key]: {
          ...state.controls[action.payload.key],
          touched: true,
          untouched: false,
        }
      });
  }
  return state;
}
