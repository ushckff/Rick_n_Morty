import { useEffect, useState } from "react";
import Card from "./Card";

const Catalog = ({ query, setPages, page, pages }) => {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://rickandmortyapi.com/api/character/?name=${query}&page=${page}`,
    )
      .then((res) => {
        if (res.status === 404) {
          throw new Error("Нет результатов");
        }
        if (!res.ok) {
          throw new Error(`Err: ${res.status}`);
        }
        return res.json();
      })
      .then(
        (json) => (
          setError(""),
          setFilms(json.results),
          setPages(json.info.pages),
          setLoading(false)
        ),
      )
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        setFilms([]);
      });
  }, [query, page, setPages]);
  // сеттер в зависимости кинул чтобы линтер не ругался

  if (loading) {
    return <span>Loading....</span>;
  }

  function cardClick(e) {
    const card = e.target.closest("li");
    if (!card) return;
    console.log(films.find((film) => film.id == card.id));
  }

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          <span>
            Страница {page} из {pages}
          </span>
          <ul className="list" onClick={cardClick}>
            {films.map((film) => (
              <Card key={film.id} film={film} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Catalog;
