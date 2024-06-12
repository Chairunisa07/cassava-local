import React, { useEffect, useState } from "react";
import Layout from "../../page/layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import axios from "axios";

const PerusahaanAddHarga = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  const [tanggalupdateharga, setTanggalUpdateHarga] = useState("");
  const [hargaGradeA, sethargaGradeA] = useState("");
  const [hargaGradeB, sethargaGradeB] = useState("");
  const [hargaGradeC, sethargaGradeC] = useState("");
  const [catatan, setCatatan] = useState("");
  const [msg, setMsg] = useState("");

  const createPerusahaan = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`api/perusahaan`, {
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

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, user, navigate]);

  return (
    <Layout>
      <nav aria-label="breadcrumb pb-0">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/dashboard">Dashboard</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Update Harga Jual
          </li>
        </ol>
      </nav>

      <h2 className="title">
        <strong>Update Harga Jual</strong>
      </h2>
      <div className="card is-shadowless">
        <div className="card-content ps-4 mb-3">
          <div className="content">
            <form onSubmit={createPerusahaan}>
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
                        onChange={(e) => setTanggalUpdateHarga(e.target.value)}
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
                        onChange={(e) => sethargaGradeA(e.target.value)}
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
                        onChange={(e) => sethargaGradeB(e.target.value)}
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
                        onChange={(e) => sethargaGradeC(e.target.value)}
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
    </Layout>
  );
};

export default PerusahaanAddHarga;
