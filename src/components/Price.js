import React from 'react';

export default function({pizza, quantity, currency}){
    const qty = quantity || 1;
    switch(currency){
        case 'eur':
            return(<span>€{pizza.eur_price*qty}</span>)
        case 'usd':
            return(<span>${pizza.usd_price*qty}</span>)
        default:
            return(<span></span>)
    }
}