import { useState, useEffect } from "react";
import useInput from "../hooks/use-input";
import Button from "../UI/Button";
import classes from "./SignIn.module.css";

import { db } from "../../firebase-config";

import { collection, getDocs } from "firebase/firestore";

const SignIn = (props) => {
  const [users, setUseres] = useState([]);
  const [haveAccount, setHaveAccount] = useState(true);
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      const snapshot = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setUseres(snapshot);
      console.log(snapshot);
    };
    getUsers();
  }, []);

  const {
    value: enteredLogin,
    isValid: enteredLoginIsValid,
    hasError: loginInputHasError,
    valueChangeHandler: loginChangedHandler,
    inputBlurHandler: loginBlurHandler,
    reset: resetLoginInput,
  } = useInput((value) => value.trim() !== "");

  useEffect(() => {
    setHaveAccount(true);
  }, [enteredLogin]);

  const {
    value: enteredPasword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== "");

  useEffect(() => {
    setHaveAccount(true);
  }, [enteredPasword]);

  let signInIsValid = false;

  const signInHandler = (e) => {
    e.preventDefault();
    users.forEach((el) => {
      if (
        el.login === enteredLogin &&
        el.password === enteredPasword &&
        enteredLoginIsValid &&
        enteredPasswordIsValid
      ) {
        props.onLoggedUserInfo(el.login, el.id, el.data);
        signInIsValid = true;
        if (el.data.value !== "") {
          props.onShowAnswerForLoggedUser(true);
        }
      }
    });

    if (!signInIsValid) {
      setHaveAccount(false);
      return;
    }
    setHaveAccount(true);
    props.onSignIn(signInIsValid);
    resetLoginInput();
    resetPasswordInput();
  };
  const createAccountHandler = (e) => {
    e.preventDefault();
    props.onCreate(true);
  };

  const justUseHandler = (e) => {
    e.preventDefault();
    props.onUseWithOutSignIn();
    props.onFormOpen();
  };

  return (
    <div>
      <form className={classes.formContainer} onSubmit={signInHandler}>
        <h3>Quite - smoking</h3>
        <label htmlFor="login">Login</label>
        <input
          value={enteredLogin}
          type="text"
          id="login"
          onBlur={loginBlurHandler}
          onChange={loginChangedHandler}
          className={`${loginInputHasError ? classes.invalid : ""}`}
        />
        {loginInputHasError && (
          <p className={classes.errorM}>Can't be empty.</p>
        )}
        <label htmlFor="password">Password</label>
        <input
          value={enteredPasword}
          type="password"
          id="password"
          onBlur={passwordBlurHandler}
          onChange={passwordChangedHandler}
          className={`${passwordInputHasError ? classes.invalid : ""}`}
        />
        {passwordInputHasError && (
          <p className={classes.errorM}>Can't be empty.</p>
        )}
        {!haveAccount && (
          <p className={classes.errorM}>
            You don't have account or you enter wrong login or password.😿
          </p>
        )}
        <div className={classes.container}>
          <Button type="submit" className={classes.signIn}>
            sign in
          </Button>
          <Button className={classes.create} onClick={createAccountHandler}>
            Create Account
          </Button>
          <Button onClick={justUseHandler}>Use without sign in</Button>
        </div>
        <div className={classes.info}>
          <p>
            Remember this is dummy app don use real password and userName!!!
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
