import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import "./component.css";
import { useParams, useNavigate } from "react-router-dom";

const ListProduk = () => {
  const { user } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);
  const [approvedProductId, setApprovedProductId] = useState(null);
  const { productId } = useParams();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get(`/api/products`);
    setProducts(response.data);
  };

  const handleApproveOrder = async (orderId) => {
    setApproveLoading(true);
    setApprovedProductId(orderId);
    try {
      const response = await axios.patch(
        `/api/orders/${orderId}/approve`,
        {
          role: user.role,
        }
      );
      console.log("Order disetujui:", response.data);
      setProducts(
        products.map((product) =>
          product.uuid === orderId
            ? { ...product, statusOrder: response.data.statusOrder }
            : product
        )
      );
    } finally {
      setApproveLoading(false);
      setApprovedProductId(null);
    }
  };

  const deleteProduct = async (productId) => {
    await axios.delete(`/api/products/${productId}`);
    getProducts();
  };

  const completeProcessing = async () => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `/api/orders/${productId}/complete`
      );
      setMsg(response.data.msg);
      navigate("/panen");
    } catch (error) {
      setMsg(error.response ? error.response.data.msg : error.message);
    } finally {
      setLoading(false);
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
            <th>Status Transaksi</th>
            <th>Kode Blockchain</th>
            <th className="text-center">Actions</th>
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
              <td>{formatRupiah(product.estimasiHarga)}</td>
              <td>{product.s}</td>
              <td>{product.uuid}</td>

              <td className="text-center">
                {user.role !== "pabrik" && (
                  <Link to={`/products/update/${product.uuid}`}>
                    <button
                      type="button"
                      className="btn btn-warning py-1 mb-1 button-tabel"
                    >
                      Update
                    </button>
                  </Link>
                )}
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
                  </div>
                )}

                {user && user.role === "admin" && (
                  <div>
                    <button
                      onClick={() => deleteProduct(product.uuid)}
                      class="btn btn-danger py-1 mb-1 button-tabel"
                    >
                      Delete
                    </button>
                  </div>
                )}

                {user && user.role === "pabrik" && (
                  <button
                    type="button"
                    class="btn btn-success py-1 mb-1 button-tabel"
                    onClick={handleApproveOrder}
                  >
                    Terima Order
                  </button>
                )}
                {user &&
                  (product.namaLogistik === null ||
                    product.namaLogistik === "") &&
                  user.role === "logistik" && (
                    <button
                      type="button"
                      class="btn btn-success py-1 mb-1 button-tabel"
                    >
                      Terima Order
                    </button>
                  )}

                {user && user.role === "perusahaan" && (
                  <button
                    type="button"
                    class="btn btn-success py-1 mb-1 button-tabel"
                    onClick={handleApproveOrder}
                  >
                    Terima Order
                  </button>
                )}

                {user && user.role === "perusahaan" && (
                  <div>
                    <Link to={`/orders/updateharga/${product.uuid}`}>
                      <button
                        type="button"
                        class="btn btn-info py-1 mb-1 button-tabel"
                      >
                        Selesai
                      </button>
                    </Link>
                  </div>
                )}

                {user && user.role === "pabrik" && (
                  <div>
                    
                      <button
                        type="button"
                        class="btn btn-info py-1 mb-1 button-tabel"
                        onClick={completeProcessing}
                        disabled={loading}
                      >
                        {loading ? "Loading..." : "Selesai"}
                      </button>
                    
                  </div>
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
