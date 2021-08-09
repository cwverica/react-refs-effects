import React, { useState, useEffect, useRef } from "react";

function CardTable() {
    const [src, setSrc] = useState('');
    async function dealCard() {
        const res = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        setSrc(res.cards[0].image)
    }

    return (
        <>
            <button onClick={dealCard}>Gimme a fuggin card</button>
            <div>
                <img className="CardBox" src={src} ref={cardBox} />
            </div>
        </>
    )
}

export default CardTable;