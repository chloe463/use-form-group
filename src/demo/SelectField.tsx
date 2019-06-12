import React from "react";
import { useFormControl } from "../lib/react-form-control";
import { MetaAndErrors } from "./MetaAndErrors";

interface Props {
  options: { key: string; value: string }[];
}

export const SelectField: React.FC<Props> = ({ options }) => {
  const {
    value,
    setValue,
    errors,
    inputRef: _inputRef,
    selectRef,
    textareaRef: _textareaRef,
    ...meta
  } = useFormControl("select");
  return (
    <>
      <select name="select" value={value} onChange={e => setValue(e.target.value)} ref={selectRef}>
        {options.map(option => {
          return (
            <option key={option.key} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </select>
      <MetaAndErrors meta={meta} errors={errors} />
    </>
  );
};
