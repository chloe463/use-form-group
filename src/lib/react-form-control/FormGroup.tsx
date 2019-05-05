import { useEffect } from "react";
import { Validator } from "./Validators";
import { useFormControl, FormControl } from "./FormControl";

type formValue = number | string | boolean | null;
type FormGroupStatus = "VALID" | "INVALID" | undefined;

export interface GroupOptions {
  [key: string]: formValue | [formValue, Validator?] | [formValue, Validator[]];
}

export class FormGroup {
  public controls: { [key: string]: FormControl<any> } = {};
  // public status: FormGroupStatus = undefined;
  constructor(options?: GroupOptions) {
  }

  get status(): FormGroupStatus {
    return this.errors().length > 0 ? "INVALID" : "VALID";
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

  public errors() {
    return Object.values(this.controls).map((control: FormControl<any>) => {
      return control.errors && control.errors.length ? control.errors : null;
    }).filter(Boolean).flat();
  }
}

export function useFormGroup(formGroupOptions: GroupOptions): FormGroup {
  const formGroup = new FormGroup({});
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
    formGroup.setControl(key, formControl);
  });
  return formGroup;
}
