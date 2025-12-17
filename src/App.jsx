import { useState } from "react";

import { useFetchTasks } from "./hooks/useFetchTask";
import Header from "./components/Header";
import TaskItem from "./components/TaskItem";
import Footer from "./components/Footer";

import "./styles/App.css";

let appRenderCount = 0;

export default function App() {
  const { tasks, setTasks, loading, error } = useFetchTasks();
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [newTask, setNewTask] = useState("");

  appRenderCount += 1;

  const addTask = () => {
    if (!newTask.trim()) return;

    setTasks([...tasks, { id: Date.now(), title: newTask, completed: false }]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.title);
  };

  const saveEdit = () => {
    if (!editText.trim()) return;

    setTasks(
      tasks.map((task) =>
        task.id === editingId ? { ...task, title: editText } : task
      )
    );

    setEditingId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        <div className="task-input-section">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Add a new task..."
            className="task-input"
          />
          <button onClick={addTask} className="btn btn-add">
            Add Task
          </button>
        </div>

        {loading && <div className="loading">Loading tasks...</div>}
        {error && <div className="error">Error: {error}</div>}

        {!loading && !error && (
          <div className="task-list">
            {tasks.length === 0 ? (
              <p className="empty-state">
                No tasks yet. Add one to get started!
              </p>
            ) : (
              tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  editingId={editingId}
                  editText={editText}
                  setEditText={setEditText}
                  toggleComplete={toggleComplete}
                  startEdit={startEdit}
                  saveEdit={saveEdit}
                  cancelEdit={cancelEdit}
                  deleteTask={deleteTask}
                />
              ))
            )}
          </div>
        )}
      </main>

      <Footer renderCount={appRenderCount} />
    </div>
  );
}
