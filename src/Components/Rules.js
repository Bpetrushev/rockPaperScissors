import React, {useEffect, useRef} from 'react';
import gameImg from '../img/img.js'; 
import { TweenMax } from "gsap/all";


const Rules = () => {
    let icon = useRef(null);
    let popUp = useRef(null);

    const popUpStatus = {
      isRunning: false,
      isOpenPopUp: false,
      countRunning: 0,
      //check if running and do some stuff
      checkRuning() {
        this.countRunning++;
        //check if runing is over
        if(this.countRunning>=2){
          this.isRunning=false;
          this.countRunning=0;

          //control popUp status and events by status
          this.isOpenPopUp = !this.isOpenPopUp;
          this.isOpenPopUp ?
            document.addEventListener('mousedown', handleClickOutside):
            document.removeEventListener('mousedown', handleClickOutside);
        }
      } 
    }

    useEffect(() => {
      const iconSize = {
        height: icon.getClientRects()[0].height,
        width: icon.getClientRects()[0].width,
      };
      
      //set position for icon
      icon.style.top = `calc(100% - ${iconSize.height*1.2}px)`;
      icon.style.left = `calc(100% - ${iconSize.width*1.2}px)`;
    });
    
    //animation for icon by status of component
    const managerIcon = (prop) => {
      TweenMax.to(icon, .3, {scale: prop.scale, color: prop.color, onComplete: () =>{
        popUpStatus.checkRuning();
      }});
    }

    //animation for popUp by status of component
    const managerPopUp = (prop) => {
      if(!popUpStatus.isOpenPopUp){popUp.style.display = prop.display;}
      TweenMax.to(popUp, .3, {opacity: prop.opacity, onComplete: () => {
        if(popUpStatus.isOpenPopUp){popUp.style.display = prop.display;}
        popUpStatus.checkRuning();
      }});

    }
    
    const handleClickOutside = (e) => {
      const elT = e.target
      const childEl = [];
  
      //add all child element from popUp to arr 
      for(let i=0; i<popUp.children.length; i++){
        childEl.push(popUp.children[i]);
      }
  
      //check for outSideclick
      if(elT !== popUp && !childEl.includes(elT) && elT !==icon)
      {controlManager();}
    }

    const controlManager = () => {
      if(!popUpStatus.isRunning){
        /* start popUp animation and set isRunning true */
        popUpStatus.isRunning = true;

        const prop ={
          display: popUpStatus.isOpenPopUp ? 'none' : 'block',
          opacity: popUpStatus.isOpenPopUp ? 0 : 1,
          color: popUpStatus.isOpenPopUp ? '#fff' : '#000',
          scale: popUpStatus.isOpenPopUp ? 1 : 1.1,
        }
        managerIcon(prop);
        managerPopUp(prop);
        
      }
    }
  
    return(
      <div className="rulesComponent">
        <div className="rulesIcon" ref={ref => icon=ref} onClick={controlManager} >R</div>
        <div className="rulesPopUp" ref={ref => popUp=ref} >
          <h1 className="title">RULES</h1>
          <img src={gameImg.Rules.default} alt="RulesPopUp" />
          <div className="btn-close" onClick={controlManager} >X</div>
        </div>
      </div>
    )
  }

  export default Rules;