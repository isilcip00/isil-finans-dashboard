import React from 'react';

const CryptoCard = ({ coin }) => {
    return (
        <div className="crypto-card">
            <h3>{coin.name}</h3>
            <p>Fiyat: ${coin.current_price}</p>
            <p className={coin.price_change_percentage_24h >= 0 ? "green" : "red"}>
                24s Değişim: {coin.price_change_percentage_24h}%
            </p>
        </div>
    );
};

export default CryptoCard;
