import React from 'react';
import { connect } from 'react-redux';
import { moveClockwise, moveCounterClockwise } from '../state/action-creators';

function Wheel(props) {
  const { wheel, dispatch } = props;

  const handleMoveClockwise = () => {
    dispatch(moveClockwise());
  };

  const handleMoveCounterClockwise = () => {
    dispatch(moveCounterClockwise());
  };

  const { position, bText } = wheel;

  const activeCogIndex = (position % 6 + 6) % 6; 

  return (
    <div id="wrapper">
      <div id="wheel">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className={`cog ${index === activeCogIndex ? 'active' : ''}`}
            style={{ '--i': index }}
          >
            {index === activeCogIndex ? bText : ''}
          </div>
        ))}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={handleMoveCounterClockwise}>
          Counter clockwise
        </button>
        <button id="clockwiseBtn" onClick={handleMoveClockwise}>
          Clockwise
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  wheel: state.wheel,
});

export default connect(mapStateToProps)(Wheel);
