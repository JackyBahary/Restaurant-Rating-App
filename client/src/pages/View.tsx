import { FC, useEffect, useState } from "react";
import { baseUrl } from "../config";
import { useParams, Link } from "react-router-dom";
import StarCell from "../components/StarCell";
import edit from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";
import back from "../assets/back.png";

const View: FC = () => {
  let params = useParams();

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
              <td>{<StarCell rating={restaurant.rating} />}</td>
              <td>{restaurant.cost}</td>
            </tr>
          </tbody>
        </table>
        <div className="container container__button">
          <Link to={`/edit/${params.id}`}>
            <img src={edit} title="Edit"></img>
          </Link>
          <Link to="/home">
            <img src={deleteIcon} title="Delete" onClick={handleDelete}></img>
          </Link>
          <Link to="/home">
            <img src={back} title="Back"></img>
          </Link>
        </div>
      </div>
    </>
  );
};

export default View;
