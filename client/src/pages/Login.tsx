import { FC, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { baseUrl } from "../config";
import { useNavigate } from "react-router-dom";
import "./styles/styles.scss";

const Login: FC = () => {
  // Create navigate function
  const navigate = useNavigate();

  // UseContext Hook, to get authentication functions from App.tsx
  const { email, setEmail, password, setPassword, setLoggedIn } =
    useContext(AuthContext);

  // Fetch user and check if present in db
  const handleLogin = async () => {
    let results = await fetch(`${baseUrl}/users/${email}/${password}`).then(
      (resp) => resp.json()
    );
    return results;
  };

  // Login Function
  const login = async () => {
    if (email != "" && password != "") {
      try {
        const user: {
          id: number;
          date: string;
          email: string;
          password: string;
        } = await handleLogin();
        setLoggedIn(true);
        setEmail(user.email);
        setPassword(user.password);
        navigate("/home");
      } catch (error) {
        setLoggedIn(false);
        setEmail("");
        setPassword("");
        alert("Account not found! Please try again!");
      }
    } else {
      alert("Please fill out the email and password fields!");
    }
  };

  return (
    <>
      <div className="container">
        <form className="form">
          <div className="label">Welcome</div>
          <table className="table">
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
                    id="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <button
                    className="button button__login"
                    type="button"
                    onClick={login}
                  >
                    Log In
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

export default Login;
