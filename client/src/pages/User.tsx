import { FC, useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { baseUrl } from "../config";
import { useNavigate } from "react-router-dom";
import edit from "../assets/edit.png";
import show from "../assets/show.png";
import check from "../assets/check.png";
import deleteIcon from "../assets/delete.png";
import back from "../assets/back.png";

const User: FC = () => {
  const navigate = useNavigate();
  // UseContext Hook, to get authentication functions from App.tsx
  const { email, setEmail, password, setPassword, setLoggedIn } =
    useContext(AuthContext);

  // UseState hooks to store user information
  const [userID, setUserID] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [fname, setFName] = useState<string>("");
  const [lname, setLName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [hiddenPwd, setHiddenPwd] = useState<string>("*********");
  const [view, setView] = useState<boolean>(true);

  // UseState hooks for new user information
  const [newfname, setNewFName] = useState<string>("");
  const [newlname, setNewLName] = useState<string>("");
  const [newPwd, setNewPwd] = useState<string>("");
  const [newbirthDate, setNewBirthDate] = useState<string>("");
  const [newphone, setNewPhone] = useState<string>("");

  useEffect(() => {
    findUser(); // On page load, fetch user details
  }, []);

  // Find user function
  const findUser = async () => {
    try {
      const user: {
        // destructuring has to be same with database fields
        id: number;
        date: string;
        fname: string;
        lname: string;
        birthDate: string;
        phone: string;
      } = await handleUser();
      setUserID(user.id);
      setDate(user.date);
      setFName(user.fname);
      setLName(user.lname);
      setBirthDate(user.birthDate);
      setPhone(user.phone);
    } catch (error) {
      alert("Account ERROR!");
    }
  };

  // Fetch user and check if present in db
  const handleUser = async () => {
    let results = await fetch(`${baseUrl}/users/${email}/${password}`).then(
      (resp) => resp.json()
    );
    return results;
  };

  // Update user
  const handleUpdate = async () => {
    await fetch(`${baseUrl}/users/${userID}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        newfname,
        newlname,
        newPwd,
        newbirthDate,
        newphone,
      }),
    })
      .then((resp) => {
        resp.json();
        setPassword(newPwd); // Set global password to be the new password
        if (password == newPwd) {
          // Make sure the global password is already set to the new password before fetching user
          findUser(); // Re-fetch user details for view user page after updating
        }
      })
      .catch((err) => console.log(err));
  };

  // Delete a user
  const handleDelete = async () => {
    await fetch(`${baseUrl}/users/${userID}`, {
      method: "DELETE",
    });
    await fetch(`${baseUrl}/restaurants/restaurants/${email}`, {
      method: "DELETE",
    });
    setEmail("");
    setPassword("");
    setLoggedIn(false);
    return navigate("/");
  };

  return (
    <>
      {view && (
        <div className="container container__user">
          <h2>Welcome!</h2>
          <p>Date Created: {date}</p>
          <p>First Name: {fname}</p>
          <p>Last Name: {lname}</p>
          <p>Email: {email}</p>
          <div className="container__button container__button--user">
            Password: {hiddenPwd} &nbsp;
            <img
              src={show}
              title="Show"
              onClick={() => {
                if (hiddenPwd != "*********") {
                  setHiddenPwd("*********");
                } else {
                  setHiddenPwd(password);
                }
              }}
            ></img>
          </div>
          <p>Birth Date: {birthDate}</p>
          <p>Phone Number: {phone}</p>
          <div className="container__button">
            <img
              src={edit}
              title="Edit"
              onClick={() => {
                setView(false);
                setHiddenPwd("*********");
                setNewFName(fname); // Update the edit fields with the current user info
                setNewLName(lname);
                setNewPwd(password);
                setNewBirthDate(birthDate);
                setNewPhone(phone);
              }}
            ></img>
          </div>
        </div>
      )}
      {!view && (
        <div className="container container__user">
          <h2>Welcome!</h2>
          <p>Date Created: {date}</p>
          <p>
            First Name: &nbsp;
            <input
              value={newfname}
              onChange={(e) => setNewFName(e.target.value)}
            />
          </p>
          <p>
            Last Name: &nbsp;
            <input
              value={newlname}
              onChange={(e) => setNewLName(e.target.value)}
            />
          </p>
          <p>Email: {email}</p>
          <p>
            Password: &nbsp;
            <input value={newPwd} onChange={(e) => setNewPwd(e.target.value)} />
          </p>
          <p>
            Birth Date: &nbsp;
            <input
              type="date"
              value={newbirthDate}
              onChange={(e) => setNewBirthDate(e.target.value)}
            />
          </p>
          <p>
            Phone Number: &nbsp;
            <input
              value={newphone}
              onChange={(e) => setNewPhone(e.target.value)}
            />
          </p>
          <div className="container__button">
            <img
              src={check}
              title="Confirm"
              onClick={() => {
                handleUpdate();
                setView(true);
              }}
            ></img>
            <img src={deleteIcon} title="Delete" onClick={handleDelete}></img>
            <img
              src={back}
              title="Back"
              onClick={() => {
                setView(true);
              }}
            ></img>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
