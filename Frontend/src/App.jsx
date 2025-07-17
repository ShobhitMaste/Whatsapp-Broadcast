import Header from "./components/Header";
import Input from "./components/Input";
import Getstarted from "./components/Getstarted";
import Help from "./components/Help";
import { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [clickedGetStarted, setClickedGetStarted] = useState(false);

  function handleLogin(value) {
    setLoggedIn(value);
  }

  function handleClick(){
    setClickedGetStarted(true);
  }

  return (
    <>
      <Header />
      {!loggedIn && (
        <>
          <Getstarted onClick={handleClick} onConnect={handleLogin} />
          {!clickedGetStarted && <Help />}
        </>
      )}
      {loggedIn && <Input />}
    </>
  );
}

export default App;
