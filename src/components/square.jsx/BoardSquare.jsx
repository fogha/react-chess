import React, { useState, useEffect } from 'react'
import Piece from '../piece/Piece'
import Square from './Square'
import './square.scss'
import { useDrop } from 'react-dnd'
import { handleMove, gameSubject } from './../../utils/Game'
import Promote from '../promote/promote'

function BoardSquare({ piece, isBlack, position }) {
    const [promotion, setPromotion] = useState(null)

    const [, drop] = useDrop({
        accept: 'piece',
        drop: (item) => {
            const [fromPosition] = item.id.split('_')
            handleMove(fromPosition, position)
        }
    })

    useEffect(() => {
        const subscribe = gameSubject.subscribe(({ pendingPromotion }) => {
            pendingPromotion?.to === position ?
                setPromotion(pendingPromotion) : setPromotion(null)
        })
        return () => subscribe.unsubscribe()
    }, [position])

    return (
        <div className='boardSquare' ref={drop}>
            <Square isBlack={isBlack}>
                {
                    promotion ? (<Promote promotion={promotion}/>) : piece ? (<Piece piece={piece} position={position} />) : null
                }
            </Square>
        </div>
    )
}

export default BoardSquare
