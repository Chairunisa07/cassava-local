import React, { useEffect } from "react";
import Layout from "../page/layout";
import FormTerimaOrder from "../component/form-terima-order";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const TerimaOrder = () => {
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
            <FormTerimaOrder />
        </Layout>
    );
};

export default TerimaOrder;
