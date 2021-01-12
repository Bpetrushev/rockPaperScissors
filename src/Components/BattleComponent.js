import React, {useEffect, useRef, useState} from 'react';
import gameImg from '../img/img.js'; 
import { TweenMax, TimelineLite } from "gsap/all";
import utils from './utils';

const BattleComponent = (props) => {

    const elements ={
    img1: (useRef(null)),
    vl: useRef(null),
    img2: useRef(null),
    count: useRef(null),
  }
  const position = {
    top: 0,
    left: 0,
  }
  
  const [alert, setAlert] = useState({show: false, text: ''});
  if(alert.show){
    props.alertComponentNewGame.props.text.show = alert.text;
  }

  const checkWhoWin = (img1, img2) => {
    //handle win, lose or equal
    if(img1 === img2) {
      TweenMax.to(elements.img2, .3, {opacity: .5, delay: .5});
      TweenMax.to(elements.img1, .3, {opacity: .5, delay: .5, onComplete: () => {
        setAlert({show:true, text:'EQUAL'});
      }});
    }
    if(utils.beats[img1] === img2){
      TweenMax.to(elements.img2, .3, {opacity: .5, delay: .5});
      TweenMax.to(elements.img1, .3, {scale:1.05, delay: .5, onComplete: () => {
        props.pointsState(true);
        setAlert({show:true, text:'YOU WIN!'});
      }});
    }else if(utils.beats[img2] === img1){
      TweenMax.to(elements.img1, .3, {opacity: .5, delay: .5});
      TweenMax.to(elements.img2, .3, {scale:1.05, delay: .5, onComplete: () => {
        props.pointsState(false);
        setAlert({show:true, text:'YOU LOSE!'});
      }});
    }
  }

  useEffect(() => {
      position.top = props.positionElement.top - elements.img1.getBoundingClientRect().top;
      position.left = props.positionElement.left - elements.img1.getBoundingClientRect().left;
      
      elements.img1.style.top = `${position.top}px`;
      elements.img1.style.left = `${position.left}px`;

      const valueFromCount = parseInt(elements.count.textContent);
      let counter = valueFromCount;

      //move img1 to right position
      TweenMax.to(elements.img1, 1, {top:0, left: 0, opacity: 1, onComplete: () => {

        //show vertical line
        TweenMax.to(elements.vl, .5, {opacity: 1, onComplete: ()=>{

          const tl = new TimelineLite({repeat: valueFromCount, repeatDelay: 0.1, onComplete: () => {
            //show img2
            TweenMax.to(elements.img2, .5, {opacity:1});
            checkWhoWin(props.lastChoice, props.randomChoice);
          }});

          //animation for counter
          tl.to(elements.count, .5, {scale:1, opacity:1});
          tl.to(elements.count, .5, {scale:0.7, opacity:0, onComplete: () => {
            counter--;
            elements.count.textContent = counter;
          }});

        }});
      }});
  }, []);

  return (
    <div>
      <div className='battleComponent'>
        <img src={gameImg[props.lastChoice].default} ref={img => elements.img1 = img} className='firstElement' alt='test' style={{opacity: 0}} />
        <div className='verticalLine' ref={div => elements.vl = div} style={{opacity: 0}} />
        <img src={gameImg[props.randomChoice].default} ref={img => elements.img2 = img} className='lastElement' alt='test'style={{opacity: 0}} />
        <div className='countStart' ref={div => elements.count = div} >3</div>
      </div>
      {alert.show ? props.alertComponentNewGame : null}
    </div>
  )
}

export default BattleComponent;