import ReactQuill from "react-quill";
import "./TextareaQuill.css";
import "react-quill/dist/quill.snow.css";
import { toolbar } from "./toolbar";
interface Props {
  value: string;
  onChange: (content: string) => void;
}

export const TextareaQuill = ({ value, onChange }: Props) => {
  const tool = toolbar();

  return (
    <label className="textarea textarea-ghost border-none outline-none bg-white">
      <ReactQuill
        {...tool}
        className="snow-editor border rounded-2xl"
        value={value}
        onChange={onChange}
      />
    </label>
  );
};
