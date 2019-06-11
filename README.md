# use-form-group

[![CircleCI](https://circleci.com/gh/chloe463/use-form-group/tree/master.svg?style=shield)](https://circleci.com/gh/chloe463/use-form-group/tree/master)
[![codecov](https://codecov.io/gh/chloe463/use-form-group/branch/master/graph/badge.svg)](https://codecov.io/gh/chloe463/use-form-group)
[![npmVersion](https://img.shields.io/npm/v/@chloe463/use-form-group.svg)](https://www.npmjs.com/package/@chloe463/use-form-group)

## Overview

A react hooks library to control form value state. This library is inspired by Angular's [ReactiveFormModule](https://angular.io/guide/reactive-forms).

## Usage

You can build form state with `useFormGroup`.
To initialize it, pass `values`, `validators`(optional) and `lazyInit` function (optional) which initializes values asynchronously.

```tsx
import React from "react";
import {
  FormGroupProvider,
  Validators,
  useFormGroup
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
        <TextField />
      </form>
    </FormGroupProvider>
  );
};
```

To use value and update it, you can use `useFormControl`.
With `useFormControl` you will get...

|||
|:-|:-|
|value: any ||
|setValue: `(value: any) => void` |A function to update the value|
|errors: `{[key: string]: any}` |Validation errors|
|pristine: boolean |True if the value is not updated|
|dirty: boolean |True if the value is updated|
|touched: boolean |True if the form is focused|
|untouched: boolean |True if the form is not focused|

```tsx
import React from "react";
import { useFormControl } from "@chloe463/use-form-group";

const TextField = () => {
  const { value, setValue, errors, touched, pristine, dirty } = useFormControl("text");
  return (
    <>
      <input type="text" value={value} onChange={e => setValue(e.target.value)} />
      {touched && errors && JSON.stringify(errors)}
      {JSON.stringify({ pristine, dirty }, null, 2)}
    </>
  );
};
```
