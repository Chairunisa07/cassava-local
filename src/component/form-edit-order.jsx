import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditOrder = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/${id}`
        );
        setName(response.data.name);
        setPrice(response.data.price);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getProductById();
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/products/${id}`, {
        name: name,
        price: price,
      });
      navigate("/products");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
        <nav aria-label="breadcrumb pb-0">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/panen" >Order Panen</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Edit Order
          </li>
        </ol>
      </nav>

      <h2 className="title"> <strong>Edit Order</strong></h2>
      <div className="card is-shadowless ">
        <div className="card-content mb-4">
          <div className="content ps-4">
            <form onSubmit={updateProduct}>
              <p className="has-text-centered">{msg}</p>
              <div className="field mb-2">
                <label className="label">Nama</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama Produk"
                  />
                </div>
              </div>
              <div className="field mb-2">
                <label className="label">Harga</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Harga"
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button type="submit" class="btn btn-success">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditOrder;
