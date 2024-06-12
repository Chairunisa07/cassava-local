import React, { useEffect, useState } from "react";
import Layout from "../../page/layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import axios from "axios";

const LogistikListEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { isError, user } = useSelector((state) => state.auth);

  // States untuk setiap field data logistik
  const [tanggalWaktuPengiriman, setTanggalWaktuPengiriman] = useState("");
  const [asal, setAsal] = useState("");
  const [tujuan, setTujuan] = useState("");
  const [estimasiWaktuTiba, setEstimasiWaktuTiba] = useState("");
  const [nomorPolisiKendaraan, setNomorPolisiKendaraan] = useState("");
  const [jenisKendaraan, setJenisKendaraan] = useState("");
  const [kapasitasAngkut, setKapasitasAngkut] = useState("");
  const [biayaTransportasi, setBiayaTransportasi] = useState("");
  const [catatanEfisiensiRute, setCatatanEfisiensiRute] = useState("");
  const [kondisiPengiriman, setKondisiPengiriman] = useState("");
  const [catatanDariPenerima, setCatatanDariPenerima] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchLogistikData = async () => {
      try {
        const response = await axios.get(
          `/api/logistik/${id}`
        );
        const data = response.data;
        setTanggalWaktuPengiriman(data.tanggalWaktuPengiriman.split(".")[0]);
        setAsal(data.asal);
        setTujuan(data.tujuan);
        setEstimasiWaktuTiba(data.estimasiWaktuTiba.split(".")[0]);
        setNomorPolisiKendaraan(data.nomorPolisiKendaraan);
        setJenisKendaraan(data.jenisKendaraan);
        setKapasitasAngkut(data.kapasitasAngkut.toString());
        setBiayaTransportasi(data.biayaTransportasi.toString());
        setCatatanEfisiensiRute(data.catatanEfisiensiRute);
        setKondisiPengiriman(data.kondisiPengiriman);
        setCatatanDariPenerima(data.catatanDariPenerima);
      } catch (error) {
        setMsg(
          error?.response?.data?.msg || "Terjadi kesalahan saat mengambil data"
        );
      }
    };

    fetchLogistikData();
  }, [id]);

  const updateLogistikData = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/logistik/${id}`, {
        tanggalWaktuPengiriman,
        asal,
        tujuan,
        estimasiWaktuTiba,
        nomorPolisiKendaraan,
        jenisKendaraan,
        kapasitasAngkut: Number(kapasitasAngkut),
        biayaTransportasi: Number(biayaTransportasi),
        catatanEfisiensiRute,
        kondisiPengiriman,
        catatanDariPenerima,
      });
      navigate("/data-logistik"); // Sesuaikan sesuai dengan route yang diinginkan
    } catch (error) {
      setMsg(
        error?.response?.data?.msg || "Terjadi kesalahan saat memperbarui data"
      );
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
            Edit Data Logistik
          </li>
        </ol>
      </nav>

      <h2 className="title">
        {" "}
        <strong>Edit Data Logistik</strong>
      </h2>
      <div className="card is-shadowless">
        <div className="card-content ps-4 mb-3">
          <div className="content">
            <form onSubmit={updateLogistikData}>
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
                    Update
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

export default LogistikListEdit;
