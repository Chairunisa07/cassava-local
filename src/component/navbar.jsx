import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import "./component.css";
import axios from "axios";
import { IoPerson } from "react-icons/io5";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(null);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  const toggleProfile = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  useEffect(() => {
    // Pastikan user dan user.uuid tersedia sebelum melakukan fetch
    if (user && user.uuid) {
      const fetchData = async () => {
        try {
          // Lakukan permintaan GET ke endpoint
          const response = await axios.get(
            `http://localhost:5000/users/${user.uuid}`
          );
          console.log(response.data);
          // Simpan data ke state
          setUserData(response.data);
        } catch (error) {
          // Tangani kesalahan jika permintaan gagal
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [user, user?.uuid]); // Tambahkan user.uuid sebagai dependency

  return (
    <nav className="navbar is-fixed-top has-shadow" role="navigation">
  <div className="dropdown">
    <button
      className="btn btn-secondary dropdown-toggle"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      style={{ backgroundColor: "#CE4815", display: "flex", alignItems: "center" }}
    >
      <div className="profile-image">
        {userData?.additionalInfo?.url ? (
          <img
            src={userData.additionalInfo.url}
            className="user"
            alt="user"
          />
        ) : (
          <IoPerson />
        )}
      </div>
      <span className="username">{user && user.name}</span>
    </button>
    <ul className="dropdown-menu">
      <li>
        <a onClick={logout} className="dropdown-item active" href="#">
          Logout
        </a>
      </li>
    </ul>
  </div>
</nav>

  );
};

export default Navbar;
