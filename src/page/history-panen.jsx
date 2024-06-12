import React, { useEffect } from "react";
import Layout from "../page/layout";
import ListHistoryProduk from "../component/list-history";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const HistoryPanen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);
  return (
    <Layout>
      <ListHistoryProduk />
    </Layout>
  );
};

export default HistoryPanen;
