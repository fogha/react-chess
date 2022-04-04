import React from 'react';
import './piece.scss'
import { useDrag, DragPreviewImage } from 'react-dnd';

function Piece({ piece: { type, color }, position}) {
    const pieceImage = require(`../../assets/${type}_${color}.png`)
    const [ { isDragging }, drag, preview] = useDrag({
        item: { type: 'piece', id: `${position}_${type}_${color}.png` },
        collect: (monitor) => { return { isDragging: !!monitor.isDragging()}}
    })

    return (
        <>
            <DragPreviewImage connect={preview} src={pieceImage} />
            <div className="piece" ref={drag} style={{ opacity: isDragging ? 0 : 1 }}>
                <img className='piece__img' src={pieceImage} alt="Chess Piece" />
            </div>
        </>
    )
}

export default Piece