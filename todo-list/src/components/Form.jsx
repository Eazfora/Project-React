export default function Form({
  handleAddTodo,
  inputValue,
  inputPriority,
  setInputValue,
  setInputPriority,
}) {
  return (
    <form
      onSubmit={handleAddTodo}
      className="todo-form rounded-2xl flex gap-x-1"
    >
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Tambahkan tugas baru..."
        className="bg-white"
      />

      <select
        className="bg-white rounded-xl w-30 p-2 outline-none"
        value={inputPriority}
        onChange={(e) => setInputPriority(e.target.value)}
      >
        <option value="low">Rendah</option>
        <option value="medium">Sedang</option>
        <option value="high">Tinggi</option>
      </select>

      <button
        type="submit"
        className="p-4 ml-2 hover:scale-105 hover:shadow-xl
        transition-all
        duration-300
        ease-in-out
        "
      >
        Tambah Tugas
      </button>
    </form>
  );
}
