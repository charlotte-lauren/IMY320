import React, { useState } from "react";
import AppLayout from "../components/AppLayout";
import { Link } from 'react-router-dom';
import RomanDen from "../assets/RomanDen.jpg";
import SilverDoll from "../assets/SilverDol.jpg";
import GoldSov from "../assets/GoldSov.jpg";
import JapOb from "../assets/JapaneseOb.jpg";
import FrenchFranc from "../assets/FrenchFra.png";
import Sycee from "../assets/ChineseSycee.jpeg";
import CanMaple from "../assets/CanadaMaple.jpg";
import "../styles/ProductPage.css";

const ProductPage = () => {
  const coins = [
    { title: "Ancient Roman Denarius", subtitle: "Circa 50 BC, Rome", description: "A rare Roman silver coin used during the Republic era.", price: "$1,200", img: RomanDen, country: "Rome", era: "Ancient", metal: "Silver", theme: "Empire" },
    { title: "1916 Silver Dollar", subtitle: "USA", description: "A collectible American silver dollar minted in 1916.", price: "$850", img: SilverDoll, country: "USA", era: "Modern", metal: "Silver", theme: "Currency" },
    { title: "Gold Sovereign", subtitle: "UK, 1901", description: "A British gold sovereign from the reign of Queen Victoria.", price: "$2,300", img: GoldSov, country: "UK", era: "Victorian", metal: "Gold", theme: "Monarchs" },
    { title: "Japanese Oban Coin", subtitle: "Japan, Edo Period", description: "An Edo period oval coin used by merchants in Japan.", price: "$3,750", img: JapOb, country: "Japan", era: "Edo", metal: "Gold", theme: "Trade" },
    { title: "French Franc", subtitle: "France, 1795", description: "A French coin minted after the Revolution.", price: "$620", img: FrenchFranc, country: "France", era: "Revolution", metal: "Silver", theme: "Revolution" },
    { title: "Chinese Sycee", subtitle: "Qing Dynasty", description: "A silver ingot currency used during the Qing Dynasty.", price: "$4,100", img: Sycee, country: "China", era: "Dynastic", metal: "Silver", theme: "Trade" },
    { title: "Canadian Maple Leaf", subtitle: "Canada, 1988", description: "A modern Canadian bullion coin featuring the maple leaf.", price: "$950", img: CanMaple, country: "Canada", era: "Modern", metal: "Gold", theme: "Nature" },
  ];

  return (
    <AppLayout useCustomNavbar={false} useFooter={true} loginPage={false} color={true}>
      <div className="catalogue-page">
        <Link to="/coins" className="btn">← Back to Catalog</Link>
      </div>
    </AppLayout>
  );
};

export default ProductPage;