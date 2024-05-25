import React from "react";
import "./EstateCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const EstateCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });
  return (
    <Link to={`/estate/${item._id}`} className="link">
      <div className="estate__card">
        <img src={item.cover} alt="" />
        <div className="estate__detail">
          <div className="estate__info">
            {isLoading ? (
              "loading"
            ) : error ? (
              "Something went wrong!"
            ) : (
              <div className="estate__user">
                <img src={data.img || "/img/noavatar.jpg"} alt="" />
                <span>{data.username}</span>
              </div>
            )}
            <p className="estate__desc">{item.shortDesc}</p>
            <div className="estate__star">
              <img src="./img/star.png" alt="" />
              <span>
                {!isNaN(item.totalStars / item.starNumber) &&
                  Math.round(item.totalStars / item.starNumber)}
              </span>
            </div>
          </div>
          <div className="estate__price">
            <h2>₹{item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EstateCard;
