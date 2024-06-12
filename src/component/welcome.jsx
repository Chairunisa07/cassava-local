import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./component.css";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Pastikan user dan user.uuid tersedia sebelum melakukan fetch
    if (user && user.uuid) {
      const fetchData = async () => {
        try {
          // Lakukan permintaan GET ke endpoint
          const response = await axios.get(
            `/api/users/${user.uuid}`
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
    <div>
      <h1 className="subtitle">
        <strong>Welcome Back! </strong> <br />{" "}
        <h2>
          <b>{user && user.name}</b>
        </h2>
      </h1>
      {userData?.additionalInfo?.url && (
        <img
          src={userData.additionalInfo.url}
          alt={userData.name}
          style={{ maxWidth: "20%", height: "20%", marginBottom: "10px" }}
        />
      )}

      <div className="welcome">
        <p>Role : {user && user.role}</p>
        <p>ID Blokchain : {user && user.uuid}</p>
        <p>Email : {user && user.email}</p>
      </div>
    </div>
  );
};

export default Welcome;
