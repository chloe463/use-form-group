export type ValidatorFn = (value: any) => ValidatorErrors | null;
export type ValidatorPromiseFn = (value: any) => Promise<boolean>;
export type Validator = ValidatorFn | ValidatorPromiseFn;
export type ValidatorErrors = {
  [key: string]: any;
};

export class Validators {
  static required: ValidatorFn = (value: any) => {
    if (value === null || value === undefined) {
      return { "required": true };
    }
    return null;
  }

  static maxLength = (length: number): ValidatorFn => (value: string) => {
    if (value.length >= length) {
      return { "maxLength": true };
    }
    return null;
  }

  static minLength = (length: number): ValidatorFn => (value: string) => {
    if (value.length <= length) {
      return { "minLength": true };
    }
    return null;
  }

  static format = (regexp: RegExp): ValidatorFn => (value: string) => {
    if (value.match(regexp)) {
      return { "format": true };
    }
    return null;
  }
}
