import React, { ChangeEvent } from "react";


type Props = {
  label: string;
  isTextArea: boolean;
  placeholder: string;
  required: boolean;
  state?: string;
  onChange: (value : string) => void;
  dispatch: ({type, KEY, value} : any) => void;
  KEY: string;
};

const ProjectFormField = ({
  label,
  isTextArea,
  placeholder,
  required,
  state,
  onChange,
  dispatch,
  KEY
}: Props) => {

  return (
    <div className="flex w-full flex-col gap-2">
      <label className="w-full text-gray-800 font-semibold">{label}</label>
      {isTextArea ? (
        <textarea
          className="form_field-input min-h-[170px]"
          value={state}
          placeholder={placeholder}
          required={required}
          onChange={(e) => dispatch({
            type: 'UPDATE_INPUT',
            KEY: KEY,
            value: e.target.value
          })}
        />
      ) : (
        <input
          className="form_field-input"
          type="text"
          value={state}
          placeholder={placeholder}
          required={required}
          onChange={(e) => dispatch({
            type: 'UPDATE_INPUT',
            KEY: KEY,
            value: e.target.value
          })}
        />
      )}
    </div>
  );
};

export default ProjectFormField;
