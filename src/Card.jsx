const Card = ({ film }) => {
  return (
    <li className="card" id={film.id}>
      <div style={{ width: 300, height: 320, padding: 25 }}>
        <img src={film.image} alt="image" style={{ width: 250, height: 250 }} />
        <p>{film.name}</p>
      </div>
    </li>
  );
};

export default Card;
