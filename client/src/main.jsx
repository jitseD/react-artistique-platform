import './Reset.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Artwork from './routes/artwork';
import Generator from './routes/generator';
import Index from './routes/index';
import Login from './routes/login';
import Root from './routes/root';
import Save from './routes/save';


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
        element: <Generator />,
      },
      {
        path: "/artwork/:id",
        element: <Artwork />,
        loader: Artwork.loader,
      },
      {
        path: "/artwork/save",
        element: <Save />,
        action: Save.action,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
