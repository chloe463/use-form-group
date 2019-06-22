export type Validator = (value: any) => ValidatorErrors | null;
export type AsyncValidator = (value: any) => Promise<null | ValidatorErrors>;
// export type AsyncValidator = (value: any) => Promise<ValidatorErrors>;
export interface ValidatorErrors {
  [key: string]: any;
}

export const Validators = {
  required: (value: any) => {
    if (value === null || value === undefined) {
      return { required: true };
    }
    if (Array.isArray(value) && value.length === 0) {
      return { required: true };
    }
    if (typeof value === "string" && value === "") {
      return { required: true };
    }
    return null;
  },

  min: (min: number) => (value: number) => {
    if (value < min) {
      return { min: { min, actualValue: value } };
    }
    return null;
  },

  max: (max: number) => (value: number) => {
    if (value > max) {
      return { max: { max, actualValue: value } };
    }
    return null;
  },

  maxLength: (length: number) => (value: string) => {
    if (value.length > length) {
      return { maxLength: { maxLength: length, actualLength: value.length } };
    }
    return null;
  },

  minLength: (length: number) => (value: string) => {
    if (value.length < length) {
      return { minLength: { minLength: length, actualLength: value.length } };
    }
    return null;
  },

  format: (regexp: RegExp) => (value: string) => {
    if (!value.match(regexp)) {
      return { format: true };
    }
    return null;
  },
};

export const mergeValidators = (validators: Validator | Validator[] | undefined) => {
  if (!validators) {
    return (_value: any) => null;
  }
  if (!Array.isArray(validators)) {
    return validators;
  }
  return (value: any) => {
    const errors = validators.reduce((acc, validator) => {
      const error = validator(value);
      return { ...acc, ...error };
    }, {});
    return Object.keys(errors).length === 0 ? null : errors;
  };
};
