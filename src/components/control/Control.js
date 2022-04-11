import { useEffect, useState } from "react";
import classes from "./control.module.css";
import { db } from "../../firebase-config";
import { updateDoc, doc } from "firebase/firestore";

const Control = (props) => {
  const [userId, setUserId] = useState("");
  const [thankYou, setThankYou] = useState(false);
  const [name, setName] = useState("Visitor");
  const [haveAccount, setHaveAccount] = useState(true);
  const [showBtnSave, setShowBtnSave] = useState(true);
  const [showBtnUpdate, setShowBtnUpdate] = useState(true);

  useEffect (() => {
      if(props.save){
        setShowBtnSave(true);
      }
  },[props.save]);

  useEffect(() => {
    const infoAboutUserLog = localStorage.getItem("isLoggedIn");
    if (infoAboutUserLog !== "loggedIn") {
      setHaveAccount(false);
    }
  }, []);

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem("info"));
    if (info !== null) {
      setName(info.login);
      setUserId(info.id);
    }
  }, []);

  const signOutHandler = (e) => {
    e.preventDefault();
    props.onSignOut(false);
    props.onShowAnswerForLoggedUser(false);
    props.onSave(false);
  };
  const deleteHandler = (e) => {
    e.preventDefault();
    props.onConfirm();
  };

  const saveUser = async () => {
    const userDoc = doc(db, "users", userId);
    const saveData = { data: props.data };
    props.onLoggedUserInfo(name, userId, props.data)
    await updateDoc(userDoc, saveData);
    localStorage.removeItem('update');
    localStorage.removeItem('showSaveBTN');
    setShowBtnSave(false);
    setShowBtnUpdate(true);
    setThankYou(true);
    props.onSave(false);
  };

  const updateUserHandler = () => {
    props.onShowAnswerForLoggedUser(false);
    props.closeAnswer(false);
    props.onFormOpen();
    localStorage.setItem('update','true');
    setShowBtnUpdate(false);
    setThankYou(false);
  };
  
  return (
    <>
      <div className={classes.container}>
        <p className={classes.welcome}>{`WELCOME --- ${name} 👋`}</p>
        <div className={classes.btnContainer}>
          {props.save && haveAccount && showBtnSave && (
            <button
              className={`${classes.btn} ${props.save ? classes.save : ""}`}
              onClick={saveUser}
            >
              Save your Changes!
            </button>
          )}
          {haveAccount && (
            <button className={classes.btn} onClick={deleteHandler}>
              Delete Account
            </button>
          )}
          {haveAccount && showBtnUpdate &&(
            <button className={classes.btn} onClick={updateUserHandler}>
              Update
            </button>
          )}
          <button
            onClick={signOutHandler}
            className={`${classes.btn} ${classes.singout}`}
          >
            {haveAccount ? "sing out" : "back"}
          </button>
        </div>
      </div>
      {props.save && !thankYou && haveAccount && showBtnSave && (
        <p className={classes.pleasSaved}>
          Your Change is not saved pleas do it!
        </p>
      )}
      {thankYou && <p className={classes.saved}>Your Change is saved</p>}
    </>
  );
};

export default Control;
