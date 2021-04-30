import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./NavMenuStyles.module.css";
export default function NavMenu() {
  return (
    <Navbar bg="dark" variant="dark">
      <NavLink className={style.home} to="/">
        ToDo List
      </NavLink>
      <Nav className="mr-auto">
        <NavLink
          activeClassName={style.active}
          className={style.navStyle}
          to="/"
          exact
        >
          Home
        </NavLink>
        <NavLink
          className={style.navStyle}
          activeClassName={style.active}
          to="/About"
          exact
        >
          About
        </NavLink>
        <NavLink
          className={style.navStyle}
          activeClassName={style.active}
          to="/Contacts"
          exact
        >
          Contacts
        </NavLink>
      </Nav>
    </Navbar>
  );
}
