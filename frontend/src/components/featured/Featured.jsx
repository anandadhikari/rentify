import React, { useState } from "react";
import "./Featured.scss";
import { useNavigate } from "react-router-dom";

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/estates?search=${input}`);
  };

  return (
    <div className="hero">
      <div className="hero__container container">
        {/* <div className="hero__top"> */}
        <h1 className="hero__title">
        Where Renting Meets Simplicity
        </h1>
        <div className="hero__search">
          <div className="hero__searchInput">
            <input
              type="text"
              placeholder='Try "home"'
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="hero__search-btn" onClick={handleSubmit}>
            <img src="./img/others/srch.png" alt="" />
          </div>
        </div>
        {/* </div> */}
        {/* <div className="hero__bottom">

          <div className="popular">
            <span>Popular:</span>
            <button>Web Design</button>
            <button>WordPress</button>
            <button>Logo Design</button>
            <button>AI Services</button>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Featured;
