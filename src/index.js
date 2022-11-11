import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GraphScreen from "./routes/GraphScreen";
import TableScreen from "./routes/TableScreen";
import MapScreen from "./routes/MapScreen";
import HomeScreen from "./routes/HomeScreen";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/data-webapp" element={<App />}>
        <Route index element={<HomeScreen />} />
        <Route path="/data-webapp/graph" element={<GraphScreen />} />
        <Route path="/data-webapp/table" element={<TableScreen />} />
        <Route path="/data-webapp/map" element={<MapScreen />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
