import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import './assets/css/responsive.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './assets/fonts/Poppins/Poppins-Bold.ttf';
import './assets/fonts/Poppins/Poppins-Regular.ttf';
import './assets/fonts/Poppins/Poppins-SemiBold.ttf';
import './assets/fonts/Poppins/Poppins-Light.ttf';

import GoLive from './views/go-live';
import ViewLive from './views/view-live';

const router = createBrowserRouter([

    {
      path: "/",
      element: <GoLive />,
    },
    {
       path: "/view-live",
       element: <ViewLive />
    }
    
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  
  <RouterProvider router={router} />

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
