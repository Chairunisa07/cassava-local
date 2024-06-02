import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import "./component.css";

const ListProduk = () => {
  const { user } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
  };

  const deleteProduct = async (productId) => {
    await axios.delete(`http://localhost:5000/products/${productId}`);
    getProducts(); // Refresh the products list after deletion
  };

  return (
    <div>
      <h2 className="title">
        {" "}
        <strong>Order Panen</strong>
      </h2>
      {user && (user.role === "petani" || user.role === "admin") && (
        <Link to="/panen/add">
          <button type="button" class="btn btn-primary mb-2">
            Add Order Panen
          </button>
        </Link>
      )}

      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama petani</th>
            <th>Varietas</th>
            <th>Status Order</th>
            <th>Tanggal Panen</th>
            <th>Estimasi Berat(kg)</th>
            <th>Harga</th>
            <th>Kode Blockchain</th>
            {user &&
              (user.role === "pabrik" ||
                user.role === "admin" ||
                user.role === "logistik") && (
                <th className="text-center">Actions</th>
              )}
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

              <td className="text-center">
                {user && user.role === "admin" && (
                  <div>
                    <Link to={`/panen/edit/${product.uuid}`}>
                      <button
                        type="button"
                        class="btn btn-info py-1 mb-1 button-tabel"
                      >
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteProduct(product.uuid)}
                      class="btn btn-danger py-1 mb-1 button-tabel"
                    >
                      Delete
                    </button>
                  </div>
                )}
                {user &&
                  (product.namaPerusahaan === null ||
                    product.namaPerusahaan === "") &&
                  user.role === "pabrik" && (
                    <Link to={`/panen/acc/${product.uuid}`}>
                      <button
                        type="button"
                        class="btn btn-success py-1 mb-1 button-tabel"
                      >
                        Terima Order
                      </button>
                    </Link>
                  )}
                {user &&
                  (product.namaLogistik === null ||
                    product.namaLogistik === "") &&
                  user.role === "logistik" && (
                    <Link to={`/panen/acc/${product.uuid}`}>
                      <button
                        type="button"
                        class="btn btn-success py-1 mb-1 button-tabel"
                      >
                        Terima Order
                      </button>
                    </Link>
                  )}
                {user && user.role === "admin" && (
                  <Link to={`/panen/acc/${product.uuid}`}>
                    <button
                      type="button"
                      class="btn btn-success py-1 mb-1 button-tabel"
                    >
                      Terima Order
                    </button>
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListProduk;
