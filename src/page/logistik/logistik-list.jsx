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
            `/api/users/${user.uuid}`
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
          const response = await axios.get(`/api/logistik`);
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
        await axios.delete(`/api/logistik/${id}`);
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
        {user && (user.role === "admin" || user.role === "logistik") && (
          <Link to="/data-logistik/add" className="btn btn-primary mb-2">
            Add Data Logistik
          </Link>
        )}

        {userData.length ? (
          userData.map((data, index) => (
            <div key={index}>
              <div className="card ps-4 pt-4 pb-4 mb-4">
                {user &&
                  (user.role === "admin" || user.role === "perusahaan") && (
                    <div className="col-8 d-flex">
                      <table>
                        <tbody>
                          <tr className="h4">
                            <th>Nama Logistik</th>
                            <td>:</td>
                            <td>{user.name}</td>
                          </tr>
                          <tr className="h4">
                            <th>Nama Pabrik</th>
                            <td>:</td>
                            <td>{user.email}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                <p className="poin">
                  {" "}
                  <b>1. Detail Pengiriman</b>
                </p>
                <div className="subpoin">
                  <table>
                    <tbody>
                      <tr>
                        <td>ID Blockchain</td>
                        <td>:</td>
                        <td>{data.idPengiriman}</td>
                      </tr>
                      <tr>
                        <td>Tanggal Waktu Pengiriman</td>
                        <td>:</td>
                        <td>{data.tanggalWaktuPengiriman}</td>
                      </tr>
                      <tr>
                        <td>Asal</td>
                        <td>:</td>
                        <td>{data.asal}</td>
                      </tr>
                      <tr>
                        <td>Tujuan</td>
                        <td>:</td>
                        <td>{data.tujuan}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="poin mt-3">
                  <b>2. Detail Kendaraan</b>
                </p>
                <div className="subpoin">
                  <table>
                    <tbody>
                      <tr>
                        <td>Estimasi Waktu Tiba</td>
                        <td>:</td>
                        <td>{data.estimasiWaktuTiba}</td>
                      </tr>
                      <tr>
                        <td>Nomor Polisi Kendaraan</td>
                        <td>:</td>
                        <td>{data.nomorPolisiKendaraan}</td>
                      </tr>
                      <tr>
                        <td>Jenis Kendaraan</td>
                        <td>:</td>
                        <td>{data.jenisKendaraan}</td>
                      </tr>
                      <tr>
                        <td>Kapasitas Angkut</td>
                        <td>:</td>
                        <td>{data.kapasitasAngkut} ton</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="poin mt-3">
                  <b>3.Efisiensi</b>
                </p>
                <div className="subpoin">
                  <p>Catatan Efisiensi Rute : {data.catatanEfisiensiRute}</p>
                </div>

                <p className="poin mt-3">
                  <b>4. Feedback</b>
                </p>
                <div className="subpoin">
                  <table>
                    <tbody>
                      <tr>
                        <td>Kondisi Pengiriman</td>
                        <td>:</td>
                        <td>{data.kondisiPengiriman}</td>
                      </tr>
                      <tr>
                        <td>Catatan Dari Penerima</td>
                        <td>:</td>
                        <td>{data.catatanDariPenerima}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-3">
                  {user &&
                    (user.role === "admin" || user.role === "logistik") && (
                      <Link
                        to={`/data-logistik/edit/${data.id}`}
                        className="btn btn-info button-detail"
                      >
                        Edit
                      </Link>
                    )}
                  {user.role === "admin" && (
                    <button
                      onClick={() => deleteProduct(data.id)}
                      className="btn btn-danger button-detail ms-2"
                    >
                      Delete
                    </button>
                  )}
                </div>
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
