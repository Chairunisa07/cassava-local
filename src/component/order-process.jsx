import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import "./component.css";

const OrderProcessButton = () => {
  const { role } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [statusOrder, setStatusOrder] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // Fungsi untuk menyetujui order
  const approveOrder = async () => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `/api/orders/${id}/approve`,
        { role }
      );
      setStatusOrder(response.data.statusOrder);
    } catch (error) {
      setMsg(error.response ? error.response.data.msg : error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk memulai keberangkatan
  const startDeparture = async () => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `/api/orders/${id}/start-departure`
      );
      setStatusOrder(response.data.statusOrder);
    } catch (error) {
      setMsg(error.response ? error.response.data.msg : error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk menyelesaikan keberangkatan
  const completeDeparture = async () => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `/api/${id}/complete-departure`
      );
      setStatusOrder(response.data.statusOrder);
    } catch (error) {
      setMsg(error.response ? error.response.data.msg : error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk memproses di pabrik
  const processAtFactory = async () => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `/api/orders/${id}/process-factory`
      );
      setStatusOrder(response.data.statusOrder);
    } catch (error) {
      setMsg(error.response ? error.response.data.msg : error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Lakukan pengambilan status order saat komponen dimuat
    const fetchOrderStatus = async () => {
      try {
        const response = await axios.get(
          `/api/orders/${id}`
        );
        setStatusOrder(response.data.statusOrder);
      } catch (error) {
        setMsg(error.response ? error.response.data.msg : error.message);
      }
    };
    fetchOrderStatus();
  }, [id]);

  return (
    <div>
      {statusOrder && (
        <div>
          {role === "perusahaan" && statusOrder === "menunggu persetujuan" && (
            <button onClick={approveOrder} disabled={loading} className="btn btn-info">
              {loading ? "Loading..." : "Setujui Order"} Aprrove Order
            </button>
          )}
          {role === "logistik" && statusOrder === "diproses perusahaan" && (
            <button onClick={startDeparture} disabled={loading}>
              {loading ? "Loading..." : "Mulai Keberangkatan"}
            </button>
          )}
          {role === "logistik" && statusOrder === "menuju pabrik" && (
            <button onClick={completeDeparture} disabled={loading}>
              {loading ? "Loading..." : "Selesaikan Keberangkatan"}
            </button>
          )}
          {role === "pabrik" && statusOrder === "diproses logistik" && (
            <button onClick={processAtFactory} disabled={loading}>
              {loading ? "Loading..." : "Proses di Pabrik"}
            </button>
          )}
          {msg && <p>{msg}</p>}
        </div>
      )}
    </div>
  );
};

export default OrderProcessButton;
