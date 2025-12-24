import type { Task } from "../types/Task";
import "../styles/TaskItem.css";
import { JSX, useState } from "react";

interface TaskItemProps {
  task: Task;
  isEditing: boolean;
  editText: string;
  onEditTextChange: (text: string) => void;
  onToggleComplete: (id: number) => void;
  onStartEdit: (task: Task) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onDeleteTask: (id: number) => void;
}

function TaskItem({
  task,
  isEditing,
  editText,
  onEditTextChange,
  onToggleComplete,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDeleteTask,
}: TaskItemProps): JSX.Element {
  const [deleting, setDeleting] = useState(false);
  const handleDelete = async () => {
    setDeleting(true);
    try {
      onDeleteTask(task.id);
    } finally {
      setDeleting(false);
    }
  };

  const handleEditKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === "Enter") {
      onSaveEdit();
    } else if (e.key === "Escape") {
      onCancelEdit();
    }
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
        className="task-checkbox"
        disabled={deleting}
      />

      {isEditing ? (
        <div className="edit-section">
          <input
            type="text"
            value={editText}
            onChange={(e) => onEditTextChange(e.target.value)}
            onKeyDown={handleEditKeyPress}
            className="edit-input"
            autoFocus
          />
          <button onClick={onSaveEdit} className="btn btn-save">
            Save
          </button>
          <button onClick={onCancelEdit} className="btn btn-cancel">
            Cancel
          </button>
        </div>
      ) : (
        <>
          <span className="task-title">{task.title}</span>
          <div className="task-actions">
            <button
              onClick={() => onStartEdit(task)}
              className="btn btn-edit"
              disabled={deleting}
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-delete"
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskItem;
