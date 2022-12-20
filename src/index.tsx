import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { ConfigProvider } from "antd";
import ru_RU from "antd/lib/locale/ru_RU";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
  <Provider store={store}>
    <ConfigProvider locale={ru_RU}>
       <App />

    </ConfigProvider>

  </Provider>
  </BrowserRouter>
);
