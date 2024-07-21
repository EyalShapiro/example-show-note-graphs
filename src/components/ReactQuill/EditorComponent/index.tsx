import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./EditorComponent.css";
import { Controller, useFormContext } from "react-hook-form";
import { toolbar } from "./toolbar";

export const EditorComponent: React.FC<Props> = ({
  keyName,
  className = "",
}) => {
  const methods = useFormContext();
  const { formats, modules } = toolbar();
  return (
    <Controller
      name={keyName}
      key={keyName}
      control={methods.control}
      rules={{
        required: true,
        validate: (value: string) => {
          const strippedValue = value.replace(/<[^>]+>/g, ""); // Remove all HTML tags
          return strippedValue.trim() !== "" || "בעיה ריק"; // Assuming this is a validation message in another language
        },
      }}
      render={({ field }) => (
        // <div className="qst">
        <ReactQuill
          {...field}
          theme="snow"
          className={`snow-editor ${className}`} // Corrected the typo
          modules={modules}
          formats={formats}
        />
        // </div>
      )}
    ></Controller>
  );
};

interface Props {
  keyName: string;
  className?: string;
}
