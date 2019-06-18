import React from "react";
import { useFormControl } from "../lib/react-form-control";

import "./FormItem.css";

export const TextField = () => {
  const { value, setValue, inputRef } = useFormControl("text");
  return (
    <div className="TextField">
      <input
        type="text"
        className="TextField__input"
        value={value}
        onChange={e => setValue(e.target.value)}
        ref={inputRef}
      />
    </div>
  );
};
