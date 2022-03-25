import { useState,  useEffect } from "react";
import Form from "./components/form/Form";
import Answer from "./components/answer/Answer";
import SignIn from "./components/signIn/SignIn";
import Create from "./components/create/Create";


function App() {

const [userData, setUserData] = useState();
const [isValid, setIsValid] = useState(false);
const [signIn, setSignIn] = useState(false);
const [create, setCreate] = useState(false);

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
const createAccountHandler = (create) => {
  setCreate(create);
}
const backHandler = (create) => {
  setCreate(create);
}

  return (
    <div>
     {create && <Create onBack={backHandler}/>}
     {!signIn && !create && <SignIn onSignIn={signInHandler} onCreate={createAccountHandler}/>}
     {signIn && <Form onSendUserData={getUserDataHandler} onValid={validHandler} onSignOut={signOutHandler}/>}
      {isValid && <Answer data={userData}/>}
     
    </div>
  );
}

export default App;
