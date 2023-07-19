import React, { ChangeEvent } from "react";

type Props = {
  label: string;
  isTextArea: boolean;
  placeholder: string;
  required: boolean;
  setFormState: (value: string) => void;
};
const ProjectFormField = ({
  label,
  isTextArea,
  placeholder,
  required,
  setFormState,
}: Props) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <label className="w-full text-gray-800 font-semibold">{label}</label>
      {isTextArea ? (
        <textarea
          className="form_field-input min-h-[170px]"
          placeholder={placeholder}
          required={required}
          onChange={(e) => setFormState(e.target.value)}
        />
      ) : (
        <input
          className="form_field-input"
          type="text"
          placeholder={placeholder}
          required={required}
          onChange={(e) => setFormState(e.target.value)}
        />
      )}
    </div>
  );
};

export default ProjectFormField;
