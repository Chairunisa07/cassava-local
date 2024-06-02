import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../../page/layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const PetaniLahan = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);
    const [userData, setUserData] = useState([]);
    const [userAuth, setUserAuth] = useState(null);

    useEffect(() => {
        // Pastikan user dan user.uuid tersedia sebelum melakukan fetch
        if (user?.uuid) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/users/${user.uuid}`);
                    console.log(response.data);
                    setUserAuth(response.data);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchData();
        }
    }, [user?.uuid]); // Tambahkan user?.uuid sebagai dependency untuk lebih aman

    useEffect(() => {
        if (user?.uuid) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/petanis`);
                    setUserData(response.data);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchData();
        }
    }, [user?.uuid]);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate("/");
        }
        if (user && user.role !== "petani") {
            navigate("/datalahan");
        }

    }, [isError, user, navigate]);

    const deleteProduct = async (id) => {
        // Tampilkan dialog konfirmasi penghapusan
        if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            try {
                await axios.delete(`http://localhost:5000/petani/${id}`);
                // Filter out the deleted data from the userData state
                const updatedUserData = userData.filter(data => data.id !== id);
                setUserData(updatedUserData); // Set the state with the filtered data
                // Tampilkan pesan sukses atau lakukan sesuatu sebagai konfirmasi penghapusan
                alert("Data berhasil dihapus.");
            } catch (error) {
                console.error("Error deleting data:", error);
                // Handle error, e.g., show an error message
                alert("Terjadi kesalahan saat menghapus data.");
            }
        }
    };



    return (
        <Layout>
            <div>
                <h2 className="title"><strong>Data Petani</strong></h2>
                <Link to="/datalahan/add" className="btn btn-primary mb-2">
                    Add Data Petani
                </Link>
                {userData.length ? (
                    userData.map((data, index) => (
                        <div key={index} >
                            <div className="card ps-4 pt-4 pb-4 mb-4">
                                {user && (userAuth?.role === "admin") && (
                                    <div className="pb-3">
                                        <h3 ><b>Nama Petani: {data.user.name}</b></h3>
                                        <h3 ><b>Email Petani: {data.user.email}</b></h3>
                                    </div>
                                )}

                                <p className="poin"><b>1. Informasi Lahan</b></p>
                                <div className="subpoin">
                                <p> ID Blockchain: {data.idlahan}</p>
                                <p> Lokasi Lahan: {data.lokasilahan}</p>
                                <p>Luas Lahan: {data.luaslahan}</p>
                                <p> Status Lahan: {data.statuskepemilikanlahan}</p>
                                </div>
                                
                                <p className="poin mt-3"><b>2. Data Produksi</b></p>
                                <div className="subpoin">
                                <p>Periode Tanam Mulai:  {data.periodeTanamMulai}</p>
                                <p>Periode Tanam Selesai:  {data.periodeTanamSelesai}</p>
                                <p>Varietas: {data.varietassingkong}</p>
                                <p>Estimasi Produksi:  {data.estimasiproduksi}</p>
                                <p>Produksi Aktual:  {data.produksiaktual}</p>
                                </div>
                                
                                <p className="poin mt-3"><b>3. Penggunaan Pupuk dan Pestisida</b></p>
                                <div className="subpoin">
                                <p>Jenis Pupuk:  {data.jenispupuk}</p>
                                <p>Jumlah Pupuk:  {data.jumlahpupuk}</p>
                                </div>
                                
                                <p className="poin mt-3"><b>4. Aspek Ekonomi</b></p>
                                <div className="subpoin">
                                <p>Harga Jual: {data.hargajual}</p>
                                <p>Total Pendapatan: {data.totalpendapatan}</p>
                                <p>Pendapatan Bersih: {data.pendapatanbersih}</p>
                                </div>

                                <p className="poin mt-3"><b>5. Tambahan</b></p>
                                <p className="pb-2"> Catatan Tambahan: {data.catatantambahan}</p>
                                
                                {user && (userAuth?.role === "admin") && (
                                    <div>
                                        <Link
                                            to={`/datalahan/edit/${data.id}`}
                                            className="btn btn-info button-detail"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => deleteProduct(data.id)}
                                            className="btn btn-danger button-detail ms-2"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}

                            </div>
                        </div>
                    ))
                ) : (
                    <p>Loading user details...</p>
                )}
            </div>
        </Layout>
    );
};

export default PetaniLahan;
