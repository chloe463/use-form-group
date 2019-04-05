import { ValidatorErrors, Validator } from "./Validators";

export interface FormControlOption {
  value: any;
  touched: boolean;
  errors: any[];
  setValue: (value: any) => void;
  setTouched: (touched: boolean) => void;
  // setErrors: (errors: ValidatorErrors) => void;
  setErrors: (errors: any) => void;
  validator?: Validator | Validator[];
}

export class FormControl {
  public value: any;
  public touched: boolean = false;
  public errors: ValidatorErrors | null = null;
  public setValue: (value: any) => void;
  public setTouched: (touched: boolean) => void;
  public setErrors: (errors: any) => void;
  public validator: Validator | Validator[] | null = null;

  constructor(option: FormControlOption) {
    this.value = option.value;
    this.touched = option.touched;
    this.errors = option.errors;
    this.setValue = option.setValue;
    this.setTouched = option.setTouched;
    this.setErrors = option.setErrors;
    this.validator = option.validator || null;
  }
}
