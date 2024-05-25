import "./Navitem.scss";
import React from "react";
import { motion } from "framer-motion";
import { perspective } from "./anim";
import { Link, useNavigate } from "react-router-dom";
import newRequest from "../../../utils/newRequest";

export default function Navitem() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navitems">
      <motion.div
        custom={2}
        variants={perspective}
        initial="initial"
        animate="enter"
        exit="exit"
        className="navitemsbody"
      >
        <Link className="link" to="/">
          <a>Home</a>
        </Link>
        <Link className="link" to="/estates">
          <a>Explore</a>
        </Link>
        {currentUser ? (
          <div className="nav__user">
            <div className="signedin__user">
              <p>{currentUser?.username}</p>
              <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
            </div>
            <div className="signedin__user-options">
              {currentUser.isSeller && (
                <>
                  <Link className="link" to="/myestates">
                    <a>Estates</a>
                  </Link>
                  <Link className="link" to="/add">
                    <a>Add New Estate</a>
                  </Link>
                </>
              )}

              <Link className="link" onClick={handleLogout}>
                Logout
              </Link>
            </div>
          </div>
        ) : (
          <>
            <Link to="/login" className="link">
              Sign in
            </Link>
            <Link className="link" to="/register">
              <button>Register</button>
            </Link>
          </>
        )}
      </motion.div>
      <div className="linkContainer">
        
      </div>
    </div>
  );
}
