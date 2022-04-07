import React, { useState } from 'react';
import './Home.scss'
import { auth, db } from '../../utils/firebase'
import { useNavigate } from 'react-router-dom'

function Home() {
    const { currentUser } = auth;
    const [displayModal, setDisplayModal] = useState(false)
    const navigate = useNavigate()
    const gameOptions = [
        {label: 'black pieces', value: 'b'},
        {label: 'white pieces', value: 'w'},
        {label: 'random', value: 'r'}
    ]

    function handlePlayOnline() {
        setDisplayModal(true)
    }

    function selectRandomPiece() {
        return ['b', 'w'][Math.round(Math.random())]
    }

    async function startOnlineGame(startingPiece) {
        const member = {
            uid: currentUser.uid,
            piece: startingPiece === 'r' ? selectRandomPiece() : startingPiece,
            name: localStorage.getItem('userName'),
            creator: true
        }
        const game = {
            status: 'waiting',
            members: [member],
            gameId: `${Math.random().toString(36).substr(2, 9)}_${Date.now()}`
        }
        await db.collection('games').doc(game.gameId).set(game)
        navigate(`/game/${game.gameId}`)
    }

  return (
    <div className="home">
        <div className="home__left">
            <button>Play Locally</button>
        </div>
        <div className="home__right">
            <button onClick={handlePlayOnline}>Play Online</button>
        </div>
        <div className={`modal ${displayModal ? 'is-active' : ''}`}>
            <div className="modal-background"></div>
            <div className="modal-content">
                <div className="card">
                    <div className="card-content">
                        Please select the piece you want to start
                    </div>

                    <footer className="card-footer">
                    {gameOptions.map(({label, value}) => (
                        <span className="card-footer-item" key={value} onClick={() => startOnlineGame(value)}>
                            {label}
                        </span>
                    ))}
                </footer>
                </div>
            </div>
            <button className="modal-close is-large" onClick={() => setDisplayModal(false)}></button>
        </div>
    </div>
  )
}

export default Home