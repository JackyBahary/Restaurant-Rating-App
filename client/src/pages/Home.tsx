import { FC, useEffect, useState } from "react";
import { baseUrl } from "../config";
import { Link } from "react-router-dom";

const Home: FC = () => {
  //useState Hooks
  let [restaurants, setRestaurants] = useState<
    { _id: number; name: string; rating: number; cost: string }[]
  >([]);

  //useEffect Hooks
  useEffect(() => {
    loadRestaurants();
  }, []);

  // Fetch restaurants
  const loadRestaurants = async () => {
    let results = await fetch(`${baseUrl}/restaurants`).then((resp) =>
      resp.json()
    );
    setRestaurants(results);
  };

  return (
    <>
      <h1>Restaurant List</h1>
      <table>
        <tr>
          <th>Restaurant Name</th>
          <th>Rating</th>
          <th>Cost</th>
        </tr>
        {restaurants.map(function (data, i) {
          let idx = i;
          return (
            <tr key={idx}>
              <td>{data.name}</td>
              <td>{data.rating}</td>
              <td>{data.cost}</td>
            </tr>
          );
        })}
      </table>
      <button>
        <Link to="/add">Add New Restaurant</Link>
      </button>
    </>
  );
};

export default Home;
