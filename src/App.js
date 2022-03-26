import { useState, useEffect } from "react";
import Form from "./components/form/Form";
import Answer from "./components/answer/Answer";
import SignIn from "./components/signIn/SignIn";
import Create from "./components/create/Create";
import Modal from "./components/modal/Modal";

function App() {
  const [userData, setUserData] = useState();
  const [userInfo, setUserInfo] = useState();
  const [isValid, setIsValid] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [create, setCreate] = useState(false);
  const [modalIsValid, setModalIsValid] = useState(false);
  // const [firebaseUserInfo, setFirebaseUserInfo] = useState();

  useEffect(() => {
    const infoAboutUserLog = localStorage.getItem("isLoggedIn");
    if (infoAboutUserLog === "loggedIn") {
      setSignIn(true);
    }
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
  };
  const signOutHandler = (login) => {
    localStorage.removeItem("isLoggedIn");
    setSignIn(login);
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
        <SignIn onSignIn={signInHandler} onCreate={createAccountHandler} />
      )}
      {signIn && (
        <Form
          onSendUserData={getUserDataHandler}
          onValid={validHandler}
          onSignOut={signOutHandler}
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
