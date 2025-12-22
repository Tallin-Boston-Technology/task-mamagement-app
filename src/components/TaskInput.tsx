import { JSX, useState } from "react";
import "../styles/TaskInput.css";

interface TaskInputProps {
  onAddTask: (taskTitle: string) => void;
}

function TaskInput({ onAddTask }: TaskInputProps): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");

  const handleAdd = (): void => {
    if (newTask.trim()) {
      onAddTask(newTask);
      setNewTask("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
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
      />
      <button onClick={handleAdd} className="btn btn-add">
        Add Task
      </button>
    </div>
  );
}

export default TaskInput;
