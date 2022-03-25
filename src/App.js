import { useState,  useEffect } from "react";
import Form from "./components/form/Form";
import Answer from "./components/answer/Answer";
import SignIn from "./components/signIn/SignIn";


function App() {

const [userData, setUserData] = useState();
const [isValid, setIsValid] = useState(false);
const [signIn, setSignIn] = useState(false);

useEffect(() => {
  const infoAboutUserLog = localStorage.getItem('isLoggedIn');
  if(infoAboutUserLog === 'loggedIn'){
    setSignIn(true);
  }
},[]);

const getUserDataHandler = (data) => {
    setUserData(data);
}
const validHandler = (value) => {
  setIsValid(value);
}
const signInHandler = (login) => {
  localStorage.setItem('isLoggedIn', 'loggedIn')
  setSignIn(login);
}
const signOutHandler = (login) => {
  localStorage.removeItem('isLoggedIn');
  setSignIn(login);
}

  return (
    <div>
     {!signIn && <SignIn onSignIn={signInHandler}/>}
     {signIn && <Form onSendUserData={getUserDataHandler} onValid={validHandler} onSignOut={signOutHandler}/>}
      {isValid && <Answer data={userData}/>}
     
    </div>
  );
}

export default App;
