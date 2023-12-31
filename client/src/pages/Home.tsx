import { FC, useContext, useEffect, useState } from "react";
import { baseUrl } from "../config";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import StarCell from "../components/StarCell";
import view from "../assets/view.png";
import add from "../assets/add.png";

const Home: FC = () => {
  //useState Hooks
  let [restaurants, setRestaurants] = useState<
    { id: number; date: string; name: string; rating: number; cost: string }[]
  >([]);
  let [noRestaurant, setNoRestaurant] = useState<boolean>(false);
  let [restaurantID, setRestaurantID] = useState<number>(0);

  // UseContext Hook, to get authentication functions from App.tsx
  const { email } = useContext(AuthContext);

  //useEffect Hooks
  useEffect(() => {
    loadRestaurants();
  }, []);

  // Fetch restaurants
  const loadRestaurants = async () => {
    let results = await fetch(`${baseUrl}/restaurants/${email}`).then((resp) =>
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
      <div className="container container__table">
        <h2>Restaurant List</h2>
        <table className="table table__home">
          <tbody>
            <tr>
              <th>Actions</th>
              <th>Date</th>
              <th>Restaurant Name</th>
              <th>Rating</th>
              <th>Cost</th>
            </tr>
            <tr>{noRestaurant && <td colSpan={5}>No Restaurants</td>}</tr>
            {restaurants.map(function (data, i) {
              let idx = i;
              return (
                <tr key={idx}>
                  <td>
                    <input
                      type="checkbox"
                      checked={data.id === restaurantID}
                      onChange={() => {
                        setRestaurantID(data.id);
                      }}
                    ></input>
                  </td>
                  <td>{data.date}</td>
                  <td>{data.name}</td>
                  <td>{<StarCell rating={data.rating} />}</td>
                  <td>{data.cost}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="container container__button">
          <Link to={`/view/${restaurantID}`}>
            <img src={view} title="View"></img>
          </Link>
          <Link to="/add">
            <img src={add} title="Add"></img>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
