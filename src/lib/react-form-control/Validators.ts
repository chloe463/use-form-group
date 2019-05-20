export type Validator = (value: any) => ValidatorErrors | null;
export type AsyncValidator = (value: any) => Promise<ValidatorErrors>;
export type ValidatorErrors = {
  [key: string]: any;
} | null;

export class Validators {
  public static required: Validator = (value: any) => {
    if (value === null || value === undefined) {
      return { required: true };
    }
    if (typeof value === "string" && value === "") {
      return { required: true };
    }
    return null;
  }

  public static maxLength = (length: number): Validator  => (value: string) => {
    if (value.length > length) {
      return { maxLength: { maxLength: length, actualLength: value.length } };
    }
    return null;
  }

  public static minLength = (length: number): Validator  => (value: string) => {
    if (value.length < length) {
      return { minLength: { minLength: length, actualLength: value.length } };
    }
    return null;
  }

  public static format = (regexp: RegExp): Validator  => (value: string) => {
    if (value.match(regexp)) {
      return { format: true };
    }
    return null;
  }
}

export const mergeValidators = (validators: Validator | Validator[] | undefined) => {
  if (!validators) {
    return undefined;
  }
  if (!Array.isArray(validators)) {
    return validators;
  }
  return (value: any) => validators.map(validator => validator(value));
};
