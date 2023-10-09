import { FC, useEffect, useState } from "react";
import { baseUrl } from "../config";
import { useNavigate, useParams } from "react-router-dom";

const Edit: FC = () => {
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
  let [restaurantLoaded, setRestaurantLoaded] = useState<boolean>(false);
  let [restaurantName, setRestaurantName] = useState<string>("");
  let [rating, setRating] = useState<number>(1);
  let [cost, setCost] = useState<string>("$");

  //useEffect Hooks
  useEffect(() => {
    loadRestaurant();
  }, []);

  useEffect(() => {
    if (restaurantLoaded) {
      setRestaurantName(restaurant.name);
      setRating(restaurant.rating);
      setCost(restaurant.cost);
    }
  }, [restaurantLoaded]);

  // Fetch a restaurant
  const loadRestaurant = async () => {
    let results = await fetch(`${baseUrl}/restaurants/${params.id}`).then(
      (resp) => resp.json()
    );
    setRestaurant(results);
    setRestaurantLoaded(true);
  };

  // Update a restaurant
  const handleUpdate = async () => {
    await fetch(`${baseUrl}/restaurants/restaurants/${params.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: restaurantName,
        rating,
        cost,
      }),
    })
      .then((resp) => resp.json())
      .catch((err) => console.log(err));
    navigate(`/view/${params.id}`);
  };

  return (
    <>
      <form>
        <label htmlFor="rname">Restaurant name: </label>
        <input
          type="text"
          id="rname"
          name="rname"
          onChange={(e) => setRestaurantName(e.target.value)}
          value={restaurantName}
        />
        <br />
        <label htmlFor="rating">Rating: </label>
        <select
          id="rating"
          name="rating"
          onChange={(e) => setRating(parseInt(e.target.value))}
          value={rating}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <br />
        <label htmlFor="cost">Cost: </label>
        <select
          id="cost"
          name="cost"
          onChange={(e) => setCost(e.target.value)}
          value={cost}
        >
          <option value="$">$</option>
          <option value="$$">$$</option>
          <option value="$$$">$$$</option>
          <option value="$$$$">$$$$</option>
          <option value="$$$$$">$$$$$</option>
        </select>
        <br />
        <button type="button" onClick={handleUpdate}>
          Submit
        </button>
      </form>
    </>
  );
};

export default Edit;
