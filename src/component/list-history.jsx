import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import "./component.css";

const ListHistoryProduk = () => {
  const { user } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getCompletedProducts();
  }, []);

  const getCompletedProducts = async () => {
    try {
      const response = await axios.get(`/api/order-history`, {
        params: {
          statusOrder: "selesai",
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching completed products:", error);
    }
  };

  return (
    <div>
      <h2 className="title">
        {" "}
        <strong>History Order Panen</strong>
      </h2>

      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Petani</th>
            <th>Varietas</th>
            <th>Nama Logistik</th>
            <th>Nama Pabrik</th>
            <th>Tanggal Panen</th>
            <th>Berat(kg)</th>
            <th>Harga Aktual</th>
            <th>Kode Blockchain</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.uuid}>
              <td>{index + 1}</td>
              <td>{product.user?.name || "No Name"}</td>
              <td>{product.varietasSingkong}</td>
              <td>{product.statusOrder}</td>
              <td>{product.tanggalPemanenan}</td>
              <td>{product.estimasiBerat}</td>
              <td>Rp. {product.estimasiHarga}</td>
              <td>{product.uuid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListHistoryProduk;
