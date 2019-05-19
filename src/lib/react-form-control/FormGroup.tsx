import { useEffect, useReducer, useCallback, useMemo } from "react";
import { Validator, AsyncValidator, ValidatorErrors } from "./Validators";
import { FormControl, buildInitialFormControl } from "./FormControl";
import {
  FormGroupStatus,
  IFormGroup,
  UPDATE_VALUE,
  UPDATE_ERROR,
  updateValue,
} from "./constants";
import { reducer } from "./Reducer";

type formValue = number | string | boolean | null;

type FormValueSetterFn = (key: string, value: any) => void;
export interface FormGroup {
  status: FormGroupStatus;
  controls: any;
  setValue: FormValueSetterFn;
  values: any;
}

export interface GroupOptions {
  [key: string]:
    formValue |
    [formValue, Validator?] |
    [formValue, Validator[]] |
    [formValue, Validator, AsyncValidator?] |
    [formValue, Validator, AsyncValidator[]];
}

function initFormGroupValues(options: GroupOptions) {
  const controls: { [key: string]: FormControl<any> } = {};
  Object.keys(options).forEach(key => {
    const option = options[key];
    if (Array.isArray(option)) {
      const [value, validator, asyncValidator] = option;
      controls[key] = buildInitialFormControl(value, validator, asyncValidator);
    } else {
      const value = option;
      controls[key] = buildInitialFormControl(value);
    }
  });
  return { controls, status: undefined };
}

export function useFormGroup(formGroupOptions: GroupOptions): FormGroup {
  const [formGroup, dispatch] = useReducer(reducer, formGroupOptions, initFormGroupValues);
  const setValue: FormValueSetterFn = useCallback((key: string, value: any) => dispatch(updateValue(key, value)), []);
  const values = useMemo(() => {
    const result: { [key: string]: any } = {};
    Object.keys(formGroup.controls).forEach((key: string) => {
      result[key] = formGroup.controls[key].value;
    });
    return result;
  }, [formGroup.controls]);
  return {
    status: formGroup.status,
    controls: formGroup.controls,
    setValue,
    values,
  };
}