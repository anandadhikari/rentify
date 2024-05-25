import React, { useReducer, useState } from "react";
import "./Add.scss";
import { estateReducer, INITIAL_STATE } from "../../reducers/estateReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(estateReducer, INITIAL_STATE);

  const options = ["Sell", "Rent"];

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (estate) => {
      return newRequest.post("/estates", estate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myEstates"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
    navigate("/myestates");
  };

  return (
    <div className="add container">
      <section className="add__container">
        <h1 className="add__container-title">Add New Estate</h1>
        <div className="add__container-sections">
          <div className="info">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. sell or rent something"
              onChange={handleChange}
            />
            <label htmlFor="">Category</label>
            <select name="cat" id="cat" onChange={handleChange}>
              <option value="" disabled selected>
                Select a category
              </option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                <label htmlFor="">Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button className="btn upload__btn" onClick={handleUpload}>
                {uploading ? "uploading" : "Upload"}
              </button>
            </div>
            <label htmlFor="">Description</label>
            <textarea
              name="desc"
              id=""
              placeholder="Brief descriptions"
              cols="0"
              rows="13"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="details">
            <label htmlFor="">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Address"
              onChange={handleChange}
            />
            <label htmlFor="">Short Description</label>
            <textarea
              name="shortDesc"
              onChange={handleChange}
              id=""
              placeholder="Short description of your service"
              cols="30"
              rows="10"
            ></textarea>
            <label htmlFor="">Number of Bedrooms</label>
            <input type="number" name="bedroomsNumber" onChange={handleChange} />
            <label htmlFor="">Bathroom Number</label>
            <input
              type="number"
              name="bathroom"
              onChange={handleChange}
            />
            <label htmlFor="">Amenites</label>
            <form action="" className="Amenite" onSubmit={handleFeature}>
              <input
                type="text"
                placeholder="Amenites"
              />
              <button className="btn Amenite_btn" type="submit">
                add
              </button>
            </form>
            <div className="addedfeatures">
              {state?.features?.map((f) => (
                <div className="item" key={f}>
                  <button
                    className="addedfeatures__btn btn"
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                  >
                    {f}
                    <div className="addedfeatures__btn-img">
                      <img src="../../../public/img/others/cancel.png" alt="" />
                    </div>
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor="">Price Per Month</label>
            <input type="number" onChange={handleChange} name="price" />
          </div>
        </div>
        <button className="create__btn btn" onClick={handleSubmit}>
          Create
        </button>
      </section>
    </div>
  );
};

export default Add;
