import { useState,  useEffect } from "react";
import Form from "./components/form/Form";
import Answer from "./components/answer/Answer";
import SingIn from "./components/singIn/SingIn";


function App() {

const [userData, setUserData] = useState();
const [isValid, setIsValid] = useState(false);
const [singIn, setSingIn] = useState(false);

useEffect(() => {
  const infoAboutUserLog = localStorage.getItem('isLoggedIn');
  if(infoAboutUserLog === 'loggedIn'){
    setSingIn(true);
  }
},[]);

const getUserDataHandler = (data) => {
    setUserData(data);
}
const validHandler = (value) => {
  setIsValid(value);
}
const singInHandler = (login) => {
  localStorage.setItem('isLoggedIn', 'loggedIn')
  setSingIn(login);
}
const singOutHandler = (login) => {
  localStorage.removeItem('isLoggedIn');
  setSingIn(login);
}

  return (
    <div>
     {!singIn && <SingIn onSingIn={singInHandler}/>}
     {singIn && <Form onSendUserData={getUserDataHandler} onValid={validHandler} onSingOut={singOutHandler}/>}
      {isValid && <Answer data={userData}/>}
     
    </div>
  );
}

export default App;
