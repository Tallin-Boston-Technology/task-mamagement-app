import { JSX, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import type { Task } from "./types/Task";
import useFetchTasks from "./hooks/useFetchTask";
import "./styles/App.css";

let appRenderCount: number = 0;

export default function App(): JSX.Element {
  const { tasks, setTasks, loading, error } = useFetchTasks();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  appRenderCount += 1;

  const addTask = (taskTitle: string): void => {
    const task: Task = {
      id: Date.now(),
      title: taskTitle,
      completed: false,
    };
    setTasks([...tasks, task]);
  };

  const deleteTask = (id: number): void => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id: number): void => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const startEdit = (task: Task): void => {
    setEditingId(task.id);
    setEditText(task.title);
  };

  const saveEdit = (): void => {
    if (editText.trim()) {
      setTasks(
        tasks.map((task) =>
          task.id === editingId ? { ...task, title: editText } : task
        )
      );
      setEditingId(null);
      setEditText("");
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
        {error && <div className="error">Error: {error}</div>}

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
