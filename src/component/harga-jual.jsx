import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import "./component.css";

const HargaJual = () => {
  const { user } = useSelector((state) => state.auth);
  const [perusahaan, setPerusahaan] = useState([]);

  useEffect(() => {
    getPerusahaan();
  }, []);

  const getPerusahaan = async () => {
    try {
      const response = await axios.get(`/api/perusahaan`);
      setPerusahaan(response.data);
    } catch (error) {
      console.error("Error fetching perusahaan data:", error);
    }
  };

  const deletePerusahaan = async (perusahaanId) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus perusahaan ini?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `/api/perusahaan/${perusahaanId}`,
        {
          headers: {
            // Sertakan token atau kredensial jika diperlukan oleh middleware verifyUser
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.status === 200) {
        getPerusahaan(); // Refresh data setelah penghapusan berhasil
      } else {
        console.error("Error deleting perusahaan:", response.data);
        alert(`Error: ${response.data.msg}`);
      }
    } catch (error) {
      console.error("Error deleting perusahaan:", error);
      alert(
        `Error: ${error.response ? error.response.data.msg : error.message}`
      );
    }
  };
  const formatRupiah = (harga) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    return formatter.format(harga);
  };

  const parseCatatan = (catatan) => {
    const notes = {};
    const lines = catatan.split("\r\n");
    lines.forEach((line) => {
      const [grade, description] = line.split(" = ");
      if (grade && description) {
        notes[grade.trim()] = description.trim();
      }
    });
    return notes;
  };

  return (
    <div>
      <h2 className="title mt-6">
        <strong>Harga Jual</strong>
      </h2>
      {user && user.role === "perusahaan" && (
        <Link to="/update-harga" className="btn btn-primary mb-2">
          Update Harga Jual
        </Link>
      )}
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th className="text-center">Tanggal Update Harga</th>
            <th className="text-center">Harga Grade A</th>
            <th className="text-center">Keterangan Grade A</th>
            <th className="text-center">Harga Grade B</th>
            <th className="text-center">Keterangan Grade B</th>
            <th className="text-center">Harga Grade C</th>
            <th className="text-center">Keterangan Grade C</th>
            {user && user.role === "perusahaan" && (
              <th className="text-center">Action</th>
            )}
          </tr>
        </thead>
        <tbody>
          {perusahaan.map((perusahaan, index) => (
            <tr key={perusahaan.uuid}>
              <td>{index + 1}</td>
              <td>{perusahaan.tanggalupdateharga}</td>
              <td>{formatRupiah(perusahaan.hargaGradeA)}</td>
              <td>{parseCatatan(perusahaan.catatan)["Grade A"]}</td>
              <td>{formatRupiah(perusahaan.hargaGradeB)}</td>
              <td>{parseCatatan(perusahaan.catatan)["Grade B"]}</td>
              <td>{formatRupiah(perusahaan.hargaGradeC)}</td>
              <td>{parseCatatan(perusahaan.catatan)["Grade C"]}</td>
              {user && user.role === "perusahaan" && (
                <td class="text-center">
                  <Link to={`/perusahaan-edit/${perusahaan.uuid}`}>
                    <button
                      type="button"
                      className="btn btn-info py-1 mb-1 button-tabel"
                    >
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => deletePerusahaan(perusahaan.Id)}
                    className="btn btn-danger py-1 mb-1 button-tabel"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HargaJual;
