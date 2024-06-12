import React, { useEffect } from "react";
import Layout from "../layout";
import DetailUser from "../../component/detail-user";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const PerusahaanProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user && user.role !== "perusahaan") {
      navigate("/dataperusahaan");
    }
  }, [isError, user, navigate]);
  return (
    <Layout>
      <DetailUser />
    </Layout>
  );
};

export default PerusahaanProfile;
