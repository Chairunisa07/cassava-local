import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddOrder = () => {
  const [tanggalPemanenan, setTanggalPemanenan] = useState("");
  const [varietasSingkong, setVarietasSingkong] = useState("");
  const [estimasiBerat, setEstimasiBerat] = useState("");
  const [estimasiHarga, setEstimasiHarga] = useState("");
  const [hargaPerKg, setHargaPerKg] = useState({});
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/products`, {
        tanggalPemanenan,
        varietasSingkong,
        estimasiBerat,
        estimasiHarga,
      });
      navigate("/panen");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  useEffect(() => {
    // Fetch harga from perusahaan
    const fetchHarga = async () => {
      try {
        const response = await axios.get(`/api/perusahaan`);
        const perusahaan = response.data;
        if (perusahaan && perusahaan.length > 0) {
          const { hargaGradeA, hargaGradeB, hargaGradeC } = perusahaan[0];
          setHargaPerKg({
            "Grade A": hargaGradeA,
            "Grade B": hargaGradeB,
            "Grade C": hargaGradeC,
          });
        }
      } catch (error) {
        console.error("Error fetching harga:", error);
      }
    };
    fetchHarga();
  }, []);

  useEffect(() => {
    // Update estimasiHarga based on varietasSingkong
    if (varietasSingkong) {
      const harga = hargaPerKg[varietasSingkong] || 0;
      setEstimasiHarga(harga);
    }
  }, [varietasSingkong, hargaPerKg]);

  return (
    <div>
      <nav aria-label="breadcrumb pb-0">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/panen">Order Panen</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Order Panen
          </li>
        </ol>
      </nav>

      <h2 className="title pt-0">
        <strong>Add Order Pemanenan</strong>
      </h2>
      
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content ps-4 pt-2">
            <form onSubmit={saveProduct}>
              <p className="has-text-centered">{msg}</p>
              <div className="field mb-3">
                <label className="label">Tanggal Panen</label>
                <div className="control">
                  <input
                    type="date"
                    className="input"
                    value={tanggalPemanenan}
                    onChange={(e) => setTanggalPemanenan(e.target.value)}
                    placeholder="Tanggal Panen"
                  />
                </div>
              </div>
              <div className="field mb-3">
                <label className="label">Varietas / Jenis Singkong</label>
                <div className="control">
                  <div className="select">
                    <select
                      className="input"
                      value={varietasSingkong}
                      onChange={(e) => setVarietasSingkong(e.target.value)}
                    >
                      <option value="">Pilih Varietas</option>
                      <option value="Grade A">Grade A</option>
                      <option value="Grade B">Grade B</option>
                      <option value="Grade C">Grade C</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field mb-3">
                <label className="label">Estimasi Berat (kg) </label>
                <div className="control">
                  <input
                    type="number"
                    className="input"
                    value={estimasiBerat}
                    onChange={(e) => setEstimasiBerat(e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="field mb-3">
                <label className="label">Harga per kg (Rp) </label>
                <div className="control">
                  <input
                    type="number"
                    className="input"
                    value={estimasiHarga}
                    onChange={(e) => setEstimasiHarga(e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="field mb-3">
                <div className="control">
                  <button type="submit" className="btn btn-success">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddOrder;
