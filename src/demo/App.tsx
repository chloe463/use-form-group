import React from "react";
import "./App.css";

import { FormGroupProvider, Validators, useFormGroup } from "../lib/react-form-control";
import { TextField } from "./TextField";
import { RadioField } from "./RadioField";
import { CheckboxField } from "./CheckboxField";
import { SelectField } from "./SelectField";

interface State {
  text: string;
  radio: string;
  checkbox: string[];
  select: string;
}

const lazyInit = () => {
  return new Promise<State>(resolve => {
    setTimeout(() => {
      resolve({
        text: "lazy init!!!",
        radio: "3",
        checkbox: ["val2"],
        select: "2",
      });
    }, 1500);
  });
};

const App = () => {
  const radios = [{ key: "radio1", value: "1" }, { key: "radio2", value: "2" }, { key: "radio3", value: "3" }];
  const options = [{ key: "option1", value: "1" }, { key: "option2", value: "2" }, { key: "option3", value: "3" }];
  const checkboxes = [
    { value: "val1", checked: false },
    { value: "val2", checked: true },
    { value: "val3", checked: false },
  ];

  const formGroupOptions = {
    values: {
      text: "abcd",
      radio: "1",
      checkbox: checkboxes.filter(c => c.checked).map(c => c.value),
      select: "1",
    },
    validators: {
      text: [Validators.required, Validators.maxLength(5)],
      checkbox: Validators.required,
    },
    lazyInit,
  };

  const formGroup = useFormGroup<State>(formGroupOptions);

  React.useEffect(() => {
    // eslint-disable-next-line
    console.log(formGroup);
  }, [formGroup]);
  // console.log(formGroup.values);

  const _dummy = {
    text: "updated!!!",
    radio: "2",
    checkbox: ["val1"],
    select: "3",
  };

  return (
    <div className="App">
      <div className="App__title-container">
        <h1 className="App__title">useFormGroup sample app</h1>
      </div>
      <FormGroupProvider formGroup={formGroup}>
        <form className="form">
          <div className="form__item">
            <h2 className="form__item-label">Text field</h2>
            <div className="form__item-field">
              <TextField />
            </div>
          </div>
          <div className="form__item">
            <h2 className="form__item-label">Radio buttons</h2>
            <div className="form__item-field">
              <RadioField radios={radios} />
            </div>
          </div>
          <div className="form__item">
            <h2 className="form__item-label">Checkboxes</h2>
            <div className="form__item-field">
              <CheckboxField checkboxes={checkboxes} />
            </div>
          </div>
          <div className="form__item">
            <h2 className="form__item-label">Selection</h2>
            <div className="form__item-field">
              <SelectField options={options} />
            </div>
          </div>
        </form>
        <button onClick={_e => formGroup.reset()}>formGroup.reset()</button>
        <button onClick={_e => formGroup.setValue(_dummy)}>formGroup.setValue()</button>
        <button onClick={_e => alert("can submit!")} disabled={formGroup.status === "INVALID"}>
          dummy submit button
        </button>
      </FormGroupProvider>
      {/* <pre>{JSON.stringify(formGroup.controls, null, 2)}</pre> */}
    </div>
  );
};

export default App;
