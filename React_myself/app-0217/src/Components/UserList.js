import React, { useState, useEffect } from 'react';
import rawData from '../data/users.json';
// import './UserList.css';

function UserList(props) {
  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState([]);

  //didMount
  useEffect(() => {
    setLoading(true);
    setUsers(rawData);
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, []);
  //開啟載入指示器 → 載入資料 → 0.7秒後關閉指示器

  const spinner = (
    <div className="spinner-border text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );

  const userListTable = (
    <table className="table table-bordered table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map((v, i) => {
          return (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.name}</td>
              <td>{v.email}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
  return (
    <>
      <div className="container">
        <div className="center">{loading ? spinner : userListTable}</div>
      </div>
    </>
  );
}

export default UserList;
