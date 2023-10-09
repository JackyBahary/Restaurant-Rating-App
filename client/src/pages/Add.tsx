import { FC, useEffect, useState } from "react";
import { baseUrl } from "../config";

const Add: FC = () => {
  //useState Hooks
  let [restaurantID, setRestaurantID] = useState<number>(0);
  let [date, setDate] = useState<string>();
  let [restaurantName, setRestaurantName] = useState<string>("");
  let [rating, setRating] = useState<number>(1);
  let [cost, setCost] = useState<string>("$");

  useEffect(() => {
    setRestaurantID(Date.now);
    setDate(formatDate());
  });

  // Add new restaurant
  const handleSubmit = async () => {
    await fetch(`${baseUrl}/restaurants`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: restaurantID,
        date: date,
        name: restaurantName,
        rating,
        cost,
      }),
    })
      .then((resp) => resp.json())
      .catch((err) => console.log(err));
    setRestaurantID(0);
    setRestaurantName("");
    setRating(1);
    setCost("$");
    window.location.reload();
  };

  // Format Date
  const formatDate = (): string => {
    let today: Date = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    let hoursString: string = ("0" + hours).slice(-2);
    let minutesString: string = ("0" + minutes).slice(-2);
    let secondsString: string = ("0" + seconds).slice(-2);
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      " " +
      hoursString +
      ":" +
      minutesString +
      ":" +
      secondsString;
    return date;
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

export default Add;
