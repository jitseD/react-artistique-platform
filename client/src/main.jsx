import './Reset.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from './routes/root';
import Generator from './routes/generator.jsx';
import Save from './routes/save';
import Index from './routes/index';
import Login from './routes/login';


const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <Root />,
    loader: Root.loader,
    children: [
      {
        index: true,
        element: <Index />,
        loader: Index.loader,
      },
      {
        path: "/artwork/generate",
        element: <Generator />
      },
      {
        path: "/artwork/save",
        element: <Save />
      },
      {
        path: "/login",
        element: <Login />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
