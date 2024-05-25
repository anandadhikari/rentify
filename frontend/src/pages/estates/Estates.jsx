import React, { useEffect, useRef, useState } from "react";
import "./Estates.scss";
import EstateCard from "../../components/estateCard/EstateCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";

function Estates() {
  const [sort, setSort] = useState("tenent");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["estates"],
    queryFn: () =>
      newRequest
        .get(
          `/estates?${search.replace("?", "")}&min=${minRef.current.value}&max=${
            maxRef.current.value
          }&sort=${sort}`
        )
        .then((res) => {
          return res.data;
        }),
  });

  console.log(data)

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort]);

  const apply = () => {
    refetch();
  };

  return (
    <div className="estates">
      <div className="container">
        <h1>All Estates</h1>
        <p>
          Explore through a treasure trove of collegiate talent and treasures
        </p>
        <div className="menu">
          <div className="left">
            <span className="breacrumbs">Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>

          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "tenent" ? "Popular" : "Newest"}
            </span>

            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "tenent" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("tenent")}>Popular</span>
                )}
                <span onClick={() => reSort("tenent")}>Popular</span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading
            ? "loading"
            : error
            ? "Something went wrong!"
            : data.map((estate) => <EstateCard key={estate._id} item={estate} />)}
        </div>
      </div>
    </div>
  );
}

export default Estates;
