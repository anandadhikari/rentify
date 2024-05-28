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
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
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
                <th>Tenant</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((estate) => (
                <tr key={estate._id}>
                  <td>
                    <div className="image_cont">
                    <Link to={`/estate/${estate._id}`}>
                      <img className="image" src={estate.cover} alt="" />
                      </Link>
                    </div>
                  </td>
                  <td>{estate.title}</td>
                  <td>{estate.price}</td>
                  <td>{estate.tenent}</td>
                  <td>
                    <img
                      className="delete"
                      src="./img/others/delete.png"
                      alt="delete"
                      onClick={() => handleDelete(estate._id)}
                    />
                    <Link to={`/edit/${estate._id}`}>
                      <img
                        className="edit"
                        src="./img/others/edit.png"
                        alt="edit"
                      />
                    </Link>
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
