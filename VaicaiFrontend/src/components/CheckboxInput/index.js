import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";

const CheckboxInput = ({ name, options, ...rest }) => {
  const inputRefs = useRef([]);
  const { fieldName, registerField, defaultValue = [] } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs) => {
        return refs.filter(ref => ref.checked).map(ref => ref.value);
      },
      clearValue: (refs) => {
        refs.forEach(ref => {
          ref.checked = false;
        });
      },
      setValue: (refs, values) => {
        refs.forEach(ref => {
          if (values.includes(ref.id)) {
            ref.checked = true;
          }
        });
      }
    });
  }, [defaultValue, fieldName, registerField]);

  return (
    <div className="checkbox-container">
      {options.map(option => (
        <label htmlFor={option.id} key={option.id}>
          <input
            ref={ref => {
              inputRefs.current.push(ref);
            }}
            value={option.value}
            type="checkbox"
            id={option.id}
            {...rest}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default CheckboxInput;
