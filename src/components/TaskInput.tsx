import { JSX, useState } from "react";
import "../styles/TaskInput.css";

interface TaskInputProps {
  onAddTask: (taskTitle: string) => void;
}

function TaskInput({ onAddTask }: TaskInputProps): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleAdd = async (): Promise<void> => {
    if (newTask.trim() && !submitting) {
      setSubmitting(true);
      try {
        onAddTask(newTask);
        setNewTask("");
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !submitting) {
      handleAdd();
    }
  };

  return (
    <div className="task-input-section">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Add a new task..."
        className="task-input"
        disabled={submitting}
      />
      <button
        onClick={handleAdd}
        className="btn btn-add"
        disabled={submitting || !newTask.trim()}
      >
        {submitting ? "Adding..." : "Add Task"}
      </button>
    </div>
  );
}

export default TaskInput;
