import React from "react";
import { useParams, Link } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import RomanDen from "../assets/RomanDen.jpg";
import SilverDoll from "../assets/SilverDol.jpg";
import GoldSov from "../assets/GoldSov.jpg";
import JapOb from "../assets/JapaneseOb.jpg";
import FrenchFranc from "../assets/FrenchFra.png";
import Sycee from "../assets/ChineseSycee.jpeg";
import CanMaple from "../assets/CanadaMaple.jpg";
import "../styles/ProductPage.css";

const ProductPage = () => {
  const { id } = useParams();

  const coins = [
    { title: "Ancient Roman Denarius", subtitle: "Circa 50 BC, Rome", description: "A rare Roman silver coin used during the Republic era.", price: "$1,200", img: RomanDen, country: "Rome", era: "Ancient", metal: "Silver", theme: "Empire", weight: "3.9g", diameter: "18mm" },
    { title: "1916 Silver Dollar", subtitle: "USA", description: "A collectible American silver dollar minted in 1916.", price: "$850", img: SilverDoll, country: "USA", era: "Modern", metal: "Silver", theme: "Currency", weight: "26.7g", diameter: "38mm" },
    { title: "Gold Sovereign", subtitle: "UK, 1901", description: "A British gold sovereign from the reign of Queen Victoria.", price: "$2,300", img: GoldSov, country: "UK", era: "Victorian", metal: "Gold", theme: "Monarchs", weight: "7.98g", diameter: "22mm" },
    { title: "Japanese Oban Coin", subtitle: "Japan, Edo Period", description: "An Edo period oval coin used by merchants in Japan.", price: "$3,750", img: JapOb, country: "Japan", era: "Edo", metal: "Gold", theme: "Trade", weight: "165g", diameter: "60mm" },
    { title: "French Franc", subtitle: "France, 1795", description: "A French coin minted after the Revolution.", price: "$620", img: FrenchFranc, country: "France", era: "Revolution", metal: "Silver", theme: "Revolution", weight: "5g", diameter: "23mm" },
    { title: "Chinese Sycee", subtitle: "Qing Dynasty", description: "A silver ingot currency used during the Qing Dynasty.", price: "$4,100", img: Sycee, country: "China", era: "Dynastic", metal: "Silver", theme: "Trade", weight: "50g", diameter: "varies" },
    { title: "Canadian Maple Leaf", subtitle: "Canada, 1988", description: "A modern Canadian bullion coin featuring the maple leaf.", price: "$950", img: CanMaple, country: "Canada", era: "Modern", metal: "Gold", theme: "Nature", weight: "31.1g", diameter: "30mm" },
  ];

  const coin = coins[id];

  if (!coin) {
    return <p>Coin not found!</p>;
  }

  return (
    <AppLayout useCustomNavbar={false} useFooter={true} loginPage={false} color={true}>
      <div className="product-page">
        <Link to="/coins" className="back-link">← Back</Link>

        <h1 className="coin-title">{coin.title}</h1>

        <div className="product-content">
          <div className="coin-image">
            <img src={coin.img} alt={coin.title} />
          </div>

          <div className="coin-details">
            <p>{coin.description}</p>
            <p><strong>Price:</strong> {coin.price}</p>

            <div className="coin-attributes">
              <div className="attribute"><strong>Country:</strong> {coin.country}</div>
              <div className="attribute"><strong>Metal:</strong> {coin.metal}</div>
              <div className="attribute"><strong>Era:</strong> {coin.era}</div>
              <div className="attribute"><strong>Weight:</strong> {coin.weight}</div>
              <div className="attribute"><strong>Diameter:</strong> {coin.diameter}</div>
            </div>

            <div className="buttons">
              <button className="btn add-to-collection">Add to Collection</button>
              <button className="btn add-to-wishlist">Add to Wishlist</button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProductPage;
