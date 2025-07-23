import { useState, useEffect } from "react";

import Control from "./components/Control";
import Form from "./components/Form";
import List from "./components/List";

export default function App() {
  // Bagian: State menyimpan daftar tugas
  // Bagian: Memuat dari localStorage saat inisialisasi, atau array kosong jika belum ada
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : []; // Todo: pake array untuk simpan data
  });

  // Bagian: State untuk input tugas baru
  const [inputValue, setInputValue] = useState(""); // Todo: pake string untuk simpan input
  // Bagian: State untuk prioritas tugas baru
  const [inputPriority, setInputPriority] = useState("medium");

  const [ValidationMessage, setValidationMessage] = useState("");

  // Bagian: State untuk filter tugas (all, completed, pending)
  const [filter, setFilter] = useState("all");
  // Bagian: State untuk pengurutan tugas (none, priority-asc, priority-desc)
  const [sortBy, setSortBy] = useState("none");

  // Bagian: State untuk mengelola mode edit
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Bagian: State Check
  const [check, setCheck] = useState(false);

  // Bagian: useEffect untuk menyimpan todos ke localStorage setiap kali ada perubahan pada state todos
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Bagian: Fungsi buat ngehandle penambahan tugas dah pokoknya ( Create )
  const handleAddTodo = (e) => {
    e.preventDefault(); // Todo: ini buat cegah refresh halaman tu pas ketika submit gitu

    if (inputValue.trim() === "") {
      // Todo: si trim menghandle kalo user input nya berupa string kosong, kalo gada trim nanti string kosong di anggap value
      // setValidationMessage("Tugas tidak boleh kosong!");
      alert("Tugas tidak boleh kosong!");
      return;
    }

    const newTodo = {
      id: Date.now(), // Todo: Id unik buat tiap tugas
      text: inputValue, // Todo: text dari tugas
      completed: false,
      priority: inputPriority,
    };

    setTodos([...todos, newTodo]); // Todo: tambahin tugas baru ke array todo dan ...todo supaya di tampilkan ke page
    setInputValue(""); // Todo: Kosongkan input setelah tugas ditambahkan
    setInputPriority("medium"); // Todo Reset prioritas ke default
  };

  // Bagian: Fungsi untuk menghapus tugas
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

  // Bagian: Fungsi untuk memulai mode edit
  const handleStartEdit = (todo) => {
    setEditingTodoId(todo.id);
    setEditingText(todo.text);
  };

  // Bagian: Fungsi untuk menyimpan perubahan setelah edit
  const handleSaveEdit = (id) => {
    if (editingText.trim() === "") {
      setValidationMessage("Tugas yang diedit tidak boleh kosong!");
      return;
    }
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editingText.trim() } : todo
      )
    );
    setEditingTodoId(null); // Todo: Keluar dari mode edit
    setEditingText("");
    setValidationMessage("");
  };

  // Bagian: Fungsi untuk membatalkan mode edit
  const handleCancelEdit = () => {
    setEditingTodoId(null);
    setEditingText("");
    setValidationMessage("");
  };

  // Bagian: Logika untuk filter tugas
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") {
      return todo.completed;
    } else if (filter === "pending") {
      return !todo.completed;
    }
    return true; // 'all'
  });

  // Bagian: Logika pengurutan tugas
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sortBy === "priority-asc") {
      const priorityOrder = { low: 1, medium: 2, high: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    } else if (sortBy === "priority-desc") {
      const priorityOrder = { low: 1, medium: 2, high: 3 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return 0; // 'none' atau default order
  });

  return (
    <div className=" p-10 rounded-2xl bg-cyan-200 shadow-2xl ">
      <h1 className="font-bold text-3xl">Aplikasi To-Do List Canggih</h1>

      <Form
        handleAddTodo={handleAddTodo}
        inputValue={inputValue}
        inputPriority={inputPriority}
        setInputValue={setInputValue}
        setInputPriority={setInputPriority}
      />

      <Control
        filter={filter}
        setFilter={setFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <List
        sortedTodos={sortedTodos}
        todos={todos}
        editingTodoId={editingTodoId}
        editingText={editingText}
        setEditingText={setEditingText}
        handleSaveEdit={handleSaveEdit}
        handleCancelEdit={handleCancelEdit}
        handleToggleComplete={handleToggleComplete}
        handleStartEdit={handleStartEdit}
        handleDeleteTodo={handleDeleteTodo}
        check={check}
      />
    </div>
  );
}
