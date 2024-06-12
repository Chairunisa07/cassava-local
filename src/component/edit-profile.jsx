import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProfile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [nohp, setNohp] = useState("");
    const [alamat, setAlamat] = useState("");
    const [foto, setFoto] = useState(null);
    const [role, setRole] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getUserById = async () => {
            try {
                const response = await axios.get(`/api/users/${id}`);
                setName(response.data.name);
                setEmail(response.data.email);
                setRole(response.data.role);
                setNohp(response.data.additionalInfo.nohp);
                // SetFoto dihilangkan karena tidak bisa menampilkan file
                setAlamat(response.data.additionalInfo.alamat);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getUserById();
    }, [id]);

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('nohp', nohp);
            formData.append('alamat', alamat);
            formData.append('role', role);
            if (foto) {
                formData.append('foto', foto);
            }

            await axios.patch(`/api/users/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate("/dashboard");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    const handleFileChange = (e) => {
        setFoto(e.target.files[0]);
    };

    return (
        <div>
            <h2 className="title"><strong>Update Profile : {role}</strong></h2>
            <div className="card is-shadowless">
                <div className="card-content ps-4 mb-3">
                    <div className="content">
                        <form onSubmit={updateUser}>
                            <p className="has-text-centered">{msg}</p>
                            <div className="field mb-2">
                                <label className="label">Nama</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Name"
                                    />
                                </div>
                            </div>

                            <div className="field mb-2">
                                <label className="label">Email</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="field mb-2">
                                <label className="label">Nomor HP</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={nohp}
                                        onChange={(e) => setNohp(e.target.value)}
                                        placeholder="Nomor HP"
                                    />
                                </div>
                            </div>
                            <div className="field mb-2">
                                <label className="label">Alamat</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={alamat}
                                        onChange={(e) => setAlamat(e.target.value)}
                                        placeholder="Alamat"
                                    />
                                </div>
                            </div>
                            <div className="field mb-2">
                                <label className="label">Foto</label>
                                <div className="control">
                                    <input
                                        type="file"
                                        className="input"
                                        onChange={handleFileChange}
                                        placeholder="Foto"
                                    />
                                </div>
                            </div>
                            <div className="field mt-3">
                                <div className="control">
                                    <button type="submit" className="btn btn-success">
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

export default EditProfile;
