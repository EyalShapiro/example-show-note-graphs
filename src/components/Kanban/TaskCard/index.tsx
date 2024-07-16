import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './TaskCardStyle.css'
import TrashIcon from '../../icons/TrashIcon'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Id, Task } from '../types'

interface Props {
  task: Task
  deleteTask: (id: Id) => void
  updateTask: (id: Id, content: string) => void
}

function TaskCard({ task, deleteTask, updateTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false)
  const [editMode, setEditMode] = useState(true)

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
    disabled: editMode,
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  const toggleEditMode = () => {
    setEditMode((prev) => !prev)
    setMouseIsOver(false)
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl border-2 border-teal-500 bg-teal-300 p-2.5 text-left opacity-30"
      />
    )
  }

  if (!editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl bg-mainBackgroundColor p-2.5 text-left hover:ring-2 hover:ring-inset hover:ring-sky-900"
      >
        <ReactQuill
          className="snow-editor"
          value={task.content}
          onChange={(content) => updateTask(task.id, content)}
        />
        <button onClick={toggleEditMode} className="ml-2">
          Save
        </button>
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      className="task relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl bg-mainBackgroundColor p-2.5 text-left hover:ring-2 hover:ring-inset hover:ring-rose-500"
      // onMouseEnter={() => {
      //   setMouseIsOver(true)
      // }}
      // onMouseLeave={() => {
      //   setMouseIsOver(false)
      // }}
    >
      <div className="ql-editor my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        <div dangerouslySetInnerHTML={{ __html: task.content }} />
      </div>
      {mouseIsOver && (
        <button
          onClick={() => {
            deleteTask(task.id)
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded bg-columnBackgroundColor stroke-white p-2 opacity-60 hover:opacity-100"
        >
          <TrashIcon />
        </button>
      )}
    </div>
  )
}

export default TaskCard
