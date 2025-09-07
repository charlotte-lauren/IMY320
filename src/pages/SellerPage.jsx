import React, { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";

const SellerPage = () => {
  const [user, setUser] = useState({});
  const [form, setForm] = useState({ Name: "", Country: "", FaceValue: "", Currency: "", Link: "", IssuedOn: "" });
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (token) fetchProfile();
  }, [token]);

  const requestAdmin = async () => {
    try {
      const res = await fetch("/api/user/request-admin", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error(err);
    }
  };

  const addCoin = async () => {
    try {
      const res = await fetch("/api/admin/coin", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, IssuedOn: Number(form.IssuedOn) })
      });
      const data = await res.json();
      alert(data.success ? "Coin added!" : data.message);
    } catch (err) {
      console.error(err);
    }
  };

  if (!token) return <p>Please log in to access this page.</p>;

  return (
    <AppLayout useCustomNavbar={false} useFooter={true} loginPage={false} color={true} isAuth={!!token}>
      <h1>Seller Page</h1>
      {user.role === 'admin' ? (
        <>
          <h2>Add a Coin</h2>
          <input placeholder="Name" value={form.Name} onChange={e => setForm({ ...form, Name: e.target.value })} />
          <input placeholder="Country" value={form.Country} onChange={e => setForm({ ...form, Country: e.target.value })} />
          <input placeholder="FaceValue" value={form.FaceValue} onChange={e => setForm({ ...form, FaceValue: e.target.value })} />
          <input placeholder="Currency" value={form.Currency} onChange={e => setForm({ ...form, Currency: e.target.value })} />
          <input placeholder="Link" value={form.Link} onChange={e => setForm({ ...form, Link: e.target.value })} />
          <input placeholder="Issued On" value={form.IssuedOn} onChange={e => setForm({ ...form, IssuedOn: e.target.value })} />
          <button onClick={addCoin}>Add Coin</button>
        </>
      ) : (
        <>
          <p>You are a user. To add coins, request admin access.</p>
          {user.pendingAdmin ? <p>Admin request pending...</p> : <button onClick={requestAdmin}>Request Admin</button>}
        </>
      )}
    </AppLayout>
  );
};

export default SellerPage;
