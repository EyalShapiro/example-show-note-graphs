import { useMemo, useState } from 'react'
import { Column, Id, Task } from '../../components/Kanban/types/index'
import { arrayMove } from '@dnd-kit/sortable'
import { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import { defaultCols, defaultTasks } from '../../components/Kanban/data'

export function useKanbanBoard() {
  // הגדרת state עבור העמודות והמשימות בלוח הקאנבן
  const [columns, setColumns] = useState<Column[]>(defaultCols)

  // יצירת מערך של מזהי העמודות בעזרת useMemo לשיפור ביצועים
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns])

  const [tasks, setTasks] = useState<Task[]>(defaultTasks)

  const [activeColumn, setActiveColumn] = useState<Column | null>(null)

  const [activeTask, setActiveTask] = useState<Task | null>(null)

  // פונקציה ליצירת משימה חדשה בעמודה מסוימת
  function createTask(columnId: Id) {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    }

    setTasks([...tasks, newTask])
  }

  // פונקציה למחיקת משימה לפי מזהה
  function deleteTask(id: Id) {
    const newTasks = tasks.filter((task) => task.id !== id)
    setTasks(newTasks)
  }

  // פונקציה לעדכון תוכן המשימה לפי מזהה
  function updateTask(id: Id, content: string) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task
      return { ...task, content }
    })

    setTasks(newTasks)
  }

  // פונקציה ליצירת עמודה חדשה
  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    }

    setColumns([...columns, columnToAdd])
  }

  // פונקציה למחיקת עמודה לפי מזהה
  function deleteColumn(id: Id) {
    const filteredColumns = columns.filter((col) => col.id !== id)
    setColumns(filteredColumns)

    const newTasks = tasks.filter((t) => t.columnId !== id)
    setTasks(newTasks)
  }

  // פונקציה לעדכון כותרת העמודה לפי מזהה
  function updateColumn(id: Id, title: string) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col
      return { ...col, title }
    })

    setColumns(newColumns)
  }

  // פונקציה שמופעלת בעת תחילת גרירה
  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column)
      return
    }

    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task)
      return
    }
  }

  // פונקציה שמופעלת בעת סיום גרירה
  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null)
    setActiveTask(null)

    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveAColumn = active.data.current?.type === 'Column'
    if (!isActiveAColumn) return

    // הזזת העמודות לפי מיקומן החדש
    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId)
      const overColumnIndex = columns.findIndex((col) => col.id === overId)
      return arrayMove(columns, activeColumnIndex, overColumnIndex)
    })
  }

  // פונקציה שמופעלת בעת גרירה מעל יעד אחר
  function onDragOver(event: DragOverEvent) {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveATask = active.data.current?.type === 'Task'
    const isOverATask = over.data.current?.type === 'Task'

    if (!isActiveATask) return

    // גרירת משימה מעל משימה אחרת
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId)
        const overIndex = tasks.findIndex((t) => t.id === overId)

        if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
          // שינוי עמודת המשימה במידה והיא הוזזה לעמודה אחרת
          tasks[activeIndex].columnId = tasks[overIndex].columnId
          return arrayMove(tasks, activeIndex, overIndex - 1)
        }

        return arrayMove(tasks, activeIndex, overIndex)
      })
    }

    const isOverAColumn = over.data.current?.type === 'Column'

    // גרירת משימה מעל עמודה
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId)
        tasks[activeIndex].columnId = overId
        return arrayMove(tasks, activeIndex, activeIndex)
      })
    }
  }

  return {
    columns,
    columnsId,
    tasks,
    activeColumn,
    activeTask,
    createTask,
    deleteTask,
    updateTask,
    createNewColumn,
    deleteColumn,
    updateColumn,
    onDragStart,
    onDragEnd,
    onDragOver,
  }
}

// פונקציה ליצירת מזהה ייחודי
function generateId() {
  /* Generate a random number between 0 and 10000 */
  return Math.floor(Math.random() * 10001)
}
