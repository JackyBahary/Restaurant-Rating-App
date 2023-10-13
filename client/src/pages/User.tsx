import { FC, useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { baseUrl } from "../config";
import { useNavigate } from "react-router-dom";

const User: FC = () => {
  const navigate = useNavigate();
  // UseContext Hook, to get authentication functions from App.tsx
  const { email, password, setPassword } = useContext(AuthContext);

  // UseState hooks to store user information
  const [userID, setUserID] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [fname, setFName] = useState<string>("");
  const [lname, setLName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [hiddenPwd, setHiddenPwd] = useState<string>("*********");
  const [view, setView] = useState<boolean>(true);

  useEffect(() => {
    findUser();
  }, []);

  // Find user function
  const findUser = async () => {
    try {
      const user: {
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
        date,
        email,
        password,
        fname,
        lname,
        birthDate,
        phone,
      }),
    })
      .then((resp) => {
        resp.json();
      })
      .catch((err) => console.log(err));
  };

  // Delete a user
  const handleDelete = async () => {
    await fetch(`${baseUrl}/users/${userID}`, {
      method: "DELETE",
    });
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
          <p>
            Password: {hiddenPwd}
            <button
              onClick={() => {
                if (hiddenPwd != "*********") {
                  setHiddenPwd("*********");
                } else {
                  setHiddenPwd(password);
                }
              }}
            >
              Show
            </button>
          </p>
          <p>Birth Date: {birthDate}</p>
          <p>Phone Number: {phone}</p>
          <div>
            <button
              onClick={() => {
                setView(false);
                setHiddenPwd("*********");
              }}
            >
              Edit
            </button>
          </div>
        </div>
      )}
      {!view && (
        <div className="container container__user">
          <h2>Welcome!</h2>
          <p>Date Created: {date}</p>
          <p>
            First Name: &nbsp;
            <input value={fname} onChange={(e) => setFName(e.target.value)} />
          </p>
          <p>
            Last Name: &nbsp;
            <input value={lname} onChange={(e) => setLName(e.target.value)} />
          </p>
          <p>Email: {email}</p>
          <p>
            Password: &nbsp;
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </p>
          <p>
            Birth Date: &nbsp;
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </p>
          <p>
            Phone Number: &nbsp;
            <input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </p>
          <div>
            <button
              onClick={() => {
                handleUpdate();
                setView(true);
              }}
            >
              Update
            </button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
