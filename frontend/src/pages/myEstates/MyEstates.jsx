import React from "react";
import { Link } from "react-router-dom";
import "./MyEstates.scss";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function MyEstates() {
  const currentUser = getCurrentUser();

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myEstates"],
    queryFn: () =>
      newRequest.get(`/estates?userId=${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/estates/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myEstates"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="myestates container">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="myestates__container">
          <div className="title-bar">
            <h1 className="title">Estates</h1>
            {currentUser.isSeller && (
              <Link to="/add">
                <button className="btn addestate__btn">Add New Estate</button>
              </Link>
            )}
          </div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price/Month</th>
                <th>Tenent</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((estate) => (
                <tr key={estate._id}>
                  <td>
                    <div className="image_cont">
                      <img className="image" src={estate.cover} alt="" />
                    </div>
                  </td>
                  <td>{estate.title}</td>
                  <td>{estate.price}</td>
                  <td>{estate.tenent}</td>
                  <td>
                    <img
                      className="delete"
                      src="./img/others/delete.png"
                      alt=""
                      onClick={() => handleDelete(estate._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyEstates;
