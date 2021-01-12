import './App.css';
import React, {Component} from 'react';
import Header from './Components/Header';
import GameGrid from './Components/GameGrid';
import AlertComponent from './Components/AlertComponent';
import BattleComponent from './Components/BattleComponent';
import Points from './Components/Points';
import Rules from './Components/Rules';

class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      gameState: 'AlertComponent',
      gameLastChoice: null,
      gameLastRandomChoice: null,
    }

    this.positionElement = null;

    this.gamePoints = {player: 0, computer: 0};
    this.gamePointsRef = React.createRef();
  }

  handleAlertComponentButton(){
    this.setState({gameState: 'GameGrid'});
  }

  handleGameGridClick(choice, obj) {
    //get data about position of element in gameGrid and get data about elements
    this.positionElement = obj;
    this.setState({gameState: 'BattleComponent', gameLastChoice: choice.lastChoice, gameLastRandomChoice: choice.randomChoice});
  }

  handlePoints(type){
    //save current state of points in obj "this.gamePoints" and change it in DOM
    if(type){
      let pointsElement = this.gamePointsRef.current.children[0].children[1];
      this.gamePoints.player++;
      pointsElement.textContent = this.gamePoints.player;
    }else{
      let pointsElement = this.gamePointsRef.current.children[1].children[1];
      this.gamePoints.computer++;
      pointsElement.textContent = this.gamePoints.computer;
    }
  }

  //handle which one component to render
  componentManager(type){
    switch(type){
      default: 
      break;
      case 'AlertComponent':
        return (
          <AlertComponent 
            textBtn='start game'
            handleClick={this.handleAlertComponentButton.bind(this)} 
        />); 
      case 'GameGrid':
        return (<GameGrid handleClick={this.handleGameGridClick.bind(this)} />);
      case 'BattleComponent':
          return (<BattleComponent 
          lastChoice={this.state.gameLastChoice} 
          randomChoice={this.state.gameLastRandomChoice}
          positionElement={this.positionElement} 
          pointsState={this.handlePoints.bind(this)} 
          alertComponentNewGame={
            <AlertComponent 
              textBtn='start new game!'
              text={{}} 
              handleClick={this.handleAlertComponentButton.bind(this)}
            />}
          />);
    }
  }

  render(){
    return (    
      <div className='app'>
        <Header />
        {this.state.gameState !=='AlertComponent' ? <Points gamePoints={this.gamePoints} ref={this.gamePointsRef}/> : null}
        {
          this.componentManager(this.state.gameState)
        }
        <Rules />
      </div>
    )

  }

}

export default App;
