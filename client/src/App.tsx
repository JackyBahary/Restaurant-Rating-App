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

const App: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const value = useMemo(
    () => ({ email, setEmail, password, setPassword, loggedIn, setLoggedIn }),
    [email, setEmail, password, setPassword, loggedIn, setLoggedIn]
  ); // Create an object {email, setEmail, password, setPassword} whenever [email, setEmail, password, setPassword] changes

  return (
    <>
      <AuthContext.Provider value={value}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Login />} />
              <Route path="home" element={<Home />} />
              <Route path="add" element={<Add />} />
              <Route path="view/:id" element={<View />} />
              <Route path="edit/:id" element={<Edit />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
};

export default App;
