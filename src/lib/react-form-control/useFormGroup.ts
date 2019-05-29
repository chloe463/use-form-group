import { useState, useCallback, useMemo, useEffect } from "react";
import { Validator, ValidatorErrors, mergeValidators } from "./Validators";
import { FormGroupStatus } from "./constants";

type ValidatorsOption<T> = { [key in keyof T]?: Validator | Validator[] };

export interface FormGroupOptions<T extends Record<string, any>> {
  values: T;
  validators: ValidatorsOption<T>;
  lazyInit: () => Promise<T>;
}

export interface Meta {
  pristine: boolean;
  dirty: boolean;
  touched: boolean;
  untouched: boolean;
}

type FormValueSetterFn = (keysAndValues: Record<string, any>) => void;

export interface FormGroup {
  status: FormGroupStatus;
  metaInfos: Record<string, Meta>;
  setValue: FormValueSetterFn;
  values: any;
  errors: ValidatorErrors;
}

function initMeta<T>(values: T) {
  const meta: Record<string, any> = {};
  Object.keys(values).forEach((key: string) => {
    meta[key] = {
      pristine: true,
      dirty: false,
      touched: false,
      untouched: true,
    };
  });
  return meta;
}

function initValidators<T>(validators: FormGroupOptions<T>["validators"]) {
  const mergedValidators: { [key: string]: Validator } = {};
  Object.keys(validators).forEach(key => {
    const validator = (validators as any)[key];
    mergedValidators[key] = mergeValidators(validator);
  });
  return { validators: mergedValidators };
}

export function useFormGroup<T>(formGroupOptions: FormGroupOptions<T>): FormGroup {
  const [values, setValues] = useState<Record<string, any>>(formGroupOptions.values);
  const [metaInfos, setMetaInfo] = useState<Record<string, Meta>>(initMeta(formGroupOptions.values));
  const [errors, setErrors] = useState<ValidatorErrors>({});
  const [status, setStatus] = useState<null | FormGroupStatus>(null);

  useEffect(() => {
    const { lazyInit } = formGroupOptions;
    if (lazyInit) {
      lazyInit().then(values => {
        const newErrors: ValidatorErrors = {};
        Object.keys(values).forEach(key => {
          const validator = validators[key];
          if (validator) {
            newErrors[key] = validator((values as Record<string, any>)[key]);
          }
        });
        setValues(currentValues => ({ ...currentValues, ...values }));
        setErrors(currentErrors => ({ ...currentErrors, ...newErrors }));
      });
    }
    // NOTE: Call lazeInit only once on mount.
    // eslint-disable-next-line
  }, []);

  const { validators } = useMemo(() => {
    return initValidators(formGroupOptions.validators);
  }, [formGroupOptions]);

  const setValue = useCallback(
    (keysAndValues: Record<string, any>) => {
      const updatedValues: Record<string, any> = {};
      const updatedMeta: Record<string, any> = {};
      const newErrors: ValidatorErrors = {};
      Object.keys(keysAndValues).forEach(key => {
        updatedValues[key] = keysAndValues[key];
        updatedMeta[key] = {
          pristine: false,
          dirty: true,
          touched: true,
          untouched: false,
        };

        const validator = validators[key];
        if (validator) {
          newErrors[key] = validator(updatedValues[key]);
        }
      });
      setValues(currentValues => ({ ...currentValues, ...updatedValues }));
      setMetaInfo(currentMetas => ({ ...currentMetas, ...updatedMeta }));
      setErrors(currentErrors => ({ ...currentErrors, ...newErrors }));
    },
    [validators]
  );

  useEffect(() => {
    if (!errors) {
      setStatus("VALID");
      return;
    }
    Object.values(errors).forEach(e => {
      if (e !== null && Object.keys(e).length > 0) {
        setStatus("INVALID");
      }
    });
  }, [errors]);

  return {
    status,
    setValue,
    metaInfos,
    values,
    errors,
  };
}
