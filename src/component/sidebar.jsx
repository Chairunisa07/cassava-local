import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
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
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./sidebar.css";
import logo from "../logo.png";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <div>
      <aside className="menu pl-2 has-shadow" id="sidebar">
        <div class="col text-center">
          <img src={logo} alt="" style={{ width: "30%" }} className="logo-sidebar" />
        </div>
        <div class="sidebar-logo text-center pt-2">
          <h3>
            <strong>Cassava Super</strong>
          </h3>
        </div>
        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li>
            <NavLink to={"/dashboard"}>
              <IoHome /> Dashboard
            </NavLink>
          </li>
          <li className="mt-3">
            <NavLink to={"/panen"}>
              <IoBagHandle />
              Order Panen
            </NavLink>
          </li>
          <li className="mt-3">
            <NavLink to={"/history-panen"}>
              <IoHourglass />
              History Panen
            </NavLink>
          </li>
        </ul>

        {user && user.role === "admin" && (
          <div>
            <p className="menu-label">Users</p>
            <ul className="menu-list">
              <li>
                <NavLink to={"/users"}>
                  <IoPerson /> Users
                </NavLink>
              </li>
            </ul>
          </div>
        )}

        {user && user.role !== "admin" && (
          <div>
            <p className="menu-label">Profile</p>
            {user.role === "perusahaan" && (
              <ul className="menu-list">
                <li>
                  <NavLink to={"/profile-perusahaan"}>
                    <IoPerson /> Profile Perusahaan
                  </NavLink>
                </li>
              </ul>
            )}

            {user.role === "petani" && (
              <ul className="menu-list">
                <li>
                  <NavLink to={"/profile-petani"}>
                    <IoPerson /> Profile Petani
                  </NavLink>
                </li>
              </ul>
            )}

            {user.role === "pabrik" && (
              <ul className="menu-list">
                <li>
                  <NavLink to={"/profile-pabrik"}>
                    <IoPerson /> Profile Pabrik
                  </NavLink>
                </li>
              </ul>
            )}

            {user.role === "logistik" && (
              <ul className="menu-list">
                <li>
                  <NavLink to={"/profile-logistik"}>
                    <IoPerson /> Profile Logistik
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        )}

        <div>
          <p className="menu-label">Data-data</p>
          {user &&
            (user.role === "admin" ||
              user.role === "perusahaan" ||
              user.role === "petani") && (
              <ul className="menu-list">
                <li>
                  <NavLink to={"/datalahan"}>
                    <IoFastFood /> Data Petani
                  </NavLink>
                </li>
              </ul>
            )}

          {user &&
            (user.role === "admin" ||
              user.role === "perusahaan" ||
              user.role === "pabrik") && (
              <ul className="menu-list">
                <li>
                  <NavLink to={"/data-pabrik"}>
                    <IoBusiness /> Data Pabrik
                  </NavLink>
                </li>
              </ul>
            )}

          {user &&
            (user.role === "admin" ||
              user.role === "perusahaan" ||
              user.role === "logistik") && (
              <ul className="menu-list">
                <li>
                  <NavLink to={"/data-logistik"}>
                    <IoAirplane /> Data Logistik
                  </NavLink>
                </li>
              </ul>
            )}
        </div>

        <ul className="button text-center">
          <li>
            <button onClick={logout} className="btn btn-danger">
              <IoLogOut /> Logout
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
