import { Outlet, NavLink, Form, useNavigation } from "react-router-dom"
// import { useEffect } from "react";

import Header from "../components/Header"

export default function Root() {
  const navigation = useNavigation();

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
