import Header from "./components/Header";
import Input from "./components/Input";
import Getstarted from "./components/Getstarted";
import Help from "./components/Help";
import { useState, useRef } from "react";
import Template from "./components/Template";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [clickedGetStarted, setClickedGetStarted] = useState(false);
  const inputBoxRef = useRef();
  function handleLogin(value) {
    setLoggedIn(value);
  }

  function handleClick(){
    setClickedGetStarted(true);
  }

  return (
    <>
      <Header />
      {loggedIn && (
        <>
          <Getstarted onClick={handleClick} onConnect={handleLogin} />
          {!clickedGetStarted && <Help />}
        </>
      )}
      {!loggedIn && <div className="inputScreen">
        <Template inputBoxRef={inputBoxRef}/>
        <Input inputBoxRef={inputBoxRef}/>
        </div>}
    </>
  );
}

export default App;
