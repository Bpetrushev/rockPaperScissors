import { TweenMax } from "gsap/all";
import React, {Component} from 'react';

class AlertComponent extends Component{
    constructor(props){
      super(props);
  
      this.container = null;
      this.tl = null;
    }
  
    //handle how to show elements
    componentDidMount(){
      TweenMax.to(this.container, 1, {opacity: 1, top: 10 });
    }
  
    //handle hide
    hideContainer(){
      TweenMax.to(this.container, 1, {opacity: 0, top: -200, onComplete: () => {
        if(this.props.handleClick){
          this.props.handleClick(); 
        }
      }});
    }
  
    render(){
      return(
        <div className='alert' ref={div => this.container = div}>
            {
              typeof this.props.text === "undefined" ? 
                null :
                <div className='textAlert'>
                {this.props.text.show}
                </div> 
            }
          <button onClick={() => {
            this.hideContainer();
          }}>
            {this.props.textBtn.toUpperCase()}
          </button>
        </div>
      )
    }
  }

  export default AlertComponent;