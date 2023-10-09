import { FC, useEffect, useState } from "react";
import { baseUrl } from "../config";
import { useNavigate, useParams } from "react-router-dom";
import StarSelect from "../components/Select/StarSelect";

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
  let [rating, setRating] = useState<number>(0); // Keep this at 0, for the condition at StarSelect element
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

  const handleChange = (value: number) => {
    setRating(value);
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
        {rating != 0 && ( // Make sure the rating is assigned before passing it as a prop to StarSelect
          <StarSelect
            id="ratingStar"
            placeholder="Select Rating"
            change={handleChange}
            rating={rating}
            addOrEdit="edit"
          />
        )}
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
