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
        const response = await axios.get("http://localhost:5000/pabrik");
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
    if (user && user.role !== "pabrik" && user.role !== "admin") {
      navigate("/");
    }
  }, [isError, user, navigate]);

  const deleteDataPabrik = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        await axios.delete(`http://localhost:5000/pabrik/${id}`);
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
        <Link to="/data-pabrik/add" className="btn btn-primary mb-2">
          Add Data Pabrik
        </Link>
        {dataPabrik.length > 0 ? (
          dataPabrik.map((pabrik) => (
            <div key={pabrik.id} className="card ps-4 pt-4 pb-4 mb-4">
              {user && user.role === "admin" && (
                <div>
                  <h3>
                    <b>Nama Pabrik: {pabrik.user.name}</b>
                  </h3>
                  <h3>
                    <b>Email Pabrik: {pabrik.user.email}</b>
                  </h3>
                </div>
              )}
              <div>
                <p>
                  <b>ID Pengiriman :</b> {pabrik.idPengiriman}
                </p>
                <div className="subpoin">
                  <p>Tanggal Penerimaan : {pabrik.tanggalPenerimaan}</p>
                  <p>Berat Total Diterima : {pabrik.beratTotalDiterima} kg</p>
                  <p>Evaluasi Kualitas : {pabrik.evaluasiKualitas}</p>
                  <p>Catatan Kualitas : {pabrik.catatanKualitas}</p>
                  <p>Kapasitas Produksi : {pabrik.kapasitasProduksi} kg</p>
                  <p>
                    Produksi Harian Tapioka : {pabrik.produksiHarianTapioka} kg
                  </p>
                  <p>Kualitas Output : {pabrik.kualitasOutput}</p>
                  <p>
                    Permasalahan Operasional : {pabrik.permasalahanOperasional}
                  </p>
                  <p>Kebutuhan Perbaikan : {pabrik.kebutuhanPerbaikan}</p>
                </div>
              </div>
              {user && user.role === "admin" && (
                <div className="buttons mt-3">
                  <Link
                    to={`/data-pabrik/edit/${pabrik.id}`}
                    className="btn btn-info button-detail"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteDataPabrik(pabrik.id)}
                    className="btn btn-danger button-detail ms-2"
                  >
                    Delete
                  </button>
                </div>
              )}
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
