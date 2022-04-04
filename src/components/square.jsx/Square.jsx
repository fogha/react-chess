import React from 'react'
import './square.scss';

function Square({ children, isBlack }) {
    const bgClass = isBlack ? 'blackSquare' : 'whiteSquare'

    return (
        <div className={`${bgClass} boardSquare`}>{children}</div>
    )
}

export default Square