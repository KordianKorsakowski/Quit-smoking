import { useEffect, useState } from "react";
import classes from "./control.module.css";


const Control = (props) => {
  const [haveAccount, setHaveAccount] = useState(true);

  useEffect(() => {
    const infoAboutUserLog = localStorage.getItem("isLoggedIn");
    if (infoAboutUserLog !== "loggedIn") {
      setHaveAccount(false);
    }
  }, []);
  const signOutHandler = (e) => {
    e.preventDefault();
    props.onSignOut(false);
  };
  const deleteHandler = (e) => {
    e.preventDefault();
    props.onConfirm();
  };

  return (
    <div className={classes.container}>
      {haveAccount && <button className={classes.btn}>Save</button>}
      {haveAccount && (
        <button className={classes.btn} onClick={deleteHandler}>
          Delete
        </button>
      )}
      {haveAccount && <button className={classes.btn}>Update</button>}
      <button
        onClick={signOutHandler}
        className={`${classes.btn} ${classes.singout}`}
      >
        {haveAccount ? "sing out" : "back"}
      </button>
    </div>
  );
};

export default Control;
