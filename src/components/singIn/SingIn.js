import useInput from "../hooks/use-input";
import Button from "../UI/Button";
import classes from "./SingIn.module.css";

const SingIn = (props) => {
    
  const {
    value: enteredLogin,
    isValid: enteredLoginIsValid,
    hasError: loginInputHasError,
    valueChangeHandler: loginChangedHandler,
    inputBlurHandler: loginBlurHandler,
    reset: resetLoginInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredPasword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.includes('#'));

  let singInIsValid = false;

  if(enteredLoginIsValid && enteredPasswordIsValid){
    singInIsValid = true;
  }

  const singInHandler = (e) => {
    e.preventDefault();
    if (!singInIsValid) {
      return;
    }
    props.onSingIn(singInIsValid);
    resetLoginInput();
    resetPasswordInput();
  };

  return (
    <div>
      <form className={classes.formContainer} onSubmit={singInHandler}>
        <h3>Quite - smoking</h3>
        <label htmlFor="login">Login</label>
        <input
          value={enteredLogin}
          type="text"
          id="login"
          onBlur={loginBlurHandler}
          onChange={loginChangedHandler}
          className={`${loginInputHasError ? classes.invalid : ''}`}
        />
        {loginInputHasError && (<p className={classes.errorM}>Can't be empty string</p>)}
        <label>Password</label>
        <input
          value={enteredPasword}
          type="password"
          id="login"
          onBlur={passwordBlurHandler}
          onChange={passwordChangedHandler}
          className={`${passwordInputHasError ? classes.invalid : ''}`}
        />
        {passwordInputHasError && (<p className={classes.errorM}>Can't be empty string and must include #</p>)}
        <Button type="submit" className={classes.singIn}>sing in</Button>
        <div className={classes.info}>
        <p>Remember this is dummy app don use real password and userName!!!</p>
        <p> If you want log in your login cant't be empty and password must include "#"</p>
        </div>
      </form>
      
    </div>
  );
};

export default SingIn;
