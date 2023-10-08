import { FC, useEffect, useState } from "react";
import { baseUrl } from "../config";

const Home: FC = () => {
  //useState Hooks
  let [restaurants, setRestaurants] = useState<
    { _id: number; name: string; rating: number }[]
  >([]);
  let [restaurantName, setRestaurantName] = useState<string>("");
  let [rating, setRating] = useState<number>(1);

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

  // Add new restaurant
  const handleSubmit = async () => {
    console.log(rating);
    await fetch(`${baseUrl}/restaurants`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: restaurantName,
        rating,
      }),
    })
      .then((resp) => resp.json())
      .catch((err) => console.log(err));
    setRestaurantName("");
    setRating(1);
    window.location.reload();
  };

  return (
    <>
      <h1>This is your lists of restaurants</h1>
      {restaurants.map(function (data, i) {
        let idx = i;
        return (
          <div key={idx}>
            Restaurant Name: {data.name}
            <br />
            Rating: {data.rating}
          </div>
        );
      })}
      <form>
        <label htmlFor="rname">Restaurant name: </label>
        <input
          type="text"
          id="rname"
          name="rname"
          onChange={(e) => setRestaurantName(e.target.value)}
        />
        <br />
        <label htmlFor="rating">Rating: </label>
        <select
          id="rating"
          name="rating"
          onChange={(e) => setRating(parseInt(e.target.value))}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <br />
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </>
  );
};

export default Home;
