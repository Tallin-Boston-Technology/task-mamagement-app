import { JSX, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import type { Task } from "./types/Task";
import useFetchTasks from "./hooks/useFetchTasks";
import "./styles/App.css";

let appRenderCount: number = 0;

function App(): JSX.Element {
  const { tasks, setTasks, loading, error } = useFetchTasks();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  appRenderCount += 1;

  const addTask = async (taskTitle: string): Promise<void> => {
    try {
      const task: Task = {
        id: Date.now(),
        title: taskTitle,
        completed: false,
      };

      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log("Task added locally (API Simulation)");

      setTasks([...tasks, task]);
    } catch (err) {
      console.error("Failed to add task:", err);
      alert("Failed to add task. Please try again");
    }
  };

  const deleteTask = async (id: number): Promise<void> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      console.log(`Task ${id} deleted (API Simulation)`);

      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Failed to delete task:", err);
      alert("Failed to delete task. please try again");
    }
  };

  const toggleComplete = async (id: number): Promise<void> => {
    try {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
      await new Promise((resolve) => setTimeout(resolve, 200));
      console.log(`Task ${id} toggled (API Simulation)`);
    } catch (err) {
      console.error("Failed to toggle task:", err);

      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
      alert("Failed to update task. Please try again");
    }
  };

  const startEdit = (task: Task): void => {
    setEditingId(task.id);
    setEditText(task.title);
  };

  const saveEdit = async (): Promise<void> => {
    if (editText.trim()) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));
        console.log(`task ${editingId} updated (API Simulation)`);
        setTasks(
          tasks.map((task) =>
            task.id === editingId ? { ...task, title: editText } : task
          )
        );
        setEditingId(null);
        setEditText("");
      } catch (err) {
        console.error("Failed to update task:", err);
        alert("Failed to update task. Please try again");
      }
    }
  };

  const cancelEdit = (): void => {
    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        <TaskInput onAddTask={addTask} />

        {loading && <div className="loading">Loading tasks...</div>}
        {error && (
          <div className="error">
            Error: {error}
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        )}

        {!loading && !error && (
          <TaskList
            tasks={tasks}
            editingId={editingId}
            editText={editText}
            onEditTextChange={setEditText}
            onToggleComplete={toggleComplete}
            onStartEdit={startEdit}
            onSaveEdit={saveEdit}
            onCancelEdit={cancelEdit}
            onDeleteTask={deleteTask}
          />
        )}
      </main>

      <Footer renderCount={appRenderCount} />
    </div>
  );
}

export default App;
