import { FC, useEffect, useState } from "react";
import { baseUrl } from "../config";
import { useParams, useNavigate } from "react-router-dom";

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

  // Fetch restaurant
  const loadRestaurant = async () => {
    let results = await fetch(`${baseUrl}/restaurants/${params.id}`).then(
      (resp) => resp.json()
    );
    setRestaurant(results);
  };

  // Delete restaurant
  const handleDelete = async () => {
    await fetch(`${baseUrl}/restaurants/${params.id}`, {
      method: "DELETE",
    });
    return navigate("/");
  };

  return (
    <>
      <h1>Restaurant List</h1>
      <table>
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
          <tr>
            <td>
              <button type="button" onClick={handleDelete}>
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default View;
