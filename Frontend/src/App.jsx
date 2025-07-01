import Header from "./components/Header";
import Input from "./components/Input";
import Getstarted from "./components/Getstarted";
import { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  function handleLogin(value){
    setLoggedIn(value);
  }

  return (
    <>
      <Header />
      {!loggedIn && <Getstarted onConnect={handleLogin}/>}
      {loggedIn && <Input />}
    </>
  );
}

export default App;
