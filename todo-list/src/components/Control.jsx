export default function Control({ filter, setFilter, sortBy, setSortBy }) {
  return (
    <div className="controls flex flex-col gap-y-7 mb-5 content-center justify-center">
      <div className="filter-buttons flex gap-x-10 place-content-center">
        <button
          className={`${
            filter === "all" ? "active" : ""
          } bg-white p-2 rounded-xl w-xl hover:scale-105 hover:shadow-xl
        transition-all
        duration-300
        ease-in-out focus:bg-blue-300`}
          onClick={() => setFilter("all")}
        >
          Semua
        </button>
        <button
          className={`${
            filter === "pending" ? "active bg-white p-2 rounded-xl w-xl" : ""
          } bg-white p-2 rounded-xl w-xl hover:scale-105 hover:shadow-xl transition-all  duration-300  ease-in-out focus:bg-blue-300`}
          onClick={() => setFilter("pending")}
        >
          Belum Selesai
        </button>
        <button
          className={`${
            filter === "completed" ? "active" : ""
          } bg-white p-2 rounded-xl w-xl hover:scale-105 hover:shadow-xl
        transition-all
        duration-300
        ease-in-out focus:bg-blue-300`}
          onClick={() => setFilter("completed")}
        >
          Selesai
        </button>
      </div>

      <div
        className="sort-dropdown bg-amber-50 p-3 rounded-2xl hover:scale-105 hover:shadow-xl
        transition-all
        duration-300
        ease-in-out "
      >
        <label htmlFor="sort">Urutkan : </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="outline-none"
        >
          <option value="none">Tidak Ada</option>
          <option value="priority-asc">Prioritas ( Rendah ke Tinggi )</option>
          <option value="priority-desc">Prioritas ( Tinggi ke Rendah )</option>
        </select>
      </div>
    </div>
  );
}
