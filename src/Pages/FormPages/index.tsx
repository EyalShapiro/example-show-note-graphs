import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ShowBubble } from '../../components/ShowBubble'
import { Id, Task } from '../../components/Kanban/types'
import ReactQuill from 'react-quill'
import { toolbarTaskCard } from '../../components/Kanban/TaskCard/toolbarTaskCard'
import TrashIcon from '../../components/icons/TrashIcon'

interface Props {
  task: Task
  deleteTask: (id: Id) => void
  updateTask: (id: Id, content: string) => void
}

function TaskCard({ task, deleteTask, updateTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(true)
  const [editMode, setEditMode] = useState(true)
  const { formats, modules } = toolbarTaskCard()

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
        className="relative flex h-[150px] min-h-[150px] cursor-grab items-center rounded-xl border-2 border-teal-500 bg-teal-300 p-2.5 text-left opacity-30"
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
        <ReactQuill
          theme="snow"
          value={task.content}
          onChange={(content) => updateTask(task.id, content)}
          className={`snow-editor`} // Corrected the typo
          modules={modules}
          formats={formats}
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
    >
      <ShowBubble value={task.content} />
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
