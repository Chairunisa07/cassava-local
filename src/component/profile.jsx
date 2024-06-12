import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import "./component.css";
import axios from "axios";
import { IoPerson } from "react-icons/io5";

const Profile = () => {
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
    setIsSubMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    let cancel;
    if (user && user.uuid) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `/api/users/${user.uuid}`,
            { cancelToken: new axios.CancelToken(c => cancel = c) }
          );
          setUserData(response.data);
        } catch (error) {
          if (axios.isCancel(error)) return;
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }

    return () => cancel && cancel();
  }, [user]);

  return (
    <nav className="navbar-profile is-fixed-top has-shadow" role="navigation">
      <div className={`dropdown ${isSubMenuOpen ? "show" : ""}`}>
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          aria-expanded={isSubMenuOpen}
          style={{ backgroundColor: "#CE4815", display: "flex", alignItems: "center" }}
          onClick={toggleProfile}
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
        <ul className={`dropdown-menu ${isSubMenuOpen ? "show" : ""}`}>
          <li>
            {userData && userData.role === "perusahaan" && (
              <Link
                to={`/profile-perusahaan/edit/${userData.uuid}`}
                className="dropdown-item"
              >
                Edit Profile
              </Link>
            )}
            {userData && userData.role === "petani" && (
              <Link
                to={`/profile-petani/edit/${userData.uuid}`}
                className="dropdown-item"
              >
                Edit Profile
              </Link>
            )}
            {userData && userData.role === "pabrik" && (
              <Link
                to={`/profile-pabrik/edit/${userData.uuid}`}
                className="dropdown-item"
              >
                Edit Profile
              </Link>
            )}
            {userData && userData.role === "logistik" && (
              <Link
                to={`/profile-logistik/edit/${userData.uuid}`}
                className="dropdown-item"
              >
                Edit Profile
              </Link>
            )}
          </li>
          <li>
            <a onClick={logout} className="dropdown-item" href="/login">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Profile;
