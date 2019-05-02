import { Validator } from "./Validators";
import { useFormControl, FormControl } from "./FormControl";

type formValue = number | string | boolean | null;

export interface GroupOptions {
  [key: string]: formValue | [formValue, Validator?] | [formValue, Validator[]];
}

export class FormGroup {
  public controls: { [key: string]: FormControl<any> } = {};
  constructor(options?: GroupOptions) {
  }

  public setControl(key: string, control: FormControl<any>): void {
    this.controls[key] = control;
  }

  public getControl(name: string): FormControl<any> {
    return this.controls[name] || null;
  }

  public values() {
    const values: { [key: string]: any } = {};
    Object.keys(this.controls).forEach((key: string) => {
      values[key] = this.controls[key].value;
    });
    return values;
  }
}

export function useFormGroup(formGroupOptions: GroupOptions): FormGroup {
  const formGroup = new FormGroup({});
  const formValues: { [key:string]: any } = {};
  Object.keys(formGroupOptions).forEach(key => {
    const option = formGroupOptions[key];
    let formControl = null;
    if (Array.isArray(option)) {
      const [value, validator] = option;
      formControl = useFormControl(value, validator);
    } else {
      const value = option;
      formControl = useFormControl(value);
    }
    formValues[key] = formControl.value;
    formGroup.setControl(key, formControl);
  });
  return formGroup;
}
