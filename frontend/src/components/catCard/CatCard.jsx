import React from "react";
import { Link } from "react-router-dom";
import "./CatCard.scss";

function CatCard({ card }) {
  return (
    <Link to={`/estate/${card._id}`}>
      <div className="category__card">
        <img src={card.cover} alt="" />
        <div className="category__details">
          <p className="category__desc">{card.shortDesc}</p>
          <p className="category__title">{card.title}</p>
        </div>
      </div>
    </Link>
  );
}
export default CatCard;
