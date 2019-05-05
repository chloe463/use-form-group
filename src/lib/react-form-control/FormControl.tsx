import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { ValidatorErrors, Validator, ValidatorFn } from "./Validators";

export interface FormControl<T> {
  value: T;
  touched: boolean;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  errors: ValidatorErrors;
}

export function useFormControl<T>(defaultValue: T, validator?: Validator | Validator[]): FormControl<T> {
  const [value, setValue] = useState(defaultValue);
  const [touched, setTouched] = useState<boolean>(false);
  const [errors, setErrors] = useState<ValidatorErrors>([]);
  const first = useRef<boolean>(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
    } else {
      setTouched(true);
    }
    if (!validator) {
      return;
    }
    if (Array.isArray(validator)) {
      setErrors(validator.map(fn => fn(value)).filter(Boolean));
    } else {
      setErrors(validator(value));
    }
  }, [value]);

  return {
    value,
    touched,
    setValue,
    errors,
  }
}
