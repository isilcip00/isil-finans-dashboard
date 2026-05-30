import React from 'react';
import Navbar from '../Components/Navbar';
import CryptoCard from '../Components/CryptoCard';

const DashboardPage = ({ cryptoData }) => {
    return (
        <div className="dashboard-page">
            <Navbar />
            <div className="crypto-list">
                {cryptoData && cryptoData.map(coin => (
                    <CryptoCard key={coin.id} coin={coin} />
                ))}
            </div>
        </div>
    );
};

export default DashboardPage;