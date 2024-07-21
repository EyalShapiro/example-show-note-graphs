import PlusIcon from "../../components/icons/PlusIcon";
import {
  useSensors,
  useSensor,
  PointerSensor,
  DndContext,
  DragOverlay,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import ColumnContainer from "../../components/Kanban/ColumnContainer";
import { useKanbanBoard } from "./useKanbanBoard";
import TaskCard from "../../components/Kanban/TaskCard";

function KanbanBoardPages() {
  // קריאה לפונקציית custom hook שמחזירה נתונים ופונקציות עבור לוח הקאנבן
  const {
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
  } = useKanbanBoard();

  // יצירת חיישנים עבור מערכת הגרירה
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            {/* הקונטקסט של פריטים שניתן למיין */}
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={() => {
              createNewColumn();
            }}
            className="flex h-[60px] w-[350px] min-w-[350px] cursor-pointer gap-2 rounded-lg border-2 border-columnBackgroundColor bg-mainBackgroundColor p-4 ring-rose-500 hover:ring-2"
          >
            <PlusIcon />
            Add Column
          </button>
        </div>

        {createPortal(
          <DragOverlay>
            {/* אם יש עמודה פעילה, מציגים אותה */}
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
              />
            )}
            {/* אם יש משימה פעילה, מציגים אותה */}
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}

export default KanbanBoardPages;
