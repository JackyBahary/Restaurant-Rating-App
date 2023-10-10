import { FC, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { baseUrl } from "../config";

const Login: FC = () => {
  // UseContext Hook, to get authentication functions from App.tsx
  const { email, setEmail, password, setPassword, loggedIn, setLoggedIn } =
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
    try {
      const user: {
        id: number;
        date: string;
        name: string;
        rating: number;
        cost: string;
        account: { email: string; password: string };
      } = await handleLogin();
      setLoggedIn(true);
      setEmail(user.account.email);
      setPassword(user.account.password);
    } catch (error) {
      setLoggedIn(false);
      setEmail("");
      setPassword("");
      alert("Wrong email and password! Try Again!");
    }
  };

  return (
    <>
      <div>
        Email is {email} <br />
        Password is {password} <br />
        User is logged in: {loggedIn && <div>SIGNED IN</div>}
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
        <button type="button" onClick={login}>
          Log In
        </button>
      </form>
    </>
  );
};

export default Login;
