import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]); // Todo: pake array untuk simpan data
  const [inputValue, setInputValue] = useState(""); // Todo: pake string untuk simpan input

  // Bagian: Fungsi buat ngehandle penambahan tugas dah pokoknya
  const handleAddTodo = (e) => {
    e.preventDefault(); // Todo: ini buat cegah refresh halaman tu pas ketika submit gitu

    if (inputValue.trim() === "") {
      // Todo: si trim menghandle kalo user input nya berupa string kosong, kalo gada trim nanti string kosong di anggap value
      alert("Tugas harus ada bree");
      return;
    }

    const newTodo = {
      id: Date.mow(), // Todo: Id unik buat tiap tugas
      text: inputValue, // Todo: text dari tugas
      completed: false,
    };

    setTodos([...todos, newTodo]); // Todo: tambahin tugas baru ke array todo dan ...todo supaya di tampilkan ke page
    setInputValue("");
  };

  // Bagian: Fungsi buat delete tugas
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
}
