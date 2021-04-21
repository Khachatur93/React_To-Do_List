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
        <NavLink activeClassName={style.navStyle} to="/">
          Home
        </NavLink>
        <NavLink className={style.navStyle} to="/About">
          About
        </NavLink>
        <NavLink className={style.navStyle} to="/Contacts">
          Contacts
        </NavLink>
      </Nav>
    </Navbar>
  );
}
