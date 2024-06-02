import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../../page/layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const LogistikList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState([]);
  const [userAuth, setUserAuth] = useState(null);

  useEffect(() => {
    // Pastikan user dan user.uuid tersedia sebelum melakukan fetch
    if (user?.uuid) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/users/${user.uuid}`
          );
          setUserAuth(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [user?.uuid]); // Tambahkan user?.uuid sebagai dependency untuk lebih aman

  useEffect(() => {
    if (user?.uuid) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/logistik`);
          setUserData(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [user?.uuid]);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user && user.role !== "logistik") {
      navigate("/data-logistik");
    }
  }, [isError, user, navigate]);

  const deleteProduct = async (id) => {
    // Tampilkan dialog konfirmasi penghapusan
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        await axios.delete(`http://localhost:5000/logistik/${id}`);
        // Filter out the deleted data from the userData state
        const updatedUserData = userData.filter((data) => data.id !== id);
        setUserData(updatedUserData); // Set the state with the filtered data
        // Tampilkan pesan sukses atau lakukan sesuatu sebagai konfirmasi penghapusan
        alert("Data berhasil dihapus.");
      } catch (error) {
        console.error("Error deleting data:", error);
        // Handle error, e.g., show an error message
        alert("Terjadi kesalahan saat menghapus data.");
      }
    }
  };

  return (
    <Layout>
      <div>
        <h2 className="title">
          {" "}
          <strong>Data Logistik</strong>
        </h2>
        <Link to="/data-logistik/add" className="btn btn-primary mb-2">
          Add New
        </Link>
        {userData.length ? (
          userData.map((data, index) => (
            <div key={index}>
              <div className="card ps-4 pt-4 pb-4 mb-4">
                {user && userAuth?.role === "admin" && (
                  <div>
                    <h3>
                      <b>Nama : {data.user.name}</b>
                    </h3>
                    <h3>
                      <b>Email : {data.user.email}</b>
                    </h3>
                  </div>
                )}

                <p className="poin">
                  {" "}
                  <b>1. Detail Pengiriman</b>
                </p>
                <div className="subpoin">
                  <p>ID Blockchain : {data.idPengiriman}</p>
                  <p>
                    Tanggal Waktu Pengiriman : {data.tanggalWaktuPengiriman}
                  </p>
                  <p>Asal : {data.asal}</p>
                  <p>Tujuan : {data.tujuan}</p>
                </div>

                <p className="poin mt-3">
                  <b>2. Detail Kendaraan</b>
                </p>
                <div className="subpoin">
                  <p>Estimasi Waktu Tiba: {data.estimasiWaktuTiba}</p>
                  <p>Nomor Polisi Kendaraan : {data.nomorPolisiKendaraan}</p>
                  <p>Jenis Kendaraan : {data.jenisKendaraan}</p>
                  <p>Kapasitas Angkut : {data.kapasitasAngkut} kg</p>
                </div>

                <p className="poin mt-3"><b>3.Biaya dan Efisiensi</b></p>
                <div className="subpoin">
                  <p>Biaya Transportasi : Rp {data.biayaTransportasi}</p>
                  <p>Catatan Efisiensi Rute : {data.catatanEfisiensiRute}</p>
                </div>

                <p className="poin mt-3"><b>4. Feedback</b></p>
                <div className="subpoin">
                  <p>Kondisi Pengiriman : {data.kondisiPengiriman}</p>
                  <p>Catatan Dari Penerima : {data.catatanDariPenerima}</p>
                </div>

                {user && userAuth?.role === "admin" && (
                  <div className="mt-3">
                    <Link
                      to={`/data-logistik/edit/${data.id}`}
                      className="btn btn-info button-detail"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProduct(data.id)}
                      className="btn btn-danger button-detail ms-2"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
    </Layout>
  );
};

export default LogistikList;
