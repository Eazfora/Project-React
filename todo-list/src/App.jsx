import { useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([]); // Todo: pake array untuk simpan data
  const [inputValue, setInputValue] = useState(""); // Todo: pake string untuk simpan input

  // Bagian: Fungsi buat ngehandle penambahan tugas dah pokoknya ( Create )
  const handleAddTodo = (e) => {
    e.preventDefault(); // Todo: ini buat cegah refresh halaman tu pas ketika submit gitu

    if (inputValue.trim() === "") {
      // Todo: si trim menghandle kalo user input nya berupa string kosong, kalo gada trim nanti string kosong di anggap value
      alert("Tugas harus ada bree");
      return;
    }

    const newTodo = {
      id: Date.now(), // Todo: Id unik buat tiap tugas
      text: inputValue, // Todo: text dari tugas
      completed: false,
    };

    setTodos([...todos, newTodo]); // Todo: tambahin tugas baru ke array todo dan ...todo supaya di tampilkan ke page
    setInputValue("");
  };

  // Bagian: Fungsi buat delete tugas ( Delete )
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Bagian: Menandai tugas selesai atau belum
  const handleToggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="App">
      <h1>Aplikasi To-Do List</h1>

      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Tambahkan tugas baru..."
        />

        <button type="submit">Tambah Tugas</button>
      </form>

      <ul>
        {todos.length === 0 ? (
          <p>Tidak ada tugas. Mari tambahkan satu!</p>
        ) : (
          todos.map((todo) => (
            <li key={todo.id} className={todo.completed ? "completed" : ""}>
              <span onClick={() => handleToggleComplete(todo.id)}>
                {todo.text}
              </span>
              <button onClick={() => handleDeleteTodo(todo.id)}>Hapus</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
