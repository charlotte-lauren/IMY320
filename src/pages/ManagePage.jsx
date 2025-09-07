import React, { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";

const ManagePage = () => {
  const [pending, setPending] = useState([]);
  const token = localStorage.getItem("authToken");

  const fetchPending = async () => {
    try {
      const res = await fetch("/api/admin/pending-requests", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setPending(data.pending || []);
    } catch (err) {
      console.error(err);
    }
  };

  const approveAdmin = async (userId) => {
    try {
      const res = await fetch(`/api/admin/approve/${userId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      alert(data.message);
      fetchPending();
    } catch (err) {
      console.error(err);
    }
  };

  const rejectAdmin = async (userId) => {
    try {
      const res = await fetch(`/api/admin/reject/${userId}`, { // create backend reject endpoint
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      alert(data.message);
      fetchPending();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  return (
    <AppLayout useCustomNavbar={false} useFooter={true} loginPage={false} color={true} isAuth={!!token}>
      <h1>Pending Admin Requests</h1>
      {pending.length === 0 ? <p>No pending requests.</p> : (
        <ul>
          {pending.map(u => (
            <li key={u._id}>
              {u.username}
              <button onClick={() => approveAdmin(u._id)}>Approve</button>
              <button onClick={() => rejectAdmin(u._id)}>Reject</button>
            </li>
          ))}
        </ul>
      )}
    </AppLayout>
  );
};

export default ManagePage;
