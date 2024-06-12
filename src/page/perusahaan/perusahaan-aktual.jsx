import React, { useState } from "react";
import Layout from "../layout";
import axios from "axios";

const UpdateHargaAktual = () => {
  const [productId, setProductId] = useState("");
  const [hargaAktual, setHargaAktual] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const updatePriceAndDisplayWeight = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `/api/update-price-and-display-weight`,
        {
          productId,
          hargaAktual,
        }
      );
      setMsg(response.data.msg);
    } catch (error) {
      setMsg(error.response ? error.response.data.msg : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div>
        <nav aria-label="breadcrumb pb-0">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/panen">Order Panen</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Update Harga Aktual
            </li>
          </ol>
        </nav>

        <h2>
          <strong>Update Harga Aktual</strong>
        </h2>
        <div className="card is-shadowless">
          <div className="card-content ps-4 mb-3">
            <div className="content">
              <form onSubmit={updatePriceAndDisplayWeight}>
                {msg && <p className="text-center">{msg}</p>}
                <div className="field mb-2 mt-3">
                  <label className="label">Product ID:</label>
                  <div className="control">
                  <input
                    type="text"
                    id="productId"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                  />
                  </div>
                  
                </div>
                <div className="field mb-2">
                  <label className="label">Harga Aktual:</label>
                  <div className="control">
                  <input
                    type="text"
                    id="hargaAktual"
                    value={hargaAktual}
                    onChange={(e) => setHargaAktual(e.target.value)}
                  />
                </div>
                  </div>
                  
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-success button-detail mt-3 mb-3"
                >
                  {loading ? "Loading..." : "Submit"} 
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateHargaAktual;
