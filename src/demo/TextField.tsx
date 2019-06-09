import React from "react";
import { useFormControl } from "../lib/react-form-control";

export const TextField = () => {
  const { value, setValue, errors, touched, pristine, dirty } = useFormControl("text");
  return (
    <>
      <input type="text" value={value} onChange={e => setValue(e.target.value)} />
      {touched && errors && JSON.stringify(errors)}
      {JSON.stringify({ pristine, dirty }, null, 2)}
    </>
  );
};
