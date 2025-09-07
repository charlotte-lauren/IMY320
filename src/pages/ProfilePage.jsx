import React, { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import RomanDen from "../assets/coin.png";
import "../styles/ProfilePage.css";

const ProfilePage = () => {
  const [user, setUser] = useState({ username: "", img: "" });
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setUser({
          username: data.username || "User",
          img: data.img || "",
        });
        setWishlist(data.wishlist || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchProfile();
  }, [token]);

  const slugify = (text) =>
    text?.toString().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") || "";

  const removeFromWishlist = async (coinId) => {
  try {
    const res = await fetch(`/api/user/wishlist/${coinId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to remove coin");

    const data = await res.json();
    setWishlist(data.wishlist); // update wishlist in state
  } catch (err) {
    console.error(err);
  }
};

  if (!token) return <p>Please log in to view your profile.</p>;
  if (loading) return <p>Loading profile...</p>;

  return (
    <AppLayout useCustomNavbar={false} useFooter={true} loginPage={false} color={true} isAuth={!!token}>
      <div className="profile-page">
        <section className="profile-header">
          <img src={user.img || RomanDen} alt={user.username} className="profile-avatar" />
          <h1 className="profile-username">{user.username}</h1>
        </section>

        <section className="wishlist">
          <h2>Wishlist</h2>
          {wishlist.length === 0 ? (
            <p>Your wishlist is empty.</p>
          ) : (
            <div className="wishlist-grid">
                {wishlist.map((coin) => (
                <div key={coin._id} className="wishlist-card">
                    <img src={coin.img || RomanDen} alt={coin.Name || "Coin"} className="wishlist-img" />
                    <div className="wishlist-info">
                    <h3>{coin.Name}</h3>
                    <p>{coin.Country} {coin["Issued on"] ? `(${coin["Issued on"]})` : ''}</p>
                    <div className="wishlist-price">
                        {coin.FaceValue ? `${coin.FaceValue} ${coin.Currency}` : 'N/A'}
                    </div>
                    <div className="wishlist-actions">
                        <a href={`/product/${slugify(coin.Name)}`} className="profile-btn">View</a>
                        <button 
                        onClick={() => removeFromWishlist(coin._id)} 
                        className="profile-btn profile-btn-secondary"
                        >
                        Remove
                        </button>
                    </div>
                    </div>
                </div>
                ))}
            </div>
          )}
        </section>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
