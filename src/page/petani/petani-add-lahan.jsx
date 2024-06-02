import React, { useEffect, useState } from "react";
import Layout from "../../page/layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import axios from "axios";

const PetaniAddLahan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  // States for each field
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
  const [hargajual, setHargaJual] = useState("");
  const [totalpendapatan, setTotalPendapatan] = useState("");
  const [pendapatanbersih, setPendapatanBersih] = useState("");
  const [catatantambahan, setCatatanTambahan] = useState("");
  const [msg, setMsg] = useState("");

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/petani", {
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
        hargajual,
        totalpendapatan,
        pendapatanbersih,
        catatantambahan,
      });
      navigate("/datalahan");
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
            Add Data Lahan
          </li>
        </ol>
      </nav>

      <h2 className="title">
        <strong>Add Data Lahan</strong>
      </h2>
      <div className="card is-shadowless">
        <div className="card-content ps-4 mb-3">
          <div className="content">
            <form onSubmit={saveProduct}>
              <p className="has-text-centered">{msg}</p>

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

                  <div className="field mb-2">
                    <label className="label">Varietas/Jenis Singkong</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={varietassingkong}
                        onChange={(e) => setVarietasSingkong(e.target.value)}
                        placeholder="Varietas Singkong"
                      />
                    </div>
                  </div>

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
                </div>

                <div className="column">
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

                  <div className="field mb-2">
                    <label className="label">Jenis Pupuk</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={jenispupuk}
                        onChange={(e) => setJenisPupuk(e.target.value)}
                        placeholder="Jenis Pupuk yang digunakan"
                      />
                    </div>
                  </div>

                  <div className="field mb-2">
                    <label className="label">Jumlah Pupuk</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={jumlahpupuk}
                        onChange={(e) => setJumlahPupuk(e.target.value)}
                        placeholder="Jumlah Pupuk yang digunakan"
                      />
                    </div>
                  </div>

                  <div className="field mb-2">
                    <label className="label">Harga Jual</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={hargajual}
                        onChange={(e) => setHargaJual(e.target.value)}
                        placeholder="Harga Jual"
                      />
                    </div>
                  </div>

                  <div className="field mb-2">
                    <label className="label">Total Pendapatan</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={totalpendapatan}
                        onChange={(e) => setTotalPendapatan(e.target.value)}
                        placeholder="Total Pendapatan"
                      />
                    </div>
                  </div>

                  <div className="field mb-2">
                    <label className="label">Pendapatan Bersih</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={pendapatanbersih}
                        onChange={(e) => setPendapatanBersih(e.target.value)}
                        placeholder="Pendapatan Bersih"
                      />
                    </div>
                  </div>

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

              <div className="field mt-2">
                <div className="control">
                  <button
                    type="submit"
                    className="btn btn-success button-detail"
                  >
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

export default PetaniAddLahan;
