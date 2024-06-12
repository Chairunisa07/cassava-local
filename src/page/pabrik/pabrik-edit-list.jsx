import React, { useEffect, useState } from "react";
import Layout from "../../page/layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import axios from "axios";

const PabrikEditList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { isError, user } = useSelector((state) => state.auth);

    const [tanggalPenerimaan, setTanggalPenerimaan] = useState("");
    const [beratTotalDiterima, setBeratTotalDiterima] = useState("");
    const [evaluasiKualitas, setEvaluasiKualitas] = useState("");
    const [catatanKualitas, setCatatanKualitas] = useState("");
    const [kapasitasProduksi, setKapasitasProduksi] = useState("");
    const [produksiHarianTapioka, setProduksiHarianTapioka] = useState("");
    const [kualitasOutput, setKualitasOutput] = useState("");
    const [permasalahanOperasional, setPermasalahanOperasional] = useState("");
    const [kebutuhanPerbaikan, setKebutuhanPerbaikan] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        const fetchPabrikData = async () => {
            try {
                const response = await axios.get(`/api/pabrik/${id}`);
                const data = response.data;
                setTanggalPenerimaan(data.tanggalPenerimaan);
                setBeratTotalDiterima(data.beratTotalDiterima.toString());
                setEvaluasiKualitas(data.evaluasiKualitas);
                setCatatanKualitas(data.catatanKualitas);
                setKapasitasProduksi(data.kapasitasProduksi.toString());
                setProduksiHarianTapioka(data.produksiHarianTapioka.toString());
                setKualitasOutput(data.kualitasOutput);
                setPermasalahanOperasional(data.permasalahanOperasional);
                setKebutuhanPerbaikan(data.kebutuhanPerbaikan);
            } catch (error) {
                setMsg(error?.response?.data?.msg || "Terjadi kesalahan saat mengambil data");
            }
        };

        fetchPabrikData();
    }, [id]);

    const updatePabrikData = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/pabrik/${id}`, {
                tanggalPenerimaan,
                beratTotalDiterima: parseInt(beratTotalDiterima),
                evaluasiKualitas,
                catatanKualitas,
                kapasitasProduksi: parseInt(kapasitasProduksi),
                produksiHarianTapioka: parseInt(produksiHarianTapioka),
                kualitasOutput,
                permasalahanOperasional,
                kebutuhanPerbaikan,
            });
            navigate("/data-pabrik");
        } catch (error) {
            setMsg(error?.response?.data?.msg || "Terjadi kesalahan saat memperbarui data");
        }
    };

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate("/");
        }
        if (user && (user.role !== "admin" && user.role !== "pabrik")) {
            navigate("/dashboard");
        }
    }, [isError, user, navigate]);

    return (
        <Layout>
            <nav aria-label="breadcrumb pb-0">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/data-pabrik">Data Pabrik</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Edit Data Pabrik
          </li>
        </ol>
      </nav>

            <h2 className="title"><strong>Edit Data Pabrik</strong></h2>
            <div className="card is-shadowless">
                <div className="card-content ps-4 mb-3">
                    <div className="content">
                        <form onSubmit={updatePabrikData}>
                            <p className="has-text-centered">{msg}</p>
                            
                            <div className="field mb-2">
                                <label className="label">Tanggal Penerimaan</label>
                                <div className="control">
                                    <input
                                        type="date"
                                        className="input"
                                        value={tanggalPenerimaan}
                                        onChange={(e) => setTanggalPenerimaan(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="field mb-2">
                                <label className="label">Berat Total Diterima</label>
                                <div className="control">
                                    <input
                                        type="number"
                                        className="input"
                                        value={beratTotalDiterima}
                                        onChange={(e) => setBeratTotalDiterima(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="field mb-2">
                                <label className="label">Evaluasi Kualitas</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={evaluasiKualitas}
                                        onChange={(e) => setEvaluasiKualitas(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="field mb-2">
                                <label className="label">Catatan Kualitas</label>
                                <div className="control">
                                    <textarea
                                        className="textarea"
                                        value={catatanKualitas}
                                        onChange={(e) => setCatatanKualitas(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>

                            <div className="field mb-2">
                                <label className="label">Kapasitas Produksi</label>
                                <div className="control">
                                    <input
                                        type="number"
                                        className="input"
                                        value={kapasitasProduksi}
                                        onChange={(e) => setKapasitasProduksi(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="field mb-2">
                                <label className="label">Produksi Harian Tapioka</label>
                                <div className="control">
                                    <input
                                        type="number"
                                        className="input"
                                        value={produksiHarianTapioka}
                                        onChange={(e) => setProduksiHarianTapioka(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="field mb-2">
                                <label className="label">Kualitas Output</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={kualitasOutput}
                                        onChange={(e) => setKualitasOutput(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="field mb-2">
                                <label className="label">Permasalahan Operasional</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={permasalahanOperasional}
                                        onChange={(e) => setPermasalahanOperasional(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="field mb-2">
                                <label className="label">Kebutuhan Perbaikan</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={kebutuhanPerbaikan}
                                        onChange={(e) => setKebutuhanPerbaikan(e.target.value)}
                                    />
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

export default PabrikEditList;
