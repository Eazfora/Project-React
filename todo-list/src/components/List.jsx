export default function List({
  sortedTodos,
  todos,
  editingTodoId,
  editingText,
  setEditingText,
  handleSaveEdit,
  handleCancelEdit,
  handleToggleComplete,
  handleStartEdit,
  handleDeleteTodo,
  check,
}) {
  return (
    <ul className="todo-list">
      {sortedTodos.length === 0 && todos.length > 0 && (
        <p className="no-tasks-message">
          Tidak ada tugas yang cocok dengan filter.
        </p>
      )}

      {todos.length === 0 && (
        <p className="no-tasks-message">
          Tidak ada tugas. Mari tambahkan satu!
        </p>
      )}

      {sortedTodos.map((todo) => (
        <li
          key={todo.id}
          className={`todo-item ${todo.completed ? "completed" : ""} ${
            todo.priority
          } ${todo.deleting ? "deleting" : ""}`}
        >
          {editingTodoId === todo.id ? (
            <div className="edit-mode flex flex-row gap-x-3">
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                className="w-full p-2 rounded-lg border-2"
              />
              <button onClick={() => handleSaveEdit(todo.id)}>Simpan</button>
              <button onClick={handleCancelEdit} className="cancel-button">
                Batal
              </button>
            </div>
          ) : (
            <>
              <span
                onClick={() => handleToggleComplete(todo.id)}
                className={`flex flex-row gap-x-6 ${check ? "italic" : ""}`}
              >
                <p className="font-bold bg-purple-300 basis-2xl text-center text-[20px] rounded-2xl">
                  {todo.text}
                </p>
                <div
                  className={`priority-tag ${todo.priority} bg-amber-800 rounded-2xl border basis-2xl flex gap-x-2 justify-center
                  }`}
                >
                  <p className="font-bold text-white">Prioritas :</p>
                  <p
                    className={`font-extrabold  ${
                      todo.priority === "high"
                        ? "text-red-500"
                        : todo.priority === "medium"
                        ? "text-amber-200"
                        : "text-green-300"
                    }`}
                  >
                    {todo.priority === "high"
                      ? "Tinggi"
                      : todo.priority === "medium"
                      ? "Sedang"
                      : "Rendah"}
                  </p>
                </div>
              </span>
              <div className="todo-actions flex flex-row gap-x-3 ">
                <button
                  onClick={() => handleStartEdit(todo)}
                  className="edit-button hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="delete-button hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
                >
                  Hapus
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
