import { ValidatorErrors, Validator } from "./Validators";

export interface FormControlState {
  value: any;
  touched: boolean;
  errors: any[];
}

export interface FormControlOption {
  value: any;
  touched: boolean;
  errors: any[];
  updateState: (state: FormControlState) => void;
  validator?: Validator | Validator[];
}

export class FormControl {
  public value: any;
  public touched: boolean = false;
  public errors: ValidatorErrors[] | null = null;
  public updateState: (state: FormControlState) => void;
  public validator: Validator | Validator[] | null = null;

  constructor(option: FormControlOption) {
    this.value = option.value;
    this.touched = option.touched;
    this.errors = option.errors;
    this.updateState = option.updateState;
    this.validator = option.validator || null;
  }

  public patchState(patch: any) {
    const currentState = this.value;
    this.updateState({
      ...currentState,
      ...patch
    });
  }
}
