// src/pages/UserList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("https://store-backend-1-l2mm.onrender.com/api/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="user-list">
      <h2>Registered Users</h2>
      <ul>
        {users.map((u) => (
          <li key={u._id}>
            <strong>{u.name}</strong> — {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
