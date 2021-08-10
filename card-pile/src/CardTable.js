import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';

// based on clicking for a new card

function CardTable() {
    const [src, setSrc] = useState('');
    const deckId = useRef();
    const remaining = useRef(52);
    useEffect(() => {
        async function createDeck() {
            const res = await axios.get(`http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
            deckId.current = res.data.deck_id;
        };
        createDeck();
    }, []);

    async function dealCard() {
        if (remaining.current === 0) {
            alert('You are out of cards');
            return;
        }
        const res = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId.current}/draw/?count=1`);
        remaining.current = res.data.remaining;
        setSrc(res.data.cards[0].image);
    }

    return (
        <>
            <button onClick={dealCard}>Gimme a fuggin card</button>
            <div>
                <img className="CardBox" src={src} alt="a card" />
            </div>
        </>
    )
}

export default CardTable;