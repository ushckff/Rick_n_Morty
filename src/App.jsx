import { useState, useId, useEffect } from "react";
import Catalog from "./Catalog";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const inputId = useId();
  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(inputValue);
    }, 400);

    return () => clearTimeout(timer);
  }, [inputValue]);
  function inputChange(e) {
    setInputValue(e.target.value);
    setPage(1);
  }
  function prevPage() {
    setPage((page) => (page > 1 ? page - 1 : page));
  }
  function nextPage() {
    setPage((page) => (page < pages ? page + 1 : page));
  }
  return (
    <div>
      <h1>Поиск Rick & Morty</h1>
      <label htmlFor={inputId}>Введите название</label>
      <input
        id={inputId}
        type="text"
        value={inputValue}
        onChange={inputChange}
      />
      <div className="pagination">
        <button onClick={prevPage}>Назад</button>
        <button onClick={nextPage}>Вперед</button>
      </div>
      <Catalog query={query} page={page} setPages={setPages} pages={pages} />
    </div>
  );
};

export default App;
