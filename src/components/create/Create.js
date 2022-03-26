import { useState } from "react";
import useInput from "../hooks/use-input";
import Button from "../UI/Button";
import classes from "./create.module.css";

const Create = (props) => {
  const [compare, setCompare] = useState(true);
  const {
    value: enteredLogin,
    isValid: enteredLoginIsValid,
    hasError: loginInputHasError,
    valueChangeHandler: loginChangedHandler,
    inputBlurHandler: loginBlurHandler,
    reset: resetLoginInput,
  } = useInput((value) => value.trim() !== "");

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

  const matchErrorRestHandler = () => {
    setCompare(true);
  };

  let createAccountIsValid = false;
  if (enteredLoginIsValid && enteredPasswordIsValid && enteredCheckIsValid) {
    createAccountIsValid = true;
  }

  const createAccountHandler = (e) => {
    e.preventDefault();

    if (!createAccountIsValid) {
      return;
    }
    if (enteredPasword !== enteredCheck) {
      setCompare(false);
      resetCheckInput();
      resetPasswordInput();
      return;
    }
    setCompare(true);
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
          type="text"
          id="password"
          onBlur={passwordBlurHandler}
          onChange={passwordChangedHandler}
          onClick={matchErrorRestHandler}
          className={`${passwordInputHasError ? classes.invalid : ""} ${
            !compare ? classes.invalid : ""
          }`}
        />
        {passwordInputHasError && (
          <p className={classes.errorM}>Can't be empty string.</p>
        )}
        {!compare && (
          <p className={classes.errorM}>Try again. Passwords don't match.</p>
        )}
        <label htmlFor="check">Repeat Password</label>
        <input
          value={enteredCheck}
          type="text"
          id="check"
          onBlur={checkBlurHandler}
          onChange={checkChangedHandler}
          onClick={matchErrorRestHandler}
          className={`${checkInputHasError ? classes.invalid : ""} ${
            !compare ? classes.invalid : ""
          }`}
        />
        {checkInputHasError && (
          <p className={classes.errorM}>Can't be empty string.</p>
        )}
        {!compare && (
          <p className={classes.errorM}>Try again. Passwords don't match.</p>
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
