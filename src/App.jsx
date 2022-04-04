import React, { useEffect, useState } from 'react'
import './App.scss'
import Board from './components/board/Board';
import { gameSubject, initGame } from './utils/Game';

function App() {
    const [board, setBoard] = useState([])

    useEffect(() => {
        initGame()
        const subscribe = gameSubject.subscribe(game => setBoard(game.board))
        return () => subscribe.unsubscribe()
    }, [])

    return (
        <div className='app'>
            <div className="board__container">
                <Board board={board} />
            </div>
        </div>
    )
}

export default App
