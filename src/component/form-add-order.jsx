import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddOrder = () => {
  const [tanggalPemanenan, setTanggalPemanenan] = useState("");
  const [varietasSingkong, setVarietasSingkong] = useState("");
  const [estimasiBerat, setEstimasiBerat] = useState("");
  const [estimasiHarga, setEstimasiHarga] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/products", {
        tanggalPemanenan: tanggalPemanenan,
        varietasSingkong: varietasSingkong,
        estimasiBerat: estimasiBerat,
        estimasiHarga: estimasiHarga,
      });
      navigate("/products");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <nav aria-label="breadcrumb pb-0">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/panen" >Order Panen</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Add Order Panen
          </li>
        </ol>
      </nav>

      <h2 className="title pt-0">
        {" "}
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
                    placeholder="Product Name"
                  />
                </div>
              </div>
              <div className="field mb-3">
                <label className="label">Varietas / Jenis Singkong</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={varietasSingkong}
                    onChange={(e) => setVarietasSingkong(e.target.value)}
                    placeholder="Varietas"
                  />
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
                  <button type="button" className="btn btn-success">
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
