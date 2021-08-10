import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';

// auto dealer, 1 card/s turned on or off

function CardTable2() {

    const [buttonMode, setButtonMode] = useState("deal")
    const [src, setSrc] = useState('');
    const deckId = useRef();
    const remaining = useRef(52);
    const [isDealing, setIsDealing] = useState(false);
    const timerId = useRef();
    const button = useRef();

    useEffect(() => {
        timerId.current = setInterval(() => {
            if (isDealing) {
                dealCard();
            };
        }, 1000);
        async function createDeck() {
            const res = await axios.get(`http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
            deckId.current = res.data.deck_id;
        };
        createDeck();

        return () => { clearInterval(timerId.current) }
    }, [isDealing]);

    async function dealCard() {
        console.log(remaining.current);
        if (remaining.current === 0) {
            alert('You are out of cards');
            setIsDealing(false);
            button.current.innerText = "Shuffle deck";
            setButtonMode('shuffle')
            return;
        }
        const res = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId.current}/draw/?count=1`);
        remaining.current = res.data.remaining;
        setSrc(res.data.cards[0].image);
    };

    async function shuffleDeck() {
        const res = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId.current}/shuffle/`);
        if (res.data.shuffled) {
            setSrc('');
            button.current.innerText = "Start dealing cards";
            setButtonMode('deal')
            remaining.current = res.data.remaining;
        }
    }

    function clickHandler() {
        if (buttonMode === "deal") {
            toggleDealing()
        } else if (buttonMode === "shuffle") {
            shuffleDeck()
        }
    }

    function toggleDealing() {
        setIsDealing(!isDealing);
        button.current.innerText = isDealing ? "Start dealing cards" : "Stop dealing cards";
    };


    return (
        <>
            <button onClick={clickHandler} ref={button}>Start dealing cards</button>
            <div>
                <img className="CardBox" src={src} alt="a card" />
            </div>
        </>
    )
};

export default CardTable2;