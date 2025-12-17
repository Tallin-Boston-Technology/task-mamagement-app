import "../styles/TaskItem.css";

export default function TaskItem({
  task,
  editingId,
  editText,
  setEditText,
  toggleComplete,
  startEdit,
  saveEdit,
  cancelEdit,
  deleteTask,
}) {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
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
            <button onClick={() => startEdit(task)} className="btn btn-edit">
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
  );
}
