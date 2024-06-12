import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

const FormUpdateOrder = () => {
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [formData, setFormData] = useState({
    namaLogistik: "",
    noHpLogistik: "",
    platnoLogistik: "",
    namaPerusahaan: "",
    noHpPerusahaan: "",
    statusOrder: "",
    beratSingkong: "",
    beratBatang: "",
    beratDaun: "",
  });
  const [hargaPerKg, setHargaPerKg] = useState({});
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `api/products/${id}`
        );
        const data = response.data;
        setProduct(data);
        setFormData({
          namaLogistik: data.namaLogistik || "",
          noHpLogistik: data.noHpLogistik || "",
          platnoLogistik: data.platnoLogistik || "",
          namaPerusahaan: data.namaPerusahaan || "",
          noHpPerusahaan: data.noHpPerusahaan || "",
          statusOrder: data.statusOrder || "",
          beratSingkong: data.beratSingkong || "",
          beratBatang: data.beratBatang || "",
          beratDaun: data.beratDaun || "",
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "statusOrder") {
      const harga = hargaPerKg[value] || 0;
      setFormData((prevData) => ({
        ...prevData,
        estimasiHarga: harga,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/products/${id}`, formData);
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
      console.error("Error updating data:", error);
    }
  };

  return (
    <div>
      <nav aria-label="breadcrumb pb-0">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/panen">Order Panen</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Update Order
          </li>
        </ol>
      </nav>

      <h2>
        <strong>Update Data</strong>
      </h2>
      <div className="card is-shadowless">
        <div className="card-content mb-4">
          <div className="content ps-4 pt-3">
            <form onSubmit={handleSubmit}>
              {msg && <p className="has-text-centered">{msg}</p>}

              {user.role === "admin" || user.role === "perusahaan" ? (
                <>
                  <div className="field mb-2">
                    <label className="label">Nama Logistik</label>
                    <div className="control">
                      <input
                        type="text"
                        name="namaLogistik"
                        value={formData.namaLogistik}
                        onChange={handleChange}
                        placeholder="Nama Logistik"
                      />
                    </div>
                  </div>
                  <div className="field mb-2">
                    <label className="label">No HP Logistik</label>
                    <div className="control">
                      <input
                        type="text"
                        name="noHpLogistik"
                        value={formData.noHpLogistik}
                        onChange={handleChange}
                        placeholder="No HP Logistik"
                      />
                    </div>
                  </div>
                  <div className="field mb-2">
                    <label className="label">Plat Nomor Logistik</label>
                    <div className="control">
                      <input
                        type="text"
                        name="platnoLogistik"
                        value={formData.platnoLogistik}
                        onChange={handleChange}
                        placeholder="Plat Nomor Logistik"
                      />
                    </div>
                  </div>
                  <div className="field mb-2">
                    <label className="label">Nama Perusahaan</label>
                    <div className="control">
                      <input
                        type="text"
                        name="namaPerusahaan"
                        value={formData.namaPerusahaan}
                        onChange={handleChange}
                        placeholder="Nama Perusahaan"
                      />
                    </div>
                  </div>
                  <div className="field mb-2">
                    <label className="label">No HP Perusahaan</label>
                    <div className="control">
                      <input
                        type="text"
                        name="noHpPerusahaan"
                        value={formData.noHpPerusahaan}
                        onChange={handleChange}
                        placeholder="Nomor HP Perusahaan"
                      />
                    </div>
                  </div>
                  
                  <div className="field mb-2">
                    <label className="label">Berat Singkong</label>
                    <div className="control">
                      <input
                        type="text"
                        name="beratSingkong"
                        value={formData.beratSingkong}
                        onChange={handleChange}
                        placeholder="Berat Singkong"
                      />
                    </div>
                  </div>
                  <div className="field mb-2">
                    <label className="label">Berat Batang</label>
                    <div className="control">
                      <input
                        type="text"
                        name="beratBatang"
                        value={formData.beratBatang}
                        onChange={handleChange}
                        placeholder="Berat Batang"
                      />
                    </div>
                  </div>
                  <div className="field mb-2">
                    <label className="label">Berat Daun</label>
                    <div className="control">
                      <input
                        type="text"
                        name="beratDaun"
                        value={formData.beratDaun}
                        onChange={handleChange}
                        placeholder="Berat Daun"
                      />
                    </div>
                  </div>
                  <div className="field mb-2">
                    <label className="label">Pilih Status Order</label>
                    <div className="control">
                      <div className="select">
                        <select
                          name="statusOrder"
                          value={formData.statusOrder}
                          onChange={handleChange}
                        >
                          <option value="">Pilih Status Order</option>
                          <option value="Menunggu Dipanen">
                            Menunggu Dipanen
                          </option>
                          <option value="Selesai Dipanen">
                            Selesai Dipanen
                          </option>
                          <option value="Menuju Pabrik">Menuju Pabrik</option>
                          <option value="Diproses Pabrik">
                            Diproses Pabrik
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </>
              ) : user.role === "petani" ? (
                <>
                  <div className="field mb-2">
                    <label className="label">Nama Logistik</label>
                    <div className="control">
                      <input
                        type="text"
                        name="namaLogistik"
                        value={formData.namaLogistik}
                        onChange={handleChange}
                        placeholder="Nama Logistik"
                      />
                    </div>
                  </div>
                  <div className="field mb-2">
                    <label className="label">No HP Logistik</label>
                    <div className="control">
                      <input
                        type="text"
                        name="noHpLogistik"
                        value={formData.noHpLogistik}
                        onChange={handleChange}
                        placeholder="No HP Logistik"
                      />
                    </div>
                  </div>
                  <div className="field mb-2">
                    <label className="label">Plat Nomor Logistik</label>
                    <div className="control">
                      <input
                        type="text"
                        name="platnoLogistik"
                        value={formData.platnoLogistik}
                        onChange={handleChange}
                        placeholder="Plat Nomor Logistik"
                      />
                    </div>
                  </div>
                  <div className="field mb-2">
                    <label className="label">Pilih Status Order</label>
                    <div className="control">
                      <div className="select">
                        <select
                          name="statusOrder"
                          value={formData.statusOrder}
                          onChange={handleChange}
                        >
                          <option value="">Pilih Status Order</option>
                          <option value="Selesai Dipanen">
                            Selesai Dipanen
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </>
              ) : user.role === "logistik" ? (
                <>
                  <div className="field mb-2">
                    <label className="label">Berat Singkong</label>
                    <div className="control">
                      <input
                        type="text"
                        name="beratSingkong"
                        value={formData.beratSingkong}
                        onChange={handleChange}
                        placeholder="Berat Singkong"
                      />
                    </div>
                  </div>
                  <div className="field mb-2">
                    <label className="label">Berat Batang</label>
                    <div className="control">
                      <input
                        type="text"
                        name="beratBatang"
                        value={formData.beratBatang}
                        onChange={handleChange}
                        placeholder="Berat Batang"
                      />
                    </div>
                  </div>
                  <div className="field mb-2">
                    <label className="label">Berat Daun</label>
                    <div className="control">
                      <input
                        type="text"
                        name="beratDaun"
                        value={formData.beratDaun}
                        onChange={handleChange}
                        placeholder="Berat Daun"
                      />
                    </div>
                  </div>
                </>
              ) : null}
              <div className="field">
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

export default FormUpdateOrder;
