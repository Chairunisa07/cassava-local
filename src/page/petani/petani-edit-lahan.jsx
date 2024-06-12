import React, { useEffect, useState } from "react";
import Layout from "../../page/layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import "../../component/component.css";
import axios from "axios";

const PetaniEditLahan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Mendapatkan ID dari URL
  const { isError, user } = useSelector((state) => state.auth);

  // States untuk setiap field
  const [lokasilahan, setLokasiLahan] = useState("");
  const [luaslahan, setLuasLahan] = useState("");
  const [statuskepemilikanlahan, setStatusKepemilikanLahan] = useState("");
  const [periodeTanamMulai, setPeriodeTanamMulai] = useState("");
  const [periodeTanamSelesai, setPeriodeTanamSelesai] = useState("");
  const [varietassingkong, setVarietasSingkong] = useState("");
  const [estimasiproduksi, setEstimasiProduksi] = useState("");
  const [produksiaktual, setProduksiAktual] = useState("");
  const [jenispupuk, setJenisPupuk] = useState("");
  const [jumlahpupuk, setJumlahPupuk] = useState("");
  const [catatantambahan, setCatatanTambahan] = useState("");
  const [msg, setMsg] = useState("");

  // Fungsi untuk mengambil data lahan dari server
  useEffect(() => {
    const fetchDataLahan = async () => {
      try {
        const response = await axios.get(`/api/petani/${id}`);
        const data = response.data;
        setLokasiLahan(data.lokasilahan);
        setLuasLahan(data.luaslahan);
        setStatusKepemilikanLahan(data.statuskepemilikanlahan);
        setPeriodeTanamMulai(data.periodeTanamMulai);
        setPeriodeTanamSelesai(data.periodeTanamSelesai);
        setVarietasSingkong(data.varietassingkong);
        setEstimasiProduksi(data.estimasiproduksi);
        setProduksiAktual(data.produksiaktual);
        setJenisPupuk(data.jenispupuk);
        setJumlahPupuk(data.jumlahpupuk);
        setCatatanTambahan(data.catatantambahan);
      } catch (error) {
        setMsg(
          error?.response?.data?.msg || "Terjadi kesalahan saat mengambil data"
        );
      }
    };

    fetchDataLahan();
  }, [id]);

  // Fungsi untuk menyimpan perubahan data ke server
  const updateDataLahan = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/petani/${id}`, {
        lokasilahan,
        luaslahan,
        statuskepemilikanlahan,
        periodeTanamMulai,
        periodeTanamSelesai,
        varietassingkong,
        estimasiproduksi,
        produksiaktual,
        jenispupuk,
        jumlahpupuk,
        catatantambahan,
      });
      navigate("/datalahan");
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
    if (user && user.role !== "admin" && user.role !== "petani") {
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);

  return (
    <Layout>
      <nav aria-label="breadcrumb pb-0">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/datalahan">Data Lahan</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Edit Data Lahan
          </li>
        </ol>
      </nav>

      <h2 className="title">
        <strong>Edit Data Lahan</strong>
      </h2>
      <div className="card is-shadowless ">
        <div className="card-content ps-4 mb-3">
          <div className="content">
            <form onSubmit={updateDataLahan}>
              <p className="has-text-centered">{msg}</p>
              {/* Lokasi Lahan */}

              <div className="add-lahan">
                <div className="column lahan">
                  <div className="field mb-2">
                    <label className="label">Lokasi Lahan</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={lokasilahan}
                        onChange={(e) => setLokasiLahan(e.target.value)}
                        placeholder="Lokasi Lahan"
                      />
                    </div>
                  </div>
                  {/* Luas Lahan */}
                  <div className="field mb-2">
                    <label className="label">Luas Lahan</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={luaslahan}
                        onChange={(e) => setLuasLahan(e.target.value)}
                        placeholder="Luas Lahan"
                      />
                    </div>
                  </div>
                  {/* Status Kepemilikan Lahan */}
                  <div className="field mb-2">
                    <label className="label">Status Kepemilikan Lahan</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={statuskepemilikanlahan}
                        onChange={(e) =>
                          setStatusKepemilikanLahan(e.target.value)
                        }
                        placeholder="Status Kepemilikan Lahan"
                      />
                    </div>
                  </div>
                  {/* Periode Tanam Mulai */}
                  <div className="field mb-2">
                    <label className="label">Periode Tanam Mulai</label>
                    <div className="control">
                      <input
                        type="date"
                        className="input"
                        value={periodeTanamMulai}
                        onChange={(e) => setPeriodeTanamMulai(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* Periode Tanam Selesai */}
                  <div className="field mb-2">
                    <label className="label">Periode Tanam Selesai</label>
                    <div className="control">
                      <input
                        type="date"
                        className="input"
                        value={periodeTanamSelesai}
                        onChange={(e) => setPeriodeTanamSelesai(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* Varietas/Jenis Singkong */}
                  <div className="field mb-2">
                    <label className="label">Varietas/Jenis Singkong</label>
                    <div className="control">
                      <div className="select">
                        <select
                          value={varietassingkong}
                          onChange={(e) => setVarietasSingkong(e.target.value)}
                        >
                          <option value="">Pilih Grade Singkong</option>
                          <option value="A">Grade A</option>
                          <option value="B">Grade B</option>
                          <option value="C">Grade C</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="column">
                  {/* Estimasi Produksi */}
                  <div className="field mb-2">
                    <label className="label">Estimasi Produksi</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={estimasiproduksi}
                        onChange={(e) => setEstimasiProduksi(e.target.value)}
                        placeholder="Estimasi Produksi"
                      />
                    </div>
                  </div>
                  {/* Produksi Aktual */}
                  <div className="field mb-2">
                    <label className="label">Produksi Aktual</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={produksiaktual}
                        onChange={(e) => setProduksiAktual(e.target.value)}
                        placeholder="Produksi Aktual"
                      />
                    </div>
                  </div>
                  {/* Jenis Pupuk */}
                  <div className="field mb-2">
                    <label className="label">Jenis Pupuk</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={jenispupuk}
                        onChange={(e) => setJenisPupuk(e.target.value)}
                        placeholder="Jenis Pupuk"
                      />
                    </div>
                  </div>
                  {/* Jumlah Pupuk */}
                  <div className="field mb-2">
                    <label className="label">Jumlah Pupuk</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={jumlahpupuk}
                        onChange={(e) => setJumlahPupuk(e.target.value)}
                        placeholder="Jumlah Pupuk"
                      />
                    </div>
                  </div>
                  {/* Catatan Tambahan */}
                  <div className="field mb-2">
                    <label className="label">Catatan Tambahan</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={catatantambahan}
                        onChange={(e) => setCatatanTambahan(e.target.value)}
                        placeholder="Catatan Tambahan"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="field mt-3">
                <div className="control">
                  <button
                    type="submit"
                    className="btn btn-success button-detail"
                  >
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

export default PetaniEditLahan;
