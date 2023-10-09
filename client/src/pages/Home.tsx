import { FC, useEffect, useState } from "react";
import { baseUrl } from "../config";
import { Link } from "react-router-dom";

const Home: FC = () => {
  //useState Hooks
  let [restaurants, setRestaurants] = useState<
    { id: number; date: string; name: string; rating: number; cost: string }[]
  >([]);
  let [noRestaurant, setNoRestaurant] = useState<boolean>(false);

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
    if (results.length == 0) {
      setNoRestaurant(true);
    } else {
      setNoRestaurant(false);
    }
  };

  return (
    <>
      <h1>Restaurant List</h1>
      <table>
        <tbody>
          <tr>
            <th>Date</th>
            <th>Restaurant Name</th>
            <th>Rating</th>
            <th>Cost</th>
          </tr>
          <tr>{noRestaurant && <td>No Restaurants</td>}</tr>
          {restaurants.map(function (data, i) {
            let idx = i;
            return (
              <tr key={idx}>
                <td>{data.date}</td>
                <td>{data.name}</td>
                <td>{data.rating}</td>
                <td>{data.cost}</td>
                <td>
                  <button>
                    <Link to={`/view/${data.id}`}>View</Link>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button>
        <Link to="/add">Add New Restaurant</Link>
      </button>
    </>
  );
};

export default Home;
