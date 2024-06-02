import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./component.css";

const DetailUser = () => {
  const { user } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Pastikan user dan user.uuid tersedia sebelum melakukan fetch
    if (user?.uuid) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/users/${user.uuid}`
          );
          console.log(response.data);
          setUserData(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [user?.uuid]); // Tambahkan user?.uuid sebagai dependency untuk lebih aman

  return (
    <div>
      <h2 className="title">
        <strong>User Details</strong>
      </h2>

      <div className="card ps-4 pt-4 pb-4 mb-4">
        {userData ? (
          <span>
            {userData.additionalInfo?.url && (
              <img
                src={userData.additionalInfo.url}
                alt={userData.name}
                style={{ maxWidth: "20%", height: "20%" }}
              />
            )}
            <p className="mt-3">ID Blockchain: {userData.uuid}</p>
            <p>Nama : {userData.name}</p>
            <p>Email : {userData.email}</p>
            <p>Nomor HP : {userData.additionalInfo.nohp}</p>
            <p>Alamat : {userData.additionalInfo.alamat}</p>

            {user && userData.role === "petani" && (
              <Link
                to={`/profile-petani/edit/${userData.uuid}`}
                className="btn btn-info mt-2 button-detail"
              >
                Edit Profile {userData.role}
              </Link>
            )}
            {user && userData.role === "pabrik" && (
              <Link
                to={`/profile-pabrik/edit/${userData.uuid}`}
                className="btn btn-info mt-2 button-detail"
              >
                Edit Profile {userData.role}
              </Link>
            )}
            {user && userData.role === "logistik" && (
              <Link
                to={`/profile-logistik/edit/${userData.uuid}`}
                className="btn btn-info mt-2 button-detail"
              >
                Edit Profile {userData.role}
              </Link>
            )}
          </span>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
    </div>
  );
};

export default DetailUser;
