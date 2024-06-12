import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";
import axios from 'axios';
import "./login.css";

const Traceability = () => {
  const [searchId, setSearchId] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/search/${searchId}`);
      setResult(response.data);
      setError(null);
    } catch (err) {
      setResult(null);
      setError(err.response?.data?.msg || "Error saat mencari data");
    }
  };

  return (
    <div className="content">
      <section id="header">
        <div className="header-well py-3">
          <img
            src={logo}
            alt="Logo"
            width={35}
            height={40}
            className="d-inline-block align-item-center"
          />
          <strong style={{ paddingLeft: "20px" }}>Cassava Super</strong>
        </div>
      </section>

      <section id="form">
        <div className="form">
          <div className="text">
            <p className="fs-2 pt-3">
              <strong>Traceability</strong>
            </p>
          </div>

          <form onSubmit={handleSearch} className="box">
            <div className="mb-3">
              <label htmlFor="InputID" className="form-label">
                Input Order ID
              </label>
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Masukkan UUID produk"
                className="form-control"
                id="InputID"
              />
            </div>
            <div className="form-group pt-3 pb-3">
              <button type="submit" className="btn btn-submit">Search</button>
            </div>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
          </form>
        </div>
      </section>

      {/* Section baru untuk tabel hasil pencarian */}
      <section id="result-section">
        <div className="result">
          {result && (
            <div className="table-container">
              <p className="fs-2 pt-3 text-center">
              <strong>Hasil Pencarian</strong>
            </p>
              <div className="table-scroll">
                <table className="table is-striped is-fullwidth">
                  <thead>
                    <tr>
                      <th>No</th>
                      {Object.keys(result).map((key) => (
                        <th key={key}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      {Object.values(result).map((value, index) => (
                        <td key={index}>{value}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      <Link to="/" className="back">
        Back To Home
      </Link>
    </div>
  );
};

export default Traceability;
