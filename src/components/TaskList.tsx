import TaskItem from "./TaskItem";
import type { Task } from "../types/Task";
import "../styles/TaskList.css";
import { JSX } from "react";

interface TaskListProps {
  tasks: Task[];
  editingId: number | null;
  editText: string;
  onEditTextChange: (text: string) => void;
  onToggleComplete: (id: number) => void;
  onStartEdit: (task: Task) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onDeleteTask: (id: number) => void;
}

function TaskList({
  tasks,
  editingId,
  editText,
  onEditTextChange,
  onToggleComplete,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDeleteTask,
}: TaskListProps): JSX.Element {
  if (tasks.length === 0) {
    return <p className="empty-state">No tasks yet. Add one to get started!</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          isEditing={editingId === task.id}
          editText={editText}
          onEditTextChange={onEditTextChange}
          onToggleComplete={onToggleComplete}
          onStartEdit={onStartEdit}
          onSaveEdit={onSaveEdit}
          onCancelEdit={onCancelEdit}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
}

export default TaskList;
