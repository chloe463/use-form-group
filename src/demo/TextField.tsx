import React from "react";
import { useFormControl } from "../lib/react-form-control";
import { MetaAndErrors } from "./MetaAndErrors";

import "./FormItem.css";

export const TextField = () => {
  const {
    value,
    setValue,
    errors,
    inputRef,
    selectRef: _selectRef,
    textareaRef: _textareaRef,
    ...meta
  } = useFormControl("text");
  return (
    <div className="TextField">
      <input
        type="text"
        className="TextField__input"
        value={value}
        onChange={e => setValue(e.target.value)}
        ref={inputRef}
      />
      <MetaAndErrors meta={meta} errors={errors} />
    </div>
  );
};
