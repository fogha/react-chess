import React, { useEffect, useState } from 'react'
import './Game.scss'
import Board from '../../components/board/Board';
import { gameSubject, initGame, resetGame } from '../../utils/Game';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../utils/firebase';

function Game() {
    const [board, setBoard] = useState([])
    const [isGameOver, setIsGameOver] = useState(false)
    const [result, setResult] = useState('')
    const [position, setTurn] = useState()
    const [initResult, setInitResult] = useState(null)
    const [loading, setLoading] = useState(true)
    const [status, setStatus] = useState('')
    const [game, setGame] = useState({})

    const { id } = useParams()
    const navigate = useNavigate()
    const sharebleLink = window.location.href

    useEffect(() => {
        let subscribe
        async function init() {
            const res = await initGame(id !== 'local' ? db.doc(`games/${id}`) : null)
            setInitResult(res)
            setLoading(false)
            if (!res) {
                subscribe = gameSubject.subscribe(game => {
                    setBoard(game.board)
                    setIsGameOver(game.isGameOver)
                    setResult(game.result)
                    setTurn(game.position)
                    setStatus(game.status)
                    setGame(game)
                })
            }
        }
        init()

        return () => subscribe?.unsubscribe()
    }, [id])

    async function reset() {
        await resetGame()
        navigate('/')
    }

    async function copyToClipboard() {
        await navigator.clipboard.writeText(sharebleLink)
    }

    if (loading) {
        return 'Loading ...'
    }
    if (initResult === 'notFound') {
        return 'Game Not found'
    }

    if (initResult === 'intruder') {
        return 'The game is already full'
    }

    return (
        <div className='app__container'>
            {
                isGameOver && (
                    <h2 className='vertical-text'>
                        GAME OVER
                        <button className='resetButton' onClick={() => reset()}>
                            <span className="vertical-text">
                                New Game
                            </span>
                        </button>
                    </h2>
                )
            }
            <div className="board__container">
                <span className="tag is-link">{game?.oponent?.name}</span>
                <Board board={board} position={position} />
                <span className="tag is-link">{game?.member?.name}</span>
            </div>
            {result && <p className="vertical-text">{result}</p>}

                {status === 'waiting' && (<div className="notification is-link share-game">
                    <strong>Share this game to continue</strong>
                    <br />
                    <br />
                    <div className="field has-addons">
                        <div className="control is-expanded">
                            <input type="text" name="" id="" className="input" readOnly value={sharebleLink} />
                        </div>
                        <div className="control">
                            <button className="button is-info" onClick={copyToClipboard}>Copy</button>
                        </div>
                    </div>
                </div>)}
            
        </div>
    )
}

export default Game
