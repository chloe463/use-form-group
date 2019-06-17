import React from "react";
import { useFormControl } from "../lib/react-form-control";

interface Props {
  options: { key: string; value: string }[];
}

export const SelectField: React.FC<Props> = ({ options }) => {
  const { value, setValue, selectRef } = useFormControl("select");
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
    </>
  );
};
