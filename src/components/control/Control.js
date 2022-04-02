import { useEffect, useState } from "react";
import classes from "./control.module.css";
import { db } from "../../firebase-config";
import { updateDoc, doc } from "firebase/firestore";

const Control = (props) => {
  const [userId, setUserId] = useState("");
  const [thankYou, setThankYou] = useState(false);
  const [name, setName] = useState("visitor");
  const [haveAccount, setHaveAccount] = useState(true);

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
    console.log(props.data);
    const saveData = { data: props.data };
    await updateDoc(userDoc, saveData);
    setThankYou(true);
  };

  const updateUserHandler = () => {
    props.onShowAnswerForLoggedUser(false);
    props.onFormOpen();
  };

  return (
    <>
      <div className={classes.container}>
        <p>{`hello --- ${name} 👋`}</p>
        <div className={classes.btnContainer}>
          {props.save && haveAccount && (
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
          {props.update && haveAccount && (
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
      {props.save && !thankYou && haveAccount && (
        <p className={classes.pleasSaved}>
          Your Change is not saved pleas do it!
        </p>
      )}
      {thankYou && <p className={classes.saved}>Your Change is saved</p>}
    </>
  );
};

export default Control;
