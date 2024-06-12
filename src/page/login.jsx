import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";
import logo from "../logo.png";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
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
              <strong>Selamat Datang</strong>
            </p>
          </div>
          <form onSubmit={Auth} className="box">
            {isError && <p className="has-text-centered">{message}</p>}
            <div className="mb-3">
              <label htmlFor="InputEmail1" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="InputEmail1"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="InputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="InputPassword1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group pt-3 pb-3">
              <button type="submit" className="button is-success is-fullwidth">
                {isLoading ? "Loading..." : "Login"}
              </button>
              <div style={{ marginTop: "10px" }}>
                <Link to="/#"className="back">
                  Back To Home
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
