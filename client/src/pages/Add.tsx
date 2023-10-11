import { FC, useContext, useEffect, useState } from "react";
import { baseUrl } from "../config";
import StarSelect from "../components/Select/StarSelect";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Add: FC = () => {
  // Create navigate function
  const navigate = useNavigate();

  //useState Hooks
  let [restaurantID, setRestaurantID] = useState<number>(0);
  let [date, setDate] = useState<string>();
  let [restaurantName, setRestaurantName] = useState<string>("");
  let [rating, setRating] = useState<number>(0.5);
  let [cost, setCost] = useState<string>("$");

  // useEffect Hooks
  useEffect(() => {
    setRestaurantID(Date.now);
    setDate(formatDate());
  }, []);

  // UseContext Hook, to get authentication functions from App.tsx
  const { email } = useContext(AuthContext);

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
        email: email,
      }),
    })
      .then((resp) => resp.json())
      .catch((err) => console.log(err));
    setRestaurantID(0);
    setRestaurantName("");
    setRating(0.5);
    setCost("$");
    navigate("/home");
  };

  const handleChange = (value: number) => {
    setRating(value);
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
        <StarSelect
          id="ratingStar"
          placeholder="Select Rating"
          change={handleChange}
          addOrEdit="add"
        />
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
