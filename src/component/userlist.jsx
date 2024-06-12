import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Userlist = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get(`/api/users`);
    setUsers(response.data);
  };

  const deleteUser = async (userId) => {
    await axios.delete(`/api/users/${userId}`);
    getUsers();
  };

  return (
    <div>
      <h2 className="title"><strong>List of Users</strong></h2>
      <Link to="/users/add" type="button" class="btn btn-primary mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Kode Blokchain</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.uuid}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.uuid}</td>
              <td className="text-center">
                <Link
                  to={`/users/edit/${user.uuid}`}
                  type="button" class="btn btn-info button-tabel"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteUser(user.uuid)}
                  type="button" class="btn btn-danger button-tabel ms-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Userlist;
