import "./app.scss";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import React from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Estates from "./pages/estates/Estates";
import Estate from "./pages/estate/Estate";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Add from "./pages/add/Add";
import MyEstates from "./pages/myEstates/MyEstates";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "./components/head/Head";
import Edit from "./pages/edit/Edit";

function App() {
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Head />
          <Navbar />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/estates",
          element: <Estates />,
        },
        {
          path: "/myEstates",
          element: <MyEstates />,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/edit/:id",
          element: <Edit />,
        },
        {
          path: "/estate/:id",
          element: <Estate />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
