import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../layout";
import { useNavigate, useParams } from "react-router-dom";

const PerusahaanEditHarga = () => {
  const [tanggalupdateharga, setTanggalUpdateHarga] = useState("");
  const [hargaGradeA, setHargaGradeA] = useState("");
  const [hargaGradeB, setHargaGradeB] = useState("");
  const [hargaGradeC, setHargaGradeC] = useState("");
  const [catatan, setCatatan] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getPerusahaanById = async () => {
      try {
        const response = await axios.get(
          `/api/perusahaan/${id}`
        );
        const perusahaanData = response.data;
        setTanggalUpdateHarga(perusahaanData.tanggalupdateharga);
        setHargaGradeA(perusahaanData.hargaGradeA);
        setHargaGradeB(perusahaanData.hargaGradeB);
        setHargaGradeC(perusahaanData.hargaGradeC);
        setCatatan(perusahaanData.catatan);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getPerusahaanById();
  }, [id]);

  const updatePerusahaan = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/perusahaan/${id}`, {
        tanggalupdateharga,
        hargaGradeA,
        hargaGradeB,
        hargaGradeC,
        catatan,
      });
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <Layout>
      <div>
        <nav aria-label="breadcrumb pb-0">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/dashboard">Dashboard</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Harga Jual
            </li>
          </ol>
        </nav>

        <h2 className="title">
          <strong>Edit Harga Jual</strong>
        </h2>
        <div className="card is-shadowless">
          <div className="card-content ps-4 mb-3">
            <div className="content">
              <form onSubmit={updatePerusahaan}>
                <p className="has-text-centered">{msg}</p>

                <div className="add-lahan">
                  <div className="column lahan">
                    <div className="field mb-2">
                      <label className="label">Tanggal Update Harga</label>
                      <div className="control">
                        <input
                          type="date"
                          className="input"
                          value={tanggalupdateharga}
                          onChange={(e) =>
                            setTanggalUpdateHarga(e.target.value)
                          }
                          placeholder="Tanggal Update Harga"
                        />
                      </div>
                    </div>

                    <div className="field mb-2">
                      <label className="label">Harga Grade A</label>
                      <div className="control">
                        <input
                          type="number"
                          className="input"
                          value={hargaGradeA}
                          onChange={(e) => setHargaGradeA(e.target.value)}
                          placeholder="Harga Grade A"
                        />
                      </div>
                    </div>

                    <div className="field mb-2">
                      <label className="label">Harga Grade B</label>
                      <div className="control">
                        <input
                          type="number"
                          className="input"
                          value={hargaGradeB}
                          onChange={(e) => setHargaGradeB(e.target.value)}
                          placeholder="Harga Grade B"
                        />
                      </div>
                    </div>

                    <div className="field mb-2">
                      <label className="label">Harga Grade C</label>
                      <div className="control">
                        <input
                          type="number"
                          className="input"
                          value={hargaGradeC}
                          onChange={(e) => setHargaGradeC(e.target.value)}
                          placeholder="Harga Grade C"
                        />
                      </div>
                    </div>
                    <div className="field mb-2">
                      <label className="label">Catatan </label>
                      <div className="control">
                        <input
                          type="text"
                          className="input"
                          value={catatan}
                          onChange={(e) => setCatatan(e.target.value)}
                          placeholder="Catatan (Jenis varietas dari tiap grade)"
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
      </div>
    </Layout>
  );
};

export default PerusahaanEditHarga;
