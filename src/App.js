import { useState, useEffect } from "react";
import Form from "./components/form/Form";
import Answer from "./components/answer/Answer";
import SignIn from "./components/signIn/SignIn";
import Create from "./components/create/Create";
import Modal from "./components/modal/Modal";
import Control from "./components/control/Control";
function App() {
  const [userData, setUserData] = useState();
  const [userInfo, setUserInfo] = useState();
  const [isValid, setIsValid] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [create, setCreate] = useState(false);
  const [modalIsValid, setModalIsValid] = useState(false);
  const [loggedUserInfo, setLoggedUserInfo] = useState({});
  const [cotrol, setControl] = useState(false);
  useEffect(() => {
   
    const infoAboutUserLog = localStorage.getItem("isLoggedIn");

    if (infoAboutUserLog === "loggedIn") {
      const info = JSON.parse(localStorage.getItem('info'));
      setLoggedUserInfo({login: info.login, id: info.id});
      setControl(true);
      setSignIn(true);
    } else if(infoAboutUserLog === "quest"){
      setControl(true);
      setSignIn(true);
      console.log('hello');
    };
  }, []);
  
  

  const getUserDataHandler = (data) => {
    setUserData(data);
  };
  const validHandler = (value) => {
    setIsValid(value);
  };
  const signInHandler = (login) => {
    localStorage.setItem("isLoggedIn", "loggedIn");
    setSignIn(login);
    setControl(true);
  };
  const signOutHandler = (login) => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("info");
    
    setSignIn(login);
    setLoggedUserInfo({});
    setIsValid(false);
    setControl(false);
  };
  const createAccountHandler = (create) => {
    setCreate(create);
  };
  const backHandler = (create) => {
    setCreate(create);
  };
  const modalOpenHandler = () => {
    setModalIsValid(true);
  };
  const modalCloseHandler = () => {
    setModalIsValid(false);
  };

  const backToSignInPanelHandler = () => {
    setCreate(false);
    setModalIsValid(false);
    setSignIn(false);
  };
  const getUserInfoHandler = (login, password) => {
    setUserInfo({ login: login, password: password });
  };

  const useWithOutSignInHandler = () => {
    localStorage.setItem("isLoggedIn", "quest");
    setSignIn(true);
    setControl(true);
  };

  const loggedUserInfoHanlder =(login, id) => {
    setLoggedUserInfo({login: login, id: id});
    const info = {
      login : login,
      id : id, 
    }
    localStorage.setItem("info", JSON.stringify(info));
  }


  return (
    <>
      {create && (
        <Create
          onBack={backHandler}
          onConcongratulations={modalOpenHandler}
          onGetUserInfo={getUserInfoHandler}
        />
      )}
      {!signIn && !create && (
        <SignIn
          onSignIn={signInHandler}
          onCreate={createAccountHandler}
          onUseWithOutSignIn={useWithOutSignInHandler}
          onLoggedUserInfo={loggedUserInfoHanlder}
        />
      )}
      {cotrol && <Control onSignOut={signOutHandler} />}
      {signIn && (
        <Form
          onSendUserData={getUserDataHandler}
          onValid={validHandler}
          onSignOut={signOutHandler}
          loggedUserInfo={loggedUserInfo}
        />
      )}
      
      {isValid && signIn && <Answer data={userData} />}
      {modalIsValid && (
        <Modal
          onCloseModal={modalCloseHandler}
          onBackToSignInPanel={backToSignInPanelHandler}
          userInfo={userInfo}
        />
      )}
    </>
  );
}

export default App;
