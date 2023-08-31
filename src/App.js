import "./App.css";
import goat1 from "./MetroGoat/goat-removebg-preview.png";
import goat2 from "./MetroGoat/goat2-removebg-preview.png";
import scream from "./MetroGoat/GoatScream.mp3";
import { useState, useEffect } from "react";

function App() {
  const [switchOn, setSwitchOn] = useState(false);
  const [buttonText, setButtonText] = useState("TURN ON");
  const [speed, setSpeed] = useState(2);
  const [displaySpeed, setDisplaySpeed] = useState(0);

  const [screamer] = useState(new Audio(scream));

  const playSound = () => {
    screamer.playbackRate = 7;
    screamer.play();
  };
  const stopSound = () => {
    screamer.pause();
    screamer.currentTime = 0;
  };

  useEffect(() => {
    let interval;

    if (switchOn) {
      interval = setInterval(() => {
        playSound();
      }, speed * 500);
    } else {
      stopSound();
    }

    return () => {
      clearInterval(interval);
      stopSound();
    };
  }, [switchOn, speed]);

  const flickSwitch = () => {
    setSwitchOn(!switchOn);
    buttonText === "TURN ON"
      ? setButtonText("TURN OFF")
      : setButtonText("TURN ON");
  };

  const decreaseSpeed = () => {
    setSpeed(speed + 0.5);
    setDisplaySpeed(displaySpeed - 1);
  };
  const increaseSpeed = () => {
    if (speed === 0.5) {
      setSpeed(speed);
      setDisplaySpeed(displaySpeed);
    } else if (speed > 0.5) {
      setSpeed(speed - 0.5);
      setDisplaySpeed(displaySpeed + 1);
    }
  };

  return (
    <div className="App">
      <h1 className="header">GOATRANOME</h1>
      <div className="metronomeAndPics">
        <img
          className={!switchOn ? "goata" : "goatb"}
          src={goat2}
          style={{ animationDuration: speed + "s" }}
          alt="goat1"
        />
        <img
          className={!switchOn ? "pic" : "picMove"}
          style={{ animationDuration: speed + "s" }}
          alt="metronome"
        />
        <img
          className={!switchOn ? "goat1" : "goat2"}
          src={goat1}
          style={{ animationDuration: speed + "s" }}
          alt="goat1"
        />
      </div>
      <div className="speedDisplay">
        <button className="speedVolume" onClick={increaseSpeed}>
          +
        </button>

        <h1 className={!switchOn ? "speedtext" : "speedtextActive"}>
          {displaySpeed}
        </h1>

        <button className="speedVolume" onClick={decreaseSpeed}>
          -
        </button>
      </div>

      <button className="startButton" onClick={flickSwitch}>
        {buttonText}
      </button>
    </div>
  );
}

export default App;
