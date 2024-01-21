import * as React from 'react';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/Store";
import ReactDOM from "react-dom";
import "antd/dist/reset.css";
import "./style/antd.css";
import "./style/main.css";
import "./style/print.css";
import "./style/responsive.css";
import "./style/extra.css";
import "./style/dragdrop.css"
import "./index.css";
import "tailwindcss/tailwind.css";
const App = React.lazy(() => import("./App"));

const AppContainer = () => {
  return (
    <React.StrictMode>
      <React.Suspense
        fallback={
      "Loading..."
        }
      >
        <Provider store={store}>
          <PersistGate
            loading={
           
              "loading ... "
            }
            persistor={persistor}
          >
            <App />
          </PersistGate>
        </Provider>
      </React.Suspense>
    </React.StrictMode>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<AppContainer />, rootElement);
