import { Task } from "../../Kanban/types";

export const filterTasksByTime = (tasks: Task[], filter: string): Task[] => {
  const now = new Date();
  return tasks.filter((task) => {
    const taskDate = new Date(task.time);
    const timeDiff = now.getTime() - taskDate.getTime();
    switch (filter) {
      case "week":
        return timeDiff / (1000 * 60 * 60 * 24) <= 7;
      case "day":
        return timeDiff / (1000 * 60 * 60 * 24) <= 1;
      case "last3months":
        return timeDiff / (1000 * 60 * 60 * 24 * 30) <= 3;
      case "last6months":
        return timeDiff / (1000 * 60 * 60 * 24 * 30) <= 6;
      case "lastyear":
        return timeDiff / (1000 * 60 * 60 * 24 * 365) <= 1;
      default:
        return true;
    }
  });
};
