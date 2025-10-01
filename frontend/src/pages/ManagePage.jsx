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
        <div className="manage-page">
            <h1>Pending Admin Requests</h1>
            {pending.length === 0 ? (
            <p>No pending requests.</p>
            ) : (
            <ul className="manage-list">
                {pending.map((u) => (
                <li key={u._id}>
                    <span className="manage-username">{u.username}</span>
                    <div>
                    <button className="manage-btn manage-btn-approve" onClick={() => approveAdmin(u._id)}>Approve</button>
                    <button className="manage-btn manage-btn-reject" onClick={() => rejectAdmin(u._id)}>Reject</button>
                    </div>
                </li>
                ))}
            </ul>
            )}
        </div>
        </AppLayout>

  );
};

export default ManagePage;
