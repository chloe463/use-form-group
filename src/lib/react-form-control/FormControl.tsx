import { ValidatorErrors, Validator } from "./Validators";

export interface FormControlOption {
  value: any;
  validator?: Validator;
  setValue: (value: any) => void;
}

export class FormControl {
  public value: any;
  public setValue: (value: any) => void;
  public validator: Validator | null = null;
  public touched: boolean = false;
  public errors: ValidatorErrors | null = null;

  constructor(option: FormControlOption) {
    this.value = option.value;
    this.validator = option.validator || null;
    this.setValue = option.setValue;
  }
}
