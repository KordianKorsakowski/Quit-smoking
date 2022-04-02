import { useEffect, useState } from "react";
import useInput from "../hooks/use-input";
import Button from "../UI/Button";
import classes from "./create.module.css";

import { db } from "../../firebase-config";

import { collection, addDoc, getDocs } from "firebase/firestore";

const Create = (props) => {
  const [checkLogin, setCheckLogin] = useState(true);
  const [users, setUseres] = useState([]);
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
    setCheckLogin(true);
  }, [enteredLogin]);

  const {
    value: enteredPasword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredCheck,
    isValid: enteredCheckIsValid,
    hasError: checkInputHasError,
    valueChangeHandler: checkChangedHandler,
    inputBlurHandler: checkBlurHandler,
    reset: resetCheckInput,
  } = useInput((value) => value.trim() !== "");

  const createUser = async () => {
    await addDoc(usersCollectionRef, {
      login: enteredLogin,
      password: enteredPasword,
      data: {
        date: '' ,
        CiggaretesPerDay:'' ,
        CiggaretsInOnePacket:'' ,
        value:'' ,
        currency:'' 
      },
    });
  };

  let createAccountIsValid = false;
  if (enteredLoginIsValid && enteredPasswordIsValid && enteredCheckIsValid) {
    createAccountIsValid = true;
  }

  const createAccountHandler = (e) => {
    e.preventDefault();
    users.forEach((el) => {
      if (el.login === enteredLogin) {
        createAccountIsValid = false;
        setCheckLogin(false);
      }
    });

    if (!createAccountIsValid) {
      return;
    }
    if (enteredPasword !== enteredCheck) {
      resetCheckInput();
      resetPasswordInput();
      return;
    }
    createUser();
    resetLoginInput();
    resetPasswordInput();
    resetCheckInput();
    props.onGetUserInfo(enteredLogin, enteredPasword);
    props.onConcongratulations();
  };

  const backHandler = (e) => {
    e.preventDefault();
    props.onBack(false);
  };

  return (
    <div>
      <form className={classes.formContainer} onSubmit={createAccountHandler}>
        <h3>Create your Account</h3>
        {!checkLogin && (
          <p className={classes.errorM}>
            This Login exist. Please choose a different name 😇
          </p>
        )}
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
          <p className={classes.errorM}>Can't be empty string.</p>
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
          <p className={classes.errorM}>Can't be empty string.</p>
        )}

        <label htmlFor="check">Repeat Password</label>
        <input
          value={enteredCheck}
          type="password"
          id="check"
          onBlur={checkBlurHandler}
          onChange={checkChangedHandler}
          className={`${checkInputHasError ? classes.invalid : ""}`}
        />
        {checkInputHasError && (
          <p className={classes.errorM}>Can't be empty string.</p>
        )}

        <div>
          <Button className={classes.create} type="submit">
            Create Account
          </Button>
          <Button className={classes.back} onClick={backHandler}>
            Back
          </Button>
        </div>

        <div className={classes.info}>
          <p>
            Remember this is dummy app don't use real password and userName!!!
          </p>
          <p> If you want sign in Create Account with fake date.</p>
          <p> All information will be sotred in FireBase </p>
          <p> So you can back and check how money you save !!!</p>
        </div>
      </form>
    </div>
  );
};

export default Create;
