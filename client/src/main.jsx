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
    path: `${import.meta.env.BASE_URL}/`,
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
            path: `${import.meta.env.BASE_URL}/artwork/generate`,
            element: <ArtworkGenerator />,
            loader: ArtworkGenerator.loader,
            action: ArtworkGenerator.action,
          },
          {
            path: `${import.meta.env.BASE_URL}/artwork/detail/:id`,
            element: <ArtworkDetail />,
            loader: ArtworkDetail.loader,
          },
          {
            path: `${import.meta.env.BASE_URL}/artwork/edit/:id`,
            element: <ArtworkEdit />,
            action: ArtworkEdit.action,
            loader: ArtworkEdit.loader,
          },
          {
            path: `${import.meta.env.BASE_URL}/collections`,
            element: <Collections />,
            loader: Collections.loader,
          },
          {
            path: `${import.meta.env.BASE_URL}/collection/detail/:id`,
            element: <CollectionDetail />,
            loader: CollectionDetail.loader,
          },
          {
            path: `${import.meta.env.BASE_URL}/collection/create`,
            element: <CollectionCreate />,
            loader: CollectionCreate.loader,
            action: CollectionCreate.action,
          },
          {
            path: `${import.meta.env.BASE_URL}/collection/Edit/:id`,
            element: <CollectionEdit />,
            loader: CollectionEdit.loader,
            action: CollectionEdit.action,
          },
          {
            path: `${import.meta.env.BASE_URL}/login`,
            element: <Login />,
            action: Login.action,
          },
          {
            path: `${import.meta.env.BASE_URL}/register`,
            element: <Register />,
            action: Register.action,
          },
          {
            path: `${import.meta.env.BASE_URL}/profile/:id`,
            element: <Profile />,
            loader: Profile.loader,
          },
          {
            path: `${import.meta.env.BASE_URL}/user/:id`,
            element: <User />,
            loader: User.loader,
          },
          {
            path: `${import.meta.env.BASE_URL}/logout`,
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
