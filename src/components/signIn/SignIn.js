import { useEffect, useState } from "react";

import useInput from "../hooks/use-input";
import Button from "../UI/Button";
import classes from "./SignIn.module.css";

const SignIn = (props) => {
  const loadedData = [];
  const [haveAccount, setHaveAccount] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-ef836-default-rtdb.europe-west1.firebasedatabase.app/quite.json"
      );
      const responseData = await response.json();

      for (const key in responseData) {
        loadedData.push({
          login: responseData[key].userLogin,
          password: responseData[key].userPassword,
        });
      }
    };
    fetchData();
  });
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
    loadedData.forEach((el) => {
      if (
        el.login === enteredLogin &&
        el.password === enteredPasword &&
        enteredLoginIsValid &&
        enteredPasswordIsValid
      ) {
        signInIsValid = true;
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
          <p className={classes.errorM}>
            Can't be empty.
          </p>
        )}
        {!haveAccount && (
          <p className={classes.errorM}>
            You don't have account or you enter wrong login or password.😿
          </p>
        )}
        <div>
          <Button type="submit" className={classes.signIn}>
            sign in
          </Button>
          <Button className={classes.create} onClick={createAccountHandler}>
            Create Account
          </Button>
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
