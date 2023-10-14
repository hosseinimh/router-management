import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import { BASE_PATH } from "../../constants";
import * as Pages from "../Pages";

const renderRoutes = () => (
  <>
    <Route path={`${BASE_PATH}`} element={<Pages.Dashboard />} />
    <Route path="*" element={<Navigate to={BASE_PATH} />} />
  </>
);

function AppRoutes() {
  return (
    <Router>
      <Routes>{renderRoutes()}</Routes>
    </Router>
  );
}

export default AppRoutes;
