import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "./bootstrap-override.scss";
import "bootstrap/dist/js/bootstrap";
import "./i18n";
import {Provider} from "react-redux";
import configureStore from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore();

root.render(
    // <React.StrictMode>
       <Provider store={store}>
           <App/>
       </Provider>
    // </React.StrictMode>
);
