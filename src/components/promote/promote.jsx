import React from 'react';
import Square from '../square.jsx/Square';
import './promote.scss'
import { move } from '../../utils/Game';

const promotionPieces = ['r', 'n', 'b', 'q']

function Promote({promotion: {from, to, color}}) {
  return (
    <div className="promoteBoard">
      {promotionPieces.map((p, i) => (
        <div key={i} className="promoteBoard__square">
          <Square isBlack={i%3===0}>
            <div className="promoteBoard__piece" onClick={() => move(from, to, p)}>
              <img 
                src={require(`../../assets/${p}_${color}.png`)} 
                alt="Chess piece"  
                className='promoteBoard__piece-img'  
              />
            </div>
          </Square>
        </div>
      ))}
    </div>
  )
}

export default Promote