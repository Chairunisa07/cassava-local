import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const FormTerimaOrder = () => {
  const { user } = useSelector((state) => state.auth);

  const [namaPerusahaan, setNamaPerusahaan] = useState("");
  const [noHpPerusahaan, setNoHpPerusahaan] = useState("");
  const [statusOrder, setStatusOrder] = useState("");
  const [namaLogistik, setNamaLogistik] = useState("");
  const [noHpLogistik, setNoHpLogistik] = useState("");
  const [platnoLogistik, setPlatnoLogistik] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(
          `/api/products/${id}`
        );
        setNamaPerusahaan(response.data.namaPerusahaan);
        setNoHpPerusahaan(response.data.noHpPerusahaan);
        setStatusOrder(response.data.statusOrder);
        setNamaLogistik(response.data.namaLogistik);
        setNoHpLogistik(response.data.noHpLogistik);
        setPlatnoLogistik(response.data.platnoLogistik);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getProductById();
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/products/${id}`, {
        namaPerusahaan: namaPerusahaan,
        noHpPerusahaan: noHpPerusahaan,
        statusOrder: statusOrder,
        namaLogistik: namaLogistik,
        noHpLogistik: noHpLogistik,
        platnoLogistik: platnoLogistik,
      });
      navigate("/panen");
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
            <a href="/panen">Order Panen</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Terima Order
          </li>
        </ol>
      </nav>

      <h2 className="title">
        {" "}
        <strong>Terima Order</strong>
      </h2>
      <div className="card is-shadowless pb-3">
        <div className="card-content ps-5">
          <div className="content">
            <form onSubmit={updateProduct}>
              <p className="has-text-centered">{msg}</p>
              {user && (user.role === "pabrik" || user.role === "admin") && (
                <div>
                  <div className="field mb-2">
                    <label className="label">Nama Pabrik</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={namaPerusahaan}
                        onChange={(e) => setNamaPerusahaan(e.target.value)}
                        placeholder="Nama Pabrik"
                      />
                    </div>
                  </div>
                  <div className="field mb-2">
                    <label className="label">Nomor HP</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={noHpPerusahaan}
                        onChange={(e) => setNoHpPerusahaan(e.target.value)}
                        placeholder="Nomor HP Pabrik"
                      />
                    </div>
                  </div>
                  <div className="field mb-2">
                    <label className="label">Status Order:</label>
                    <div className="control">
                      <div className="select is-fullwidth">
                        <select
                          type="text"
                          className="input"
                          value={statusOrder}
                          onChange={(e) => setStatusOrder(e.target.value)}
                          placeholder="Status Order"
                          required
                        >
                          <option value=""></option>
                          <option value="disetujui">Disetujui</option>
                          <option value="ditolak">Ditolak</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {user && (user.role === "admin" || user.role === "logistik") && (
                <div>
                  <div className="field mb-2">
                    <label className="label">Nama Logistik</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={namaLogistik}
                        onChange={(e) => setNamaLogistik(e.target.value)}
                        placeholder="Nama Logistik"
                      />
                    </div>
                  </div>
                  <div className="field mb-2">
                    <label className="label">Nomor HP Logistik</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={noHpLogistik}
                        onChange={(e) => setNoHpLogistik(e.target.value)}
                        placeholder="Nomor HP Logistik"
                      />
                    </div>
                  </div>
                  <div className="field mb-2">
                    <label className="label">Plat Nomor</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={platnoLogistik}
                        onChange={(e) => setPlatnoLogistik(e.target.value)}
                        placeholder="Plat Nomor Logistik"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="field mt-2">
                <div className="control">
                  <button type="submit" className="btn btn-success">
                    Update
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

export default FormTerimaOrder;
