import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../../page/layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const PabrikList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);
  const [dataPabrik, setDataPabrik] = useState([]);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    const fetchDataPabrik = async () => {
      try {
        const response = await axios.get(`/api/pabrik`);
        setDataPabrik(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataPabrik();
  }, []);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (
      user &&
      user.role !== "pabrik" &&
      user.role !== "admin" &&
      user.role !== "perusahaan"
    ) {
      navigate("/");
    }
  }, [isError, user, navigate]);

  const deleteDataPabrik = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        await axios.delete(`/api/pabrik/${id}`);
        const updatedDataPabrik = dataPabrik.filter((item) => item.id !== id);
        setDataPabrik(updatedDataPabrik);
        alert("Data berhasil dihapus.");
      } catch (error) {
        console.error("Error deleting data:", error);
        alert("Terjadi kesalahan saat menghapus data.");
      }
    }
  };

  return (
    <Layout>
      <div>
        <h2 className="title">
          <strong>Data Pabrik</strong>
        </h2>
        {user && (user.role === "admin" || user.role === "pabrik") && (
          <Link to="/data-pabrik/add" className="btn btn-primary mb-2">
            Add Data Pabrik
          </Link>
        )}
        {dataPabrik.length > 0 ? (
          dataPabrik.map((pabrik) => (
            <div key={pabrik.id} className="card ps-4 pt-4 pb-4 mb-4">
              {user &&
                (user.role === "admin" || user.role === "perusahaan") && (
                  <div className="col-8 d-flex">
                    <table>
                      <tbody>
                        <tr className="h4">
                          <th>Nama Pabrik</th>
                          <td>:</td>
                          <td>{pabrik && pabrik.user && pabrik.user.name}</td>
                        </tr>
                        <tr className="h4">
                          <th>Email Pabrik</th>
                          <td>:</td>
                          <td>{pabrik && pabrik.user && pabrik.user.email}</td>
                        </tr>
                        <tr>
                          <th>ID Pengiriman</th>
                          <td>:</td>
                          <td>{pabrik && pabrik.idPengiriman}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              <div>
                <div className="subpoin mt-2">
                  <table>
                    <tbody>
                      <tr>
                        <td> Tanggal Penerimaan </td>
                        <td>:</td>
                        <td> {pabrik.tanggalPenerimaan} </td>
                      </tr>
                      <tr>
                        <td> Berat Total Diterima </td>
                        <td>:</td>
                        <td> {pabrik.beratTotalDiterima} kg </td>
                      </tr>
                      <tr>
                        <td> Evaluasi Kualitas </td>
                        <td>:</td>
                        <td> {pabrik.evaluasiKualitas} </td>
                      </tr>
                      <tr>
                        <td> Catatan Kualitas </td>
                        <td>:</td>
                        <td> {pabrik.catatanKualitas} </td>
                      </tr>
                      <tr>
                        <td> Kapasitas Produksi </td>
                        <td>:</td>
                        <td> {pabrik.kapasitasProduksi} kg </td>
                      </tr>
                      <tr>
                        <td> Produksi Harian Tapioka </td>
                        <td>:</td>
                        <td> {pabrik.produksiHarianTapioka} kg </td>
                      </tr>
                      <tr>
                        <td> Kualitas Output </td>
                        <td>:</td>
                        <td> {pabrik.kualitasOutput} </td>
                      </tr>
                      <tr>
                        <td> Permasalahan Operasional </td>
                        <td>:</td>
                        <td> {pabrik.permasalahanOperasional} </td>
                      </tr>
                      <tr>
                        <td> Kebutuhan Perbaikan </td>
                        <td>:</td>
                        <td> {pabrik.kebutuhanPerbaikan} </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
                <div className="buttons mt-3">
                  {user && (user.role === "admin" || user.role === "pabrik") && (
                    <Link
                      to={`/data-pabrik/edit/${pabrik.id}`}
                      className="btn btn-info button-detail"
                    >
                      Edit
                    </Link>
                  )}
                  {user.role === "admin" && (
                    <button
                    onClick={() => deleteDataPabrik(pabrik.id)}
                    className="btn btn-danger button-detail ms-2"
                  >
                    Delete
                  </button>
                  )}
                  
                
                </div>
              
            </div>
          ))
        ) : (
          <p>Memuat data...</p>
        )}
      </div>
    </Layout>
  );
};

export default PabrikList;
