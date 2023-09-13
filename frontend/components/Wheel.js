import React from 'react'
import {connect} from 'react-redux';
import {moveClockwise, moveCounterClockwise} from '../state/action-creators';

 function Wheel(props) {
 const { wheel} = props;

  

  return (
    
    
    <div id="wrapper">
      <div id="wheel">
        
        <div className={"cog " + (wheel === 0 ? "active" : "")} style={{ "--i": 0 }}>B</div>
        <div className={"cog " + (wheel === 1 ? "active" : "")} style={{ "--i": 1 }}></div>
        <div className={"cog " + (wheel === 2 ? "active" : "")} style={{ "--i": 2 }}></div>
        <div className={"cog " + (wheel === 3 ? "active" : "")} style={{ "--i": 3 }}></div>
        <div className={"cog " + (wheel === 4 ? "active" : "")} style={{ "--i": 4 }}></div>
        <div className={"cog " + (wheel === 5 ? "active" : "")} style={{ "--i": 5 }}></div>{/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        
        <button id="counterClockwiseBtn" onClick={() => moveCounterClockwise(wheel)} >Counter clockwise</button>
        <button id="clockwiseBtn" onClick={() =>moveClockwise(wheel)}>Clockwise</button>
        
      </div>
    </div>
    
  )
}

const mapStateToProps = state => ({

  wheel: state.wheel


})



export default connect(mapStateToProps)(Wheel)
