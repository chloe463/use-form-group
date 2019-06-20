import React from "react";
import "./App.css";
import octocat from "../GitHub-Mark-32px.png";

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
  };

  const formGroup = useFormGroup<State>(formGroupOptions);

  React.useEffect(() => {
    // eslint-disable-next-line
    console.log(formGroup.values);
  }, [formGroup.values]);

  return (
    <div className="App">
      <div className="App__link-to-repo">
        <a href="https://github.com/chloe463/use-form-group">
          <img src={octocat} />
        </a>
      </div>

      <div className="App__title-container">
        <h1 className="App__title">useFormGroup sample app</h1>
      </div>
      <FormGroupProvider formGroup={formGroup}>
        <div className="container">
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
          <div className="preview">
            <pre className="preview__values">
              {JSON.stringify(
                {
                  status: formGroup.status,
                  values: formGroup.values,
                  errors: formGroup.errors,
                  meta: formGroup.metaInfos,
                },
                null,
                2
              )}
            </pre>
          </div>
        </div>
      </FormGroupProvider>
    </div>
  );
};

export default App;
