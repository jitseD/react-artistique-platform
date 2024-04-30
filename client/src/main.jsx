import './Reset.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ArtworkGenerator from './routes/artworkGenerator';
import ArtworkEdit from './routes/artworkEdit';
import ArtworkDetail from './routes/artworkDetail';
import Index from './routes/index';
import Login from './routes/auth/login';
import Root from './routes/root';
import Register from './routes/auth/register';


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
        element: <ArtworkGenerator />,
        loader: ArtworkGenerator.loader,
        action: ArtworkGenerator.action,
      },
      {
        path: "/artwork/detail/:id",
        element: <ArtworkDetail />,
        loader: ArtworkDetail.loader,
      },
      {
        path: "/artwork/edit/:id",
        element: <ArtworkEdit />,
        action: ArtworkEdit.action,
        loader: ArtworkEdit.loader,
      },
      {
        path: "/login",
        element: <Login />,
        action: Login.action,
      },
      {
        path: "/register",
        element: <Register />,
        action: Register.action,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
