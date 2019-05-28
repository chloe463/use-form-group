# use-form-group

## Overview

A react hooks library to control form value state. This library is inspired by Angular's [ReactiveFormModule](https://angular.io/guide/reactive-forms).

## Usage

```tsx

import React from "react";
import {
  FormGroupProvider,
  FieldControl,
  Validators,
  useFormGroup,
} from "@chloe463/use-form-group";

const AwesomeFormComponent = () => {
  const formGroup = useFormGroup({
    values: {
      username: "",
    },
    validators: {
      username: [Validators.required, Validators.maxLength(3)],
    },
  });

  return (
    <FormGroupProvider formGroup={formGroup}>
      <form>
      <button onClick={/* do something */} disabled={formGroup.status === "INVALID"}>Submit</button>
        <FieldControl name="username">
          {props => {
            const { value, setValue, touched, errors } = props;
            return (
              <>
                <input type="text" value={value} onChange={e => setValue(e.target.value)} />
                {touched && errors && <span>{JSON.stringify(errors)}</span>}
              </>
            );
          }}
        </FieldControl>
      </form>
    </FormGroupProvider>
  );
};

```

