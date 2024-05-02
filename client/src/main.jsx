import './styles/reset.css'
import './styles/style.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import { removeAuthData } from './services/auth';

import Login from './routes/auth/login';
import Profile from './routes/auth/profile';
import Register from './routes/auth/register';

import ArtworkGenerator from './routes/artworkGenerator';
import ArtworkEdit from './routes/artworkEdit';
import ArtworkDetail from './routes/artworkDetail';
import Artworks from './routes/artworks';
import CollectionCreate from './routes/collectionCreate';
import CollectionEdit from './routes/collectionEdit';
import CollectionDetail from './routes/collectionDetail';
import Collections from './routes/collections';
import ErrorPage from './routes/error-page';
import Root from './routes/root';
import User from './routes/user';

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: Root.loader,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Artworks />,
            loader: Artworks.loader,
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
            path: "/collections",
            element: <Collections />,
            loader: Collections.loader,
          },
          {
            path: "/collection/detail/:id",
            element: <CollectionDetail />,
            loader: CollectionDetail.loader,
          },
          {
            path: "/collection/create",
            element: <CollectionCreate />,
            loader: CollectionCreate.loader,
            action: CollectionCreate.action,
          },
          {
            path: "/collection/Edit/:id",
            element: <CollectionEdit />,
            loader: CollectionEdit.loader,
            action: CollectionEdit.action,
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
          {
            path: "/profile/:id",
            element: <Profile />,
            loader: Profile.loader,
          },
          {
            path: "/user/:id",
            element: <User />,
            loader: User.loader,
          },
          {
            path: "/logout",
            action: () => {
              removeAuthData();
              return redirect(`/`)
            }
          }
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
