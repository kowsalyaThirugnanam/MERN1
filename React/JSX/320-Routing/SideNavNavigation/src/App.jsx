import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../src/components/Home/Home";
import Layout from './components/LayoutPage/Layout';
import NoPage from './components/NoPage/NoPage';
import NavBar from './components/NavBar/NavBar';

const router = createBrowserRouter([
  {
    path: "/", element: <NavBar />, errorElement: <NoPage />, children: [
      { path: "home", element: <Home /> },
      { path: "layout", element: <Layout /> }
    ]
  },

], {
  future: {
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true,
    v7_startTransition: true,
  }
})

const App = () => {
  return (
    <>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </>
  )
}

export default App;
