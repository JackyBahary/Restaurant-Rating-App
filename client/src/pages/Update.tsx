import { FC, useState } from "react";
import { baseUrl } from "../config";

const Update: FC = () => {
  //useState Hooks
  let [restaurantName, setRestaurantName] = useState<string>("");
  let [rating, setRating] = useState<number>(1);
  let [cost, setCost] = useState<string>("");

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
        cost,
      }),
    })
      .then((resp) => resp.json())
      .catch((err) => console.log(err));
    setRestaurantName("");
    setRating(1);
    setCost("$");
    window.location.reload();
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
        <label htmlFor="cost">Cost: </label>
        <select id="cost" name="cost" onChange={(e) => setCost(e.target.value)}>
          <option value="$">$</option>
          <option value="$$">$$</option>
          <option value="$$$">$$$</option>
          <option value="$$$$">$$$$</option>
          <option value="$$$$$">$$$$$</option>
        </select>
        <br />
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </>
  );
};

export default Update;
