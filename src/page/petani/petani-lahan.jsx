import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../../page/layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const PetaniLahan = () => {
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
          const response = await axios.get(`/api/users/${user.uuid}`);
          console.log(response.data);
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
          const response = await axios.get(`/api/petanis`);
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
    if (user && user.role !== "petani") {
      navigate("/datalahan");
    }
  }, [isError, user, navigate]);

  const deleteProduct = async (id) => {
    // Tampilkan dialog konfirmasi penghapusan
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        await axios.delete(`/api/petani/${id}`);
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
          <strong>Data Petani</strong>
        </h2>
        {user && (user.role === "admin" || user.role === "petani") && (
          <Link to="/datalahan/add" className="btn btn-primary mb-2">
            Add Data Petani
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
                        <tbody className="h4">
                          <tr>
                            <th>Nama Petani</th>
                            <td>:</td>
                            <td>{data.user.name}</td>
                          </tr>
                          <tr>
                            <th>Email Petani</th>
                            <td>:</td>
                            <td>{data.user.email}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                <p className="poin">
                  <b>1. Informasi Lahan</b>
                </p>
                <div className="subpoin">
                  <tr>
                    <td> ID Blockchain </td>
                    <td>:</td>
                    <td>{data.idlahan}</td>
                  </tr>
                  <tr>
                    <td>Lokasi Lahan</td>
                    <td>:</td>
                    <td>{data.lokasilahan}</td>
                  </tr>
                  <tr>
                    <td>Luas Lahan</td>
                    <td>:</td>
                    <td>{data.luaslahan}</td>
                  </tr>
                  <tr>
                    <td>Status Lahan</td>
                    <td>:</td>
                    <td>{data.statuskepemilikanlahan}</td>
                  </tr>
                </div>

                <p className="poin mt-3">
                  <b>2. Data Produksi</b>
                </p>
                <div className="subpoin">
                  <tr>
                    <td> Periode Tanam Mulai </td>
                    <td>:</td>
                    <td>{data.periodeTanamMulai}</td>
                  </tr>
                  <tr>
                    <td> Periode Tanam Selesai </td>
                    <td>:</td>
                    <td>{data.periodeTanamSelesai}</td>
                  </tr>
                  <tr>
                    <td> Data Varietas Singkong </td>
                    <td>:</td>
                    <td>{data.varietassingkong}</td>
                  </tr>
                  <tr>
                    <td> Estimasi Produksi </td>
                    <td>:</td>
                    <td>{data.estimasiproduksi}</td>
                  </tr>
                </div>

                <p className="poin mt-3">
                  <b>3. Penggunaan Pupuk dan Pestisida</b>
                </p>
                <div className="subpoin">
                  <tr>
                    <td> Jenis Pupuk </td>
                    <td>:</td>
                    <td>{data.jenispupuk}</td>
                  </tr>
                  <tr>
                    <td> Jumlah Pupuk </td>
                    <td>:</td>
                    <td>{data.jumlahpupuk}</td>
                  </tr>
                </div>

                <p className="poin mt-3">
                  <b>4. Tambahan</b>
                </p>
                <p className="pb-2">
                  {" "}
                  Catatan Tambahan : {data.catatantambahan}
                </p>

                <div>
                  {user &&
                    (user.role === "admin" || user.role === "petani") && (
                      <Link
                        to={`/datalahan/edit/${data.id}`}
                        className="btn btn-info button-detail"
                      >
                        Edit
                      </Link>
                    )}

                  {user && user.role === "admin" && (
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

export default PetaniLahan;
