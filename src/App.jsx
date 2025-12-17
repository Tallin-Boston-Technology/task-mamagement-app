import { useState, useEffect, useRef } from "react";

// Custom Hook for fetching tasks
const useFetchTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        // Using JSONPlaceholder API for demo
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_limit=5"
        );
        if (!response.ok) throw new Error("Failed to fetch tasks");
        const data = await response.json();

        // Transform API data to our task structure
        const transformedTasks = data.map((item) => ({
          id: item.id,
          title: item.title,
          completed: item.completed,
        }));

        setTasks(transformedTasks);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return { tasks, setTasks, loading, error };
};

// Main App Component
export default function App() {
  const { tasks, setTasks, loading, error } = useFetchTasks();
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [newTask, setNewTask] = useState("");
  const renderCount = useRef(0);

  // Increment render count (refs don't cause re-renders)
  renderCount.current += 1;

  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        title: newTask,
        completed: false,
      };
      setTasks([...tasks, task]);
      setNewTask("");
    }
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
            onKeyPress={(e) => e.key === "Enter" && addTask()}
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
                <div
                  key={task.id}
                  className={`task-item ${task.completed ? "completed" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id)}
                    className="task-checkbox"
                  />

                  {editingId === task.id ? (
                    <div className="edit-section">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="edit-input"
                        autoFocus
                      />
                      <button onClick={saveEdit} className="btn btn-save">
                        Save
                      </button>
                      <button onClick={cancelEdit} className="btn btn-cancel">
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="task-title">{task.title}</span>
                      <div className="task-actions">
                        <button
                          onClick={() => startEdit(task)}
                          className="btn btn-edit"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="btn btn-delete"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </main>

      <Footer renderCountRef={renderCount} />

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
        }

        .app-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .main-content {
          flex: 1;
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          width: 100%;
        }

        .task-input-section {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .task-input {
          flex: 1;
          padding: 0.875rem 1rem;
          border: 2px solid transparent;
          border-radius: 8px;
          font-size: 1rem;
          background: white;
          transition: all 0.3s ease;
        }

        .task-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .btn {
          padding: 0.875rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-add {
          background: #10b981;
          color: white;
        }

        .btn-add:hover {
          background: #059669;
          transform: translateY(-2px);
        }

        .loading, .error {
          text-align: center;
          padding: 2rem;
          background: white;
          border-radius: 12px;
          font-size: 1.125rem;
        }

        .error {
          background: #fee2e2;
          color: #991b1b;
        }

        .task-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .empty-state {
          text-align: center;
          padding: 3rem;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 12px;
          color: #6b7280;
          font-size: 1.125rem;
        }

        .task-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .task-item:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transform: translateY(-2px);
        }

        .task-item.completed {
          background: #f3f4f6;
        }

        .task-checkbox {
          width: 1.25rem;
          height: 1.25rem;
          cursor: pointer;
        }

        .task-title {
          flex: 1;
          font-size: 1rem;
          color: #1f2937;
        }

        .task-item.completed .task-title {
          text-decoration: line-through;
          color: #9ca3af;
        }

        .task-actions {
          display: flex;
          gap: 0.5rem;
        }

        .btn-edit {
          background: #3b82f6;
          color: white;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }

        .btn-edit:hover {
          background: #2563eb;
        }

        .btn-delete {
          background: #ef4444;
          color: white;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }

        .btn-delete:hover {
          background: #dc2626;
        }

        .edit-section {
          flex: 1;
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .edit-input {
          flex: 1;
          padding: 0.5rem;
          border: 2px solid #667eea;
          border-radius: 6px;
          font-size: 1rem;
        }

        .edit-input:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .btn-save {
          background: #10b981;
          color: white;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }

        .btn-save:hover {
          background: #059669;
        }

        .btn-cancel {
          background: #6b7280;
          color: white;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }

        .btn-cancel:hover {
          background: #4b5563;
        }
      `}</style>
    </div>
  );
}

function Header() {
  return (
    <header
      style={{
        background: "rgba(255, 255, 255, 0.95)",
        padding: "1.5rem 2rem",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "700",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textAlign: "center",
        }}
      >
        Task Manager
      </h1>
    </header>
  );
}

function Footer({ renderCountRef }) {
  return (
    <footer
      style={{
        background: "rgba(255, 255, 255, 0.95)",
        padding: "1rem 2rem",
        textAlign: "center",
        color: "#6b7280",
        fontSize: "0.875rem",
        boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)",
      }}
    >
      <p>
        Page Renders: <strong>{renderCountRef.current}</strong>
      </p>
    </footer>
  );
}
