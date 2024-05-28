import React, { useReducer, useState, useEffect } from "react";
import "./Edit.scss";
import { estateReducer, INITIAL_STATE } from "../../reducers/estateReducer";
import upload from "../../utils/upload";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(estateReducer, INITIAL_STATE);

  const options = ["Sell", "Rent"];

  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["estate", id],
    queryFn: () =>
      newRequest.get(`/estates/single/${id}`).then((res) => res.data),
  });

  useEffect(() => {
    if (data) {
      dispatch({
        type: "SET_INITIAL_STATE",
        payload: data,
      });
    }
  }, []);

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
      return newRequest.patch(`/estates/${id}`, estate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myEstates"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
    navigate("/myEstates");
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="edit container">
      <section className="edit__container">
        <h1 className="edit__container-title">Edit Estate</h1>
        <div className="edit__container-sections">
          <div className="info">
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. sell or rent something"
              onChange={handleChange}
              value={state.title}
            />
            <label>Category</label>
            <select name="cat" onChange={handleChange} value={state.cat}>
              <option value="" disabled>
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
                <label>Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                <label>Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button className="btn upload__btn" onClick={handleUpload}>
                {uploading ? "Uploading" : "Upload"}
              </button>
            </div>
            <label>Description</label>
            <textarea
              name="desc"
              placeholder="Brief descriptions"
              cols="0"
              rows="13"
              onChange={handleChange}
              value={state.desc}
            ></textarea>
          </div>
          <div className="details">
            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Address"
              onChange={handleChange}
              value={state.address}
            />
            <label>Short Description</label>
            <textarea
              name="shortDesc"
              onChange={handleChange}
              placeholder="Short description of your service"
              cols="30"
              rows="10"
              value={state.shortDesc}
            ></textarea>
            <label>Number of Bedrooms</label>
            <input
              type="number"
              name="bedroomsNumber"
              onChange={handleChange}
              value={state.bedroomsNumber}
            />
            <label>Bathroom Number</label>
            <input
              type="number"
              name="bathroom"
              onChange={handleChange}
              value={state.bathroom}
            />
            <label>Amenities</label>
            <form className="amenite" onSubmit={handleFeature}>
              <input type="text" placeholder="Amenities" />
              <button className="btn amenite_btn" type="submit">
                Add
              </button>
            </form>
            <div className="addedfeatures">
              {state.features?.map((f) => (
                <div className="item" key={f}>
                  <button
                    className="addedfeatures__btn btn"
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                  >
                    {f}
                    <div className="addedfeatures__btn-img">
                      <img src="/img/others/cancel.png" alt="" />
                    </div>
                  </button>
                </div>
              ))}
            </div>
            <label>Price Per Month</label>
            <input
              type="number"
              onChange={handleChange}
              name="price"
              value={state.price}
            />
          </div>
        </div>
        <button className="create__btn btn" onClick={handleSubmit}>
          Update
        </button>
      </section>
    </div>
  );
};

export default Edit;
