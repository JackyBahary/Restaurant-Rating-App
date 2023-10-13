import { FC, useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { baseUrl } from "../config";
import { useNavigate } from "react-router-dom";

const Register: FC = () => {
  // Create navigate function
  const navigate = useNavigate();

  // UseContext Hook, to get authentication functions from App.tsx
  const {
    email,
    setEmail,
    password,
    setPassword,
    fname,
    setFName,
    setLoggedIn,
  } = useContext(AuthContext);

  //useState Hooks
  let [userID, setUserID] = useState<number>(0);
  let [date, setDate] = useState<string>("");
  let [initialPassword, setInitialPassword] = useState<string>("");
  let [lname, setLName] = useState<string>("");
  let [birthDate, setBirthDate] = useState<string>("");
  let [phone, setPhone] = useState<string>("");

  // useEffect Hooks
  useEffect(() => {
    setUserID(Date.now);
    setDate(formatDate());
  }, []);

  // Add User to DB and catch error if duplicate user found
  const handleRegister = async () => {
    if (initialPassword == password) {
      if (email != "" && password != "") {
        await fetch(`${baseUrl}/users/${email}`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            id: userID,
            date,
            email,
            password,
            fname,
            lname,
            birthDate,
            phone,
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
            setFName(fname);
            setLoggedIn(true);
            navigate("/home");
          }
        });
      } else {
        alert("Please fill out the email and password fields!");
      }
    } else {
      alert("Please re-type your password correctly!");
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
      <div className="container">
        <form className="form">
          <div className="label">Sign Up</div>
          <table className="table table__register">
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="password"
                    id="initialPassword"
                    name="initialPassword"
                    value={initialPassword}
                    placeholder="Password"
                    onChange={(e) => setInitialPassword(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    placeholder="Re-enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="label">Account Details</div>
          <table className="table">
            <tbody>
              <tr>
                <td>
                  First Name: &nbsp; &nbsp;
                  <input
                    type="text"
                    id="fname"
                    name="fname"
                    value={fname}
                    onChange={(e) => setFName(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  Last Name: &nbsp; &nbsp;
                  <input
                    type="text"
                    id="lname"
                    name="lname"
                    value={lname}
                    onChange={(e) => setLName(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  Birth Date: &nbsp; &nbsp;
                  <input
                    type="date"
                    id="bdate"
                    name="bdate"
                    value={birthDate}
                    placeholder="Birth Date"
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  Phone Number: &nbsp; &nbsp;
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <button
                    className="button button__register"
                    type="button"
                    onClick={handleRegister}
                  >
                    Register
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </>
  );
};

export default Register;
