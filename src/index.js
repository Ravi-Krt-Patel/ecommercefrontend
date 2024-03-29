import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { Store,persistore } from "./redux/Store";
import { BrowserRouter } from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode  >
    
    <Provider store={Store}>
 
      <BrowserRouter>
        <App />
      </BrowserRouter>
      
    </Provider>
    
  </React.StrictMode>
);
