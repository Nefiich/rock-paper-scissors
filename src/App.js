
import React, {useState} from 'react';

import './App.css';

import Modal from 'react-modal';


function App() {   

  const [ready, setReady] = useState(false);
  const [userChoiceName, setUserChoiceName] = useState(0);
  const [computerChoiceName, setComputerChoiceName] = useState(0);
  const [result, setResult] = useState('')
  const [score, setScore] = useState(0);
  const [active, setActive] = useState('');
  const [scoringReady, setScoringReady] = useState(false);

  function Icon(props) {
    return(
      
      <div className={"game-button " + props.name}  onClick={props.onClick}>
        <div className="icon-bg">
          <img src={"./icon-"+props.name+".svg"} alt="icon"/>
        </div>
      </div>
    );
  }
  
  function GameStarted(props){
     return(
      <div>
        <div className="game-start desktop">
          <div className="user players">
            <h2 className="title">You picked</h2>
            <Icon name={userChoiceName}/>
          </div>
          {scoringReady ? <Result/> : null}
          <div className="computer players">
            <h2 className="title">computer picked</h2>
            <Icon name={computerChoiceName}/>
          </div>
        </div>
        <h1 className="rules-text " onClick={() => {openModal()}}>Rules</h1>
      </div>
     )
  }
  
  function GameHome(props){
    return(
      <main>
        <div className="game-buttons-wrapper choose">
          <div className="game-triangle game-bg">
            <img src="./bg-triangle.svg" alt="bg"/>
          </div>
          <Icon name="paper" onClick={() => iconClicked(1)}/>
          <Icon name="scissors" onClick={() => iconClicked(2)} />
          <Icon name="rock" onClick={() => iconClicked(3)}/>
          
        </div>
        <div className="rules-text " onClick={() => {openModal()}}>Rules</div>
      </main>
    );
  }

  function Result() {
    result === "LOSE" ? setActive('lose') : setActive("win")
    return(
      <div className="results">
        {result==="DRAW" ? <h1>{result}</h1> : <h1>YOU {result}</h1>}
        <div className={`reset ${active}`} onClick={() => reset()}>PLAY AGAIN</div>
      </div>
    )
  }

  const reset = () =>{
    setUserChoiceName('');
    setComputerChoiceName('');
    setReady(false);
    setScoringReady(false);
  }
  
  const copmuterChoose = () => {


    const computer = Math.floor(Math.random() * 4) + 1;
    if(computer === 1){
      setComputerChoiceName('paper');
    }else if(computer === 2){
      setComputerChoiceName('scissors');
    }else if(computer === 3){
      setComputerChoiceName('rock');
    }else{
      copmuterChoose();
    }

    
    
    return computer;
    
  }

  const iconClicked = async (choice) => {

    if(choice === 1){
      setUserChoiceName('paper');
      setReady(true);
      setScoringReady(true);
      scoring(choice, copmuterChoose());
    }else if(choice === 2){
      setUserChoiceName('scissors');
      setReady(true);
      setScoringReady(true);
      scoring(choice, copmuterChoose());
    }else if(choice === 3){
      setUserChoiceName('rock');
      setReady(true);
      setScoringReady(true);
      scoring(choice, copmuterChoose());
    }
  }

  const scoring = (userChoice, computerChoice) =>{
    if(userChoice === 1 && computerChoice === 3 ||
       userChoice === 2 && computerChoice === 1 ||
       userChoice === 3 && computerChoice === 2)
      { 
       
        setResult("WIN");
        setScore(score+1);
      
      } 
      else if( userChoice === 1 && computerChoice === 2 || 
                 userChoice === 2 && computerChoice === 3 ||
                 userChoice === 3 && computerChoice === 1)
      {
        setResult("LOSE");
        setScore(score-1);

      }else if(userChoice === computerChoice || computerChoice === userChoice){
        setResult("DRAW")
      }
  }



  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '40px',
      borderRadius: '10px'
    },
  };
  
  Modal.setAppElement('#root');

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
   
  }

  function closeModal() {
    setIsOpen(false);
  }
  
  return (
    <div className="App">
      <div className="header">
        <div className="headline">
          <h1 className="headline-text">Rock</h1>
          <h1 className="headline-text">Paper</h1>
          <h1 className="headline-text">Scissors</h1>
        </div>
        <div className="score-container">
          <h1 className="score-text">Score</h1>
          <h1 className="score-number">{score}</h1>
        </div>
      </div>

      {ready ? <GameStarted/> : <GameHome/>}

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Rules modal"
      >
        <div>
          <div style={{display: 'flex', alignItems:'center'}}>
            <h1>RULES</h1>
            <div style={{marginLeft: 'auto'}} onClick={closeModal}><img src="./icon-close.svg" alt="close"/></div>
          </div>
          <img src="./image-rules.svg" alt="rules"/>
        </div>

      </Modal>
    </div>
  );
}

export default App;
