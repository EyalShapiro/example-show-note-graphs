import { useState } from 'react'
import TrashIcon from '../icons/TrashIcon'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Id, Task } from './types'

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

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl bg-mainBackgroundColor p-2.5 text-left hover:ring-2 hover:ring-inset hover:ring-sky-900"
      >
        <textarea
          className="h-[90%] w-full resize-none rounded border-none bg-transparent text-indigo-800 focus:outline-none"
          value={task.content}
          autoFocus
          placeholder="Task content here"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.shiftKey) {
              toggleEditMode()
            }
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
        />
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
      onMouseEnter={() => {
        setMouseIsOver(true)
      }}
      onMouseLeave={() => {
        setMouseIsOver(false)
      }}
    >
      <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        {task.content}
      </p>

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