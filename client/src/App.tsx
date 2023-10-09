import "./App.scss";

import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Update from "./pages/Update";
import Delete from "./pages/Delete";

const App: FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="add" element={<Add />} />
            <Route path="update" element={<Update />} />
            <Route path="delete/:id" element={<Delete />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
