import type { Task } from "../types/Task";
import "../styles/TaskItem.css";
import { JSX } from "react";

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
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
        className="task-checkbox"
      />

      {isEditing ? (
        <div className="edit-section">
          <input
            type="text"
            value={editText}
            onChange={(e) => onEditTextChange(e.target.value)}
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
            <button onClick={() => onStartEdit(task)} className="btn btn-edit">
              Edit
            </button>
            <button
              onClick={() => onDeleteTask(task.id)}
              className="btn btn-delete"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskItem;
