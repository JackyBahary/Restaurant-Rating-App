import { FC, useEffect, useState } from "react";
import { baseUrl } from "../config";
import { useParams, useNavigate, Link } from "react-router-dom";

const View: FC = () => {
  let params = useParams();
  let navigate = useNavigate();

  //useState Hooks
  let [restaurant, setRestaurant] = useState<{
    id: number;
    date: string;
    name: string;
    rating: number;
    cost: string;
  }>({ id: 0, date: "", name: "n/a", rating: 0, cost: "n/a" });

  //useEffect Hooks
  useEffect(() => {
    loadRestaurant();
  }, []);

  // Fetch a restaurant
  const loadRestaurant = async () => {
    let results = await fetch(
      `${baseUrl}/restaurants/restaurant/${params.id}`
    ).then((resp) => resp.json());
    setRestaurant(results);
  };

  // Delete a restaurant
  const handleDelete = async () => {
    await fetch(`${baseUrl}/restaurants/${params.id}`, {
      method: "DELETE",
    });
    return navigate("/home");
  };

  // Go back to home page
  const handleBack = () => {
    navigate("/home");
  };

  return (
    <>
      <div className="container container__table">
        <h2>Restaurant List</h2>
        <table className="table table__view">
          <tbody>
            <tr>
              <th>Date Added</th>
              <th>Restaurant Name</th>
              <th>Rating</th>
              <th>Cost</th>
            </tr>
            <tr>
              <td>{restaurant.date}</td>
              <td>{restaurant.name}</td>
              <td>{restaurant.rating}</td>
              <td>{restaurant.cost}</td>
            </tr>
          </tbody>
        </table>
        <div className="container container__button">
          <button type="button">
            <Link to={`/edit/${params.id}`}>Edit</Link>
          </button>
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
          <button type="button" onClick={handleBack}>
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default View;
