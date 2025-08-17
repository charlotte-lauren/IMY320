import React from 'react';
import { Link } from 'react-router-dom';
// import '../styles/UnderConstructionPage.css';
import AppLayout from "../components/AppLayout";
import logo from '../assets/LogoNBG.png';

import RomanDen from '../assets/RomanDen.jpg';
import SilverDoll from '../assets/SilverDol.jpg';
import GoldSov from '../assets/GoldSov.jpg';
import JapOb from '../assets/JapaneseOb.jpg';
import FrenchFranc from '../assets/FrenchFra.png';
import Sycee from '../assets/ChineseSycee.jpeg';
import CanMaple from '../assets/CanadaMaple.jpg';

const CoinsDirectory = () => {
  const coins = [
    {
      title: 'Ancient Roman Denarius',
      subtitle: 'Circa 50 BC, Rome',
      price: '$1,200',
      img: RomanDen,
    },
    {
      title: '1916 Silver Dollar',
      subtitle: 'USA',
      price: '$850',
      img: SilverDoll,
    },
    {
      title: 'Gold Sovereign',
      subtitle: 'UK, 1901',
      price: '$2,300',
      img: GoldSov,
    },
    {
      title: 'Japanese Oban Coin',
      subtitle: 'Japan, Edo Period',
      price: '$3,750',
      img: JapOb,
    },
    {
      title: 'French Franc',
      subtitle: 'France, 1795',
      price: '$620',
      img: FrenchFranc,
    },
    {
      title: 'Chinese Sycee',
      subtitle: 'Qing Dynasty',
      price: '$4,100',
      img: Sycee,
    },
    {
      title: 'Canadian Maple Leaf',
      subtitle: 'Canada, 1988',
      price: '$950',
      img: CanMaple,
    },
  ];

  return (
    <AppLayout useCustomNavbar={false} useFooter={true} loginPage={false} color={true}>
        <div className='homePage'>
        

        </div>
    </AppLayout>
  );
};

export default CoinsDirectory;