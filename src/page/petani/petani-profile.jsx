import React, { useEffect } from "react";
import Layout from "../layout";
import DetailUser from "../../component/detail-user";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const PetaniProfile = () => {
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
    if (user && user.role !== "petani") {
      navigate("/datapetani");
    }
  }, [isError, user, navigate]);
  return (
    <Layout>
      <DetailUser />
    </Layout>
  );
};

export default PetaniProfile;
