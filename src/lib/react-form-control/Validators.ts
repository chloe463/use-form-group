export type ValidatorFn = (value: any) => boolean;
export type ValidatorPromiseFn = (value: any) => Promise<boolean>;
export type Validator = ValidatorFn | ValidatorPromiseFn;
export type ValidatorErrors = {
  [key: string]: any;
};

export class Validators {
  static required: ValidatorFn = (value: any) => {
    if (value === null && value === undefined) {
      return false;
    }
    if (typeof value === "string") {
      return value !== "";
    }
    return true;
  }
}
