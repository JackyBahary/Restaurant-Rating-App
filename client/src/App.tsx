import "./App.scss";

import { FC, useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Add from "./pages/Add";
import View from "./pages/View";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import { AuthContext } from "./contexts/AuthContext";
import Register from "./pages/Register";
import User from "./pages/User";

const App: FC = () => {
  const [email, setEmail] = useState("");
  const [fname, setFName] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const value = useMemo(
    () => ({
      email,
      setEmail,
      password,
      setPassword,
      fname,
      setFName,
      loggedIn,
      setLoggedIn,
    }),
    [
      email,
      setEmail,
      password,
      setPassword,
      fname,
      setFName,
      loggedIn,
      setLoggedIn,
    ]
  ); /* Create an object {email, setEmail, password, setPassword, fname, setFName, loggedIn, setLoggedIn} whenever 
        [email, setEmail, password, setPassword, fname, setFName, loggedIn, setLoggedIn] changes */

  return (
    <>
      <AuthContext.Provider value={value}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="home" element={<Home />} />
              <Route path="add" element={<Add />} />
              <Route path="view/:id" element={<View />} />
              <Route path="edit/:id" element={<Edit />} />
              <Route path="user" element={<User />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
};

export default App;
