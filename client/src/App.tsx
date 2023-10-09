import "./App.scss";

import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Add from "./pages/Add";
import View from "./pages/View";
import Edit from "./pages/Edit";

const App: FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="add" element={<Add />} />
            <Route path="view/:id" element={<View />} />
            <Route path="edit/:id" element={<Edit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
