import React, { useEffect } from "react";
import Layout from "../../page/layout";
import DetailUser from "../../component/detail-user";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const PabrikProfile = () => {
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
        if (user && user.role !== "pabrik") {
            navigate("/datapabrik");
        }
    }, [isError, user, navigate]);
    return (
        <Layout>
            <DetailUser />
        </Layout>
    );
};

export default PabrikProfile;
