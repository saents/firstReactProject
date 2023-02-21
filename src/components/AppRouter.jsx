import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../context";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import { publicRoutes, privateRoutes } from "../routes";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
  const {isAuth, isLoading} = useContext(AuthContext);
  console.log(isAuth);

  if(isLoading) {
    return <Loader />
  }

  return isAuth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route
          key={route.path}
          element={route.element}
          path={route.path}
          exact={route.exact}
        />
      ))}

      <Route
        path='/notFound'
        element={<NotFound />}
      />

      <Route
        path='*'
        element={<Navigate to='/posts' />}
      />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route
          key={route.path}
          element={route.element}
          path={route.path}
          exact={route.exact}
        />
      ))}

      <Route
        path='/login'
        element={<Login />}
      />

      <Route
        path='*'
        element={<Navigate to='/login' />}
      />
    </Routes>
  );
};

export default AppRouter;
