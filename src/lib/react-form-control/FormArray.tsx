import { FormControl } from "./FormControl";
import { Validator, ValidatorErrors } from "./Validators";
import { useState } from "react";

interface FormControlState {
  value: any;
  touched: boolean;
  errors: any[];
}

export class FormArray {
//   public value: any;
//   public touched: boolean = false;
//   public errors: ValidatorErrors[] | null = null;
//   public updateState: (state: FormControlState) => void;

//   public controls: FormControl[];
//   public validator: Validator | null;

//   constructor(controls: FormControl[], validator?: Validator) {
//     this.controls = controls;
//     this.value = controls.map(control => control.value);
//     this.updateState = (state) => {
//       console.log("FormArray.updateState")
//     };
//     this.validator = validator ? validator : null;
//   }

//   public patchState(patch: any) {
//     const currentState = this.value;
//     this.updateState({
//       ...currentState,
//       ...patch
//     });
//   }
// }

// export const useFormArray = (items: any[], validator?: Validator) => {
//   const controls = items.map(item=> {
//     const [value, setValue] = useState<FormControlState>({
//       value: item,
//       touched: false,
//       errors: [],
//     });
//     console.log(item);
//     return new FormControl(item);
//     // return new FormControl({
//     //   value: item,
//     //   updateState: setValue,
//     //   validator
//     // })
//   });
//   return new FormArray(controls, validator);
};
