import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";


const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const addPostIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/posts/create"
      >
      <OverlayTrigger placement="bottom"
      overlay={<Tooltip>Add Post</Tooltip>}
      >
      <i className="far fa-plus-square"></i>
      </OverlayTrigger>
    </NavLink>
  );

  const addGalleryPostIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/galleryposts/create"
      >
      <OverlayTrigger placement="bottom"
      overlay={<Tooltip>Add Gallery Post</Tooltip>}
      >
      <i className="far fa-plus-square"></i>
      </OverlayTrigger>
    </NavLink>
  );

  const loggedInIcons = (
    <>
      <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/feed"
      >
      <OverlayTrigger placement="bottom"
      overlay={<Tooltip>Post Feed</Tooltip>}
      >
      <i className="fas fa-stream"></i>
      </OverlayTrigger>
    </NavLink>
      <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/galleryposts"
      >
      <OverlayTrigger placement="bottom"
      overlay={<Tooltip>Gallery posts feed</Tooltip>}
      >
      <i className="fa-solid fa-camera-retro"></i>
      </OverlayTrigger>
    </NavLink>
      <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/saved"
      >
      <OverlayTrigger placement="bottom"
      overlay={<Tooltip>Saved</Tooltip>}
      >
      <i className="fas fa-heart"></i>
      </OverlayTrigger>
    </NavLink>
      <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/contact"
      >
      <OverlayTrigger placement="bottom"
      overlay={<Tooltip>Contact Us</Tooltip>}
      >
      <i className="fas fa-envelope"></i>
      </OverlayTrigger>
    </NavLink>

      

    <NavLink
      className={styles.NavLink}
      onClick={handleSignOut}
      to="/"
      >
      <OverlayTrigger placement="bottom"
      overlay={<Tooltip>Sign Out</Tooltip>}
      >
      <i className="fas fa-sign-out-alt"></i>
      </OverlayTrigger>
    </NavLink>

    <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} alt="profile"
                height={40} />
        {currentUser?.username}
      </NavLink>
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/signin"
      >
      <OverlayTrigger placement="bottom"
      overlay={<Tooltip>Sign in</Tooltip>}
      >
      <i className="fas fa-sign-in-alt"></i>
      </OverlayTrigger>
    </NavLink>
      

    <NavLink
     className={styles.NavLink}
     activeClassName={styles.Active}
     to="/signup"
     >
     <OverlayTrigger placement="bottom"
     overlay={<Tooltip>Sign up</Tooltip>}
     >
     <i className="fas fa-user-plus"></i>
     </OverlayTrigger>
    </NavLink>

    </>
  );

  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="md"
      fixed="top"
    >
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="40" />
          </Navbar.Brand>
        </NavLink>
        {currentUser && addPostIcon}
        {currentUser && addGalleryPostIcon}
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            

            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/"
            >
            <OverlayTrigger placement="bottom"
            overlay={<Tooltip>Home</Tooltip>}
            >
            <i className="fas fa-home"></i>
            </OverlayTrigger>
            </NavLink>

            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;