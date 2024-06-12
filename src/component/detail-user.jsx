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
            `/api/users/${user.uuid}`
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
        <div className="user-details-container">
          <div className="col-4 d-flex user-additional-info">
            {userData.additionalInfo?.url && (
              <img
                src={userData.additionalInfo.url}
                alt={userData.name}
                className="user-image"
              />
            )}
          </div>
          <div className="user-data col-8 d-flex">
          <table className="user-data-table">
              <tbody>
                <tr>
                  <th>ID Blockchain</th>
                  <td>:</td>
                  <td>{userData.uuid}</td>
                </tr>
                <tr>
                  <th>Nama</th>
                  <td>:</td>
                  <td>{userData.name}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>:</td>
                  <td>{userData.email}</td>
                </tr>
                <tr>
                  <th>Nomor HP</th>
                  <td>:</td>
                  <td>{userData.additionalInfo.nohp}</td>
                </tr>
                <tr>
                  <th>Alamat</th>
                  <td>:</td>
                  <td>{userData.additionalInfo.alamat}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
    </div>
  );
};

export default DetailUser;
