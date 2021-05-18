import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./NavMenuStyles.module.css";
import { connect } from "react-redux";
import { logout } from "../../helpers/auth";
import { Link } from "react-router-dom";

function NavMenu({ isAuthentic }) {
  return (
    <Navbar bg="dark" variant="dark" style={{ position: "-webkit-sticky" }}>
      <NavLink className={style.home} to="/home" exact>
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
          <Link
            className={style.navStyle2}
            onClick={() => logout()}
            to="/login"
          >
            Log out
          </Link>
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
