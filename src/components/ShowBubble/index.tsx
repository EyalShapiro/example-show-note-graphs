import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "./ShowBubbleStyle.css";
export function ShowBubble({ value }: { value: string }) {
  return (
    // <div className="show">
    <ReactQuill
      className="bubble-editor"
      value={value}
      readOnly
      theme="bubble"
    />
    // </div>
  );
}
