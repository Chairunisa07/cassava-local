import React, { useEffect, useState } from "react";
import Layout from "../../page/layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import axios from "axios";

const LogistikListAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  // States for each field in the logistik data form
  const [tanggalWaktuPengiriman, setTanggalWaktuPengiriman] = useState("");
  const [asal, setAsal] = useState("");
  const [tujuan, setTujuan] = useState("");
  const [estimasiWaktuTiba, setEstimasiWaktuTiba] = useState("");
  const [nomorPolisiKendaraan, setNomorPolisiKendaraan] = useState("");
  const [jenisKendaraan, setJenisKendaraan] = useState("");
  const [kapasitasAngkut, setKapasitasAngkut] = useState(0);
  const [biayaTransportasi, setBiayaTransportasi] = useState(0);
  const [catatanEfisiensiRute, setCatatanEfisiensiRute] = useState("");
  const [kondisiPengiriman, setKondisiPengiriman] = useState("");
  const [catatanDariPenerima, setCatatanDariPenerima] = useState("");
  const [msg, setMsg] = useState("");

  const saveLogistik = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/logistik", {
        tanggalWaktuPengiriman,
        asal,
        tujuan,
        estimasiWaktuTiba,
        nomorPolisiKendaraan,
        jenisKendaraan,
        kapasitasAngkut,
        biayaTransportasi,
        catatanEfisiensiRute,
        kondisiPengiriman,
        catatanDariPenerima,
      });
      navigate("/data-logistik"); // Adjust this as needed
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user && user.role !== "admin" && user.role !== "logistik") {
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);

  return (
    <Layout>
      <nav aria-label="breadcrumb pb-0">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/data-logistik">Data Logistik</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Add Data Logistik
          </li>
        </ol>
      </nav>

      <h2 className="title">
        <strong>Add Data Logistik</strong>
      </h2>
      <div className="card is-shadowless">
        <div className="card-content ps-4 mb-3">
          <div className="content">
            <form onSubmit={saveLogistik}>
              <p className="has-text-centered">{msg}</p>

              <div className="add-logistik">
                <div className="column logistik">
                  <div className="field mb-2">
                    <label className="label">Tanggal Waktu Pengiriman</label>
                    <div className="control">
                      <input
                        type="datetime-local"
                        className="input"
                        value={tanggalWaktuPengiriman}
                        onChange={(e) =>
                          setTanggalWaktuPengiriman(e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="field mb-2">
                    <label className="label">Asal</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={asal}
                        onChange={(e) => setAsal(e.target.value)}
                        placeholder="Asal"
                      />
                    </div>
                  </div>

                  <div className="field mb-2">
                    <label className="label">Tujuan</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={tujuan}
                        onChange={(e) => setTujuan(e.target.value)}
                        placeholder="Tujuan"
                      />
                    </div>
                  </div>

                  <div className="field mb-2">
                    <label className="label">Estimasi Waktu Tiba</label>
                    <div className="control">
                      <input
                        type="datetime-local"
                        className="input"
                        value={estimasiWaktuTiba}
                        onChange={(e) => setEstimasiWaktuTiba(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="field mb-2">
                    <label className="label">Nomor Polisi Kendaraan</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={nomorPolisiKendaraan}
                        onChange={(e) =>
                          setNomorPolisiKendaraan(e.target.value)
                        }
                        placeholder="Nomor Polisi Kendaraan"
                      />
                    </div>
                  </div>

                  <div className="field mb-2">
                    <label className="label">Jenis Kendaraan</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={jenisKendaraan}
                        onChange={(e) => setJenisKendaraan(e.target.value)}
                        placeholder="Jenis Kendaraan"
                      />
                    </div>
                  </div>
                </div>


                <div className="column logistik">
                  <div className="field mb-2">
                    <label className="label">Kapasitas Angkut (kg)</label>
                    <div className="control">
                      <input
                        type="number"
                        className="input"
                        value={kapasitasAngkut}
                        onChange={(e) => setKapasitasAngkut(e.target.value)}
                        placeholder="Kapasitas Angkut"
                      />
                    </div>
                  </div>

                  <div className="field mb-2">
                    <label className="label">Biaya Transportasi (Rp)</label>
                    <div className="control">
                      <input
                        type="number"
                        className="input"
                        value={biayaTransportasi}
                        onChange={(e) => setBiayaTransportasi(e.target.value)}
                        placeholder="Biaya Transportasi"
                      />
                    </div>
                  </div>

                  <div className="field mb-2">
                    <label className="label">Catatan Efisiensi Rute</label>
                    <div className="control">
                      <textarea
                        className="textarea"
                        value={catatanEfisiensiRute}
                        onChange={(e) =>
                          setCatatanEfisiensiRute(e.target.value)
                        }
                        placeholder="Catatan Efisiensi Rute"
                      ></textarea>
                    </div>
                  </div>

                  <div className="field mb-2">
                    <label className="label">Kondisi Pengiriman</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={kondisiPengiriman}
                        onChange={(e) => setKondisiPengiriman(e.target.value)}
                        placeholder="Kondisi Pengiriman"
                      />
                    </div>
                  </div>

                  <div className="field mb-2">
                    <label className="label">Catatan Dari Penerima</label>
                    <div className="control">
                      <textarea
                        className="textarea"
                        value={catatanDariPenerima}
                        onChange={(e) => setCatatanDariPenerima(e.target.value)}
                        placeholder="Catatan Dari Penerima"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <div className="field mt-3">
                <div className="control">
                  <button type="submit" className="btn btn-success button-detail">
                    Save
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LogistikListAdd;
