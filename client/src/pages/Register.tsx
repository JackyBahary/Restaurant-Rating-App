import { FC, useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { baseUrl } from "../config";
import { useNavigate } from "react-router-dom";

const Register: FC = () => {
  // Create navigate function
  const navigate = useNavigate();

  // UseContext Hook, to get authentication functions from App.tsx
  const { email, setEmail, password, setPassword, setLoggedIn } =
    useContext(AuthContext);

  //useState Hooks
  let [userID, setUserID] = useState<number>(0);
  let [date, setDate] = useState<string>();

  // useEffect Hooks
  useEffect(() => {
    setUserID(Date.now);
    setDate(formatDate());
  }, []);

  // Add User to DB and catch error if duplicate user found
  const handleRegister = async () => {
    if (email != "" && password != "") {
      await fetch(`${baseUrl}/users/${email}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id: userID,
          date: date,
          email: email,
          password: password,
        }),
      }).then((resp) => {
        if (resp.status == 400) {
          alert("Email is already used! Please use a different Email!");
        } else {
          resp.json();
          setUserID(0);
          setDate("");
          setEmail(email);
          setPassword(password);
          setLoggedIn(true);
          navigate("/home");
        }
      });
    } else {
      alert("Please fill out the email and password fields!");
    }
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
      <div>
        Email is {email} <br />
        Password is {password} <br />
      </div>
      <form>
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </>
  );
};

export default Register;
