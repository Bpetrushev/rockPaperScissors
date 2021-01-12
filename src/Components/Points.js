import React from 'react';

const Points = React.forwardRef((props, ref) => {
    //points component with ref from parrent component
    return(
      <div className="pointsComponent" ref={ref}>
        <div className="playerPoints">
          <div className="pointsTitle">PLAYER</div>
          <div className="points">{props.gamePoints.player}</div>
        </div>
        <div className="computerPoints">
          <div className="pointsTitle">COMPUTER</div>
          <div className="points">{props.gamePoints.computer}</div>
        </div>
      </div>
    )
  });

export default Points;