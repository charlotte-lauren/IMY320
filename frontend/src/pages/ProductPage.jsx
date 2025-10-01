import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import RomanDen from "../assets/coin.png"; // fallback
import "../styles/ProductPage.css";

const ProductPage = () => {
  const { id } = useParams(); // Mongo _id
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  // Fetch coin data
  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const res = await fetch(`/api/coins/${id}`);
        if (!res.ok) throw new Error("Coin not found");
        const data = await res.json();
        setCoin(data);
      } catch (err) {
        console.error("Failed to fetch coin:", err);
        setCoin(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [id]);

  // 🔹 Add to Collection (cart)
  const handleAddToCollection = async () => {
    console.log("Adding coin to cart:", coin);
    try {
      const token = localStorage.getItem("authToken"); // must match your login storage key
      if (!token) throw new Error("No token found");

      const res = await fetch(`/api/user/cart/${coin._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to add to collection");
      }

      alert("Added to your collection!");
    } catch (err) {
      console.error(err);
      alert("You need to be logged in to add this coin.");
    }
  };

  // 🔹 Add to Wishlist
  const handleAddToWishlist = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No token found");

      const res = await fetch(`/api/user/wishlist/${coin._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to add to wishlist");
      }

      alert("Added to your wishlist!");
    } catch (err) {
      console.error(err);
      alert("You need to be logged in to add this coin.");
    }
  };

  if (loading) {
    return (
      <AppLayout useCustomNavbar={false} useFooter={true} loginPage={false} color={true}>
        <div className="product-page">
          <p>Loading coin...</p>
        </div>
      </AppLayout>
    );
  }

  if (!coin) {
    return (
      <AppLayout useCustomNavbar={false} useFooter={true} loginPage={false} color={true}>
        <div className="product-page">
          <Link to="/coins" className="back-link">← Back</Link>
          <h2>Coin not found!</h2>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout useCustomNavbar={false} useFooter={true} loginPage={false} color={true}>
      <div className="product-page">
        <div className="product-page-section">
          <Link to="/coins" className="btn tertiary">← Back</Link>

          <div className="product-content">
            <div className="coin-image">
              <img src={coin.img || RomanDen} alt={coin.Name} />
            </div>

            <div className="coin-details">
              <h1 className="coin-title">{coin.Name}</h1>
              <p>{coin.Description || "No description available."}</p>
              {coin.Price && <p><strong>Price:</strong> {coin.Price}</p>}

              <div className="coin-attributes">
                {coin.Country && <div className="attribute"><strong>Country:</strong> {coin.Country}</div>}
                {coin.Composition && <div className="attribute"><strong>Metal:</strong> {coin.Composition}</div>}
                {coin.Era && <div className="attribute"><strong>Era:</strong> {coin.Era}</div>}
                {coin.Weight && <div className="attribute"><strong>Weight:</strong> {coin.Weight}</div>}
                {coin.Diameter && <div className="attribute"><strong>Diameter:</strong> {coin.Diameter}</div>}
              </div>

              <div className="buttons">
                <button className="btn add-to-collection" onClick={handleAddToCollection}>
                  Add to Collection
                </button>
                <button className="btn add-to-wishlist" onClick={handleAddToWishlist}>
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProductPage;
