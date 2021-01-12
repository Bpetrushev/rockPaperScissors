import React, {useEffect, useRef} from 'react';
import gameImg from '../img/img.js'; 
import { TweenMax, TimelineLite } from "gsap/all";
import utils from './utils';


const GameGrid = (props) => {
    let containerGameGrid = useRef(null);
    let allowClick = true;
  
    //get random type element from utils.elements obj
    const randomChoice = () => {
      const getRandomElement = utils.elements[Math.floor(Math.random() * utils.elements.length)];
      return getRandomElement;
    }
  
    useEffect(() => {
      TweenMax.to(containerGameGrid, 1, {opacity: 1});
    });
  
    const onClickEvent = (event, el) => {
      const element = event.target;
      //array for all elements that should hide for animation
      const hideElements = [];
      for(let i=0; i<containerGameGrid.children.length; i++){
        if(containerGameGrid.children[i]!==element){
          hideElements.push(containerGameGrid.children[i]);
        }
      }
      //animation...
      const tl = new TimelineLite({onComplete: () => {
        TweenMax.to(element, .3, {opacity: 0, onComplete: () => {
          const obj = element.getBoundingClientRect();
          const objEl = {};
          objEl.lastChoice = el;
          objEl.randomChoice = randomChoice();
          props.handleClick(objEl, obj);
        }})
      }});
      tl.to(element, .2, {opacity: 1});
      tl.fromTo(element, .5,{scale:1},{scale:1.1, repeat:1, yoyo: true});
      tl.to(hideElements, .3,{opacity: 0});
    }
  
    return(
    <div className='gameGrid' ref={div => containerGameGrid = div}>
      {utils.elements
        .map(
          el => 
            <img 
              src={gameImg[el].default} 
              alt={el} 
              key={el}  
              onClick={ (event) => { if(allowClick){ allowClick = false; onClickEvent(event, el);} }} 
            />
          )}
    </div>
    );
}
export default GameGrid;