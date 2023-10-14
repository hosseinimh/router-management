import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import store from "../state/store";
import { AppRoutes } from "./navigation";

function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}

export default App;

if (document.getElementById("root")) {
  createRoot(document.getElementById("root")).render(<App />);
}
