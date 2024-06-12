// NavbarUser.jsx
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import {
  IoPerson,
  IoHome,
  IoLogOut,
  IoBusiness,
  IoFastFood,
  IoAirplane,
  IoBagHandle,
  IoHourglass,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sidebar.css"; // Import CSS for styling
import logo from "../logo.png";

const NavbarUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/login");
  };

  const [userData, setUserData] = useState(null);
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const [dataDropdownVisible, setDataDropdownVisible] = useState(false);

  useEffect(() => {
    if (user) {
      setUserData({
        ...user,
        uuid: "user-uuid" // Contoh uuid, ganti dengan data fetching asli
      });
    }
  }, [user]);

  const handleProfileToggle = (isOpen) => {
    setProfileDropdownVisible(isOpen);
    setDataDropdownVisible(false);
  };

  const handleDataToggle = (isOpen) => {
    setDataDropdownVisible(isOpen);
    setProfileDropdownVisible(false);
  };

  return (
    <div>
      <Navbar variant="dark" expand="lg" className="navbar-user">
        <Navbar.Brand>
          <img
            src={logo}
            alt=""
            style={{ width: "30%" }}
            className="navbar-user-img"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="ml-auto navbar-user-toggle" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={NavLink} to="/dashboard">
              <IoHome /> Dashboard
            </Nav.Link>
            <Nav.Link as={NavLink} to="/panen">
              <IoBagHandle /> Order Panen
            </Nav.Link>
            <Nav.Link as={NavLink} to="/history-panen">
              <IoHourglass /> History Panen
            </Nav.Link>

            {user && user.role === "admin" && (
              <Nav.Link as={NavLink} to="/users">
                <IoPerson /> Users
              </Nav.Link>
            )}

            {user && user.role !== "admin" && (
              <NavDropdown
                title={<><IoPerson /> Profile</>}
                id="profile-nav-dropdown"
                show={profileDropdownVisible}
                onToggle={handleProfileToggle}
              >
                {user.role === "perusahaan" && (
                  <>
                    <NavDropdown.Item as={NavLink} to="/profile-perusahaan">
                      Profile Perusahaan
                    </NavDropdown.Item>
                    {userData && (
                      <NavDropdown.Item as={NavLink} to={`/profile-perusahaan/edit/${userData.uuid}`}>
                        Edit Profile
                      </NavDropdown.Item>
                    )}
                  </>
                )}
                {user.role === "petani" && (
                  <>
                    <NavDropdown.Item as={NavLink} to="/profile-petani">
                      Profile Petani
                    </NavDropdown.Item>
                    {userData && (
                      <NavDropdown.Item as={NavLink} to={`/profile-petani/edit/${userData.uuid}`}>
                        Edit Profile
                      </NavDropdown.Item>
                    )}
                  </>
                )}
                {user.role === "pabrik" && (
                  <>
                    <NavDropdown.Item as={NavLink} to="/profile-pabrik">
                      Profile Pabrik
                    </NavDropdown.Item>
                    {userData && (
                      <NavDropdown.Item as={NavLink} to={`/profile-pabrik/edit/${userData.uuid}`}>
                        Edit Profile
                      </NavDropdown.Item>
                    )}
                  </>
                )}
                {user.role === "logistik" && (
                  <>
                    <NavDropdown.Item as={NavLink} to="/profile-logistik">
                      Profile Logistik
                    </NavDropdown.Item>
                    {userData && (
                      <NavDropdown.Item as={NavLink} to={`/profile-logistik/edit/${userData.uuid}`}>
                        Edit Profile
                      </NavDropdown.Item>
                    )}
                  </>
                )}
              </NavDropdown>
            )}

            <NavDropdown
              title={<><IoFastFood /> Data-data</>}
              id="data-nav-dropdown"
              show={dataDropdownVisible}
              onToggle={handleDataToggle}
            >
              {(user && (user.role === "admin" || user.role === "perusahaan" || user.role === "petani")) && (
                <NavDropdown.Item as={NavLink} to="/datalahan">
                  <IoFastFood /> Data Petani
                </NavDropdown.Item>
              )}
              {(user && (user.role === "admin" || user.role === "perusahaan" || user.role === "pabrik")) && (
                <NavDropdown.Item as={NavLink} to="/data-pabrik">
                  <IoBusiness /> Data Pabrik
                </NavDropdown.Item>
              )}
              {(user && (user.role === "admin" || user.role === "perusahaan" || user.role === "logistik")) && (
                <NavDropdown.Item as={NavLink} to="/data-logistik">
                  <IoAirplane /> Data Logistik
                </NavDropdown.Item>
              )}
            </NavDropdown>

            <Nav.Link onClick={logout}>
              <IoLogOut /> Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarUser;
