import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./NavMenuStyles.module.css";
import { connect } from "react-redux";

function NavMenu({ isAuthentic }) {
  return (
    <Navbar bg="dark" variant="dark" style={{ position: "-webkit-sticky" }}>
      <NavLink className={style.home} to="/">
        ToDo List
      </NavLink>

      <Nav className="mr-auto">
        {isAuthentic && (
          <NavLink
            activeClassName={style.active}
            className={style.navStyle}
            to="/"
            exact
          >
            Home
          </NavLink>
        )}

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

        {isAuthentic ? (
          <Button>Log out</Button>
        ) : (
          <>
            {" "}
            <NavLink
              className={style.navStyle}
              activeClassName={style.active}
              to="/Register"
              exact
            >
              Register
            </NavLink>
            <NavLink
              className={style.navStyle}
              activeClassName={style.active}
              to="/Login"
              exact
            >
              Login
            </NavLink>
          </>
        )}
      </Nav>
    </Navbar>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthentic: state.isAuthentic,
  };
};

export default connect(mapStateToProps, null)(NavMenu);
