import React, { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import RomanDen from "../assets/coin.png";

const CartPage = () => {
  const [user, setUser] = useState({ username: "", img: "" });
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutMessage, setCheckoutMessage] = useState("");

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchCart = async () => {
        try {
        const res = await fetch("/api/user/cart", {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch cart");
        const data = await res.json();
        setUser({
            username: data.username || "User",
            img: data.img || "",
        });
        setCart(data.cart || []); // now cart is an array of coin objects
        } catch (err) {
        console.error(err);
        } finally {
        setLoading(false);
        }
    };

    if (token) fetchCart();
    }, [token]);

  const slugify = (text) =>
    text?.toString().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") || "";

  const removeFromCart = async (coinId) => {
    try {
      const res = await fetch(`/api/user/cart/${coinId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to remove item");

      const data = await res.json();
      setCart(data.cart);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckout = async () => {
    try {
        const res = await fetch('/api/user/cart', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to clear cart');

        const data = await res.json();
        setCheckoutMessage("Thank you for your purchase! (Simulation only)");
        setCart(data.cart); // will be []
    } catch (err) {
        console.error(err);
    }
    };

  if (!token) return <p>Please log in to view your cart.</p>;
  if (loading) return <p>Loading cart...</p>;

  return (
    <AppLayout useCustomNavbar={false} useFooter={true} loginPage={false} color={true} isAuth={!!token}>
      <div className="cart-page">
        <section className="cart-header">
          <h1>{user.username}'s Cart</h1>
        </section>

        {checkoutMessage && <p className="checkout-message">{checkoutMessage}</p>}

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cart-grid">
            {cart.map((coin) => (
              <div key={coin._id} className="cart-card">
                <img src={coin.img || RomanDen} alt={coin.Name || "Coin"} className="cart-img" />
                <div className="cart-info">
                  <h3>{coin.Name}</h3>
                  <p>{coin.Country} {coin["Issued on"] ? `(${coin["Issued on"]})` : ''}</p>
                  <div className="cart-price">
                    {coin.FaceValue ? `${coin.FaceValue} ${coin.Currency}` : 'N/A'}
                  </div>
                  <div className="cart-actions">
                    <a href={`/product/${slugify(coin.Name)}`} className="btn">View</a>
                    <button 
                      onClick={() => removeFromCart(coin._id)} 
                      className="btn secondary"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <button onClick={handleCheckout} className="btn checkout-btn">
            Checkout
          </button>
        )}
      </div>
    </AppLayout>
  );
};

export default CartPage;
