import { useState } from "react";

import { Task } from "../types";
import { TextareaQuill } from "./TextareaQuill";

interface Props {
  task: Task;
  updateTaskContent: (content: string) => void;
}

export function ModelCardEdit({ task, updateTaskContent }: Props) {
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  return (
    <>
      {!editMode && (
        <div
          onClick={toggleEditMode}
          className="ql-editor my-auto h-[90%] w-full overflow-y-auto
           overflow-x-hidden whitespace-pre-wrap"
        >
          <div dangerouslySetInnerHTML={{ __html: task.content }} />
          {/* <ShowBubble value={task.content} /> לא משודר*/}
        </div>
      )}
      {editMode && (
        <>
          <div className="modal modal-open h-full " role="dialog">
            <div
              className="modal-box card  card-compact relative flex h-[96rem] w-full
              items-center rounded-xl
             bg-mainBackgroundColor p-2.5 text-left
              hover:ring-sky-900"
              onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside it
            >
              <h2 className="card-title text-sky-400">
                כרטיס <p> {`(${task.id} `}</p>
              </h2>
              <span className="card-body border">
                <TextareaQuill
                  value={task.content}
                  onChange={updateTaskContent}
                />
                <input
                  multiple
                  type="file"
                  className="file-input file-input-ghost w-full file-input-bordered file-input-lg"
                />
              </span>

              <span className="modal-action flex justify-between w-1/2">
                <button
                  onClick={toggleEditMode}
                  className="btn text-white btn-info"
                >
                  שמירה
                </button>
                <button
                  onClick={toggleEditMode}
                  className="btn btn-outline btn-info"
                >
                  סגירה
                </button>
              </span>
            </div>
          </div>
          <div className="modal-backdrop" onClick={toggleEditMode}></div>
        </>
      )}
    </>
  );
}
