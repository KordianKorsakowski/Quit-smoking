import useInput from "../hooks/use-input";
import Button from "../UI/Button";
import classes from "./SignIn.module.css";

const SignIn = (props) => {
    
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

  let signInIsValid = false;

  if(enteredLoginIsValid && enteredPasswordIsValid){
    signInIsValid = true;
  }

  const signInHandler = (e) => {
    e.preventDefault();
    if (!signInIsValid) {
      return;
    }
    props.onSignIn(signInIsValid);
    resetLoginInput();
    resetPasswordInput();
  };
  const createAccountHandler = (e) => {
    e.preventDefault();
    props.onCreate(true);
  }


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
          className={`${loginInputHasError ? classes.invalid : ''}`}
        />
        {loginInputHasError && (<p className={classes.errorM}>Can't be empty string</p>)}
        <label htmlFor="password" >Password</label>
        <input
          value={enteredPasword}
          type="password"
          id="password"
          onBlur={passwordBlurHandler}
          onChange={passwordChangedHandler}
          className={`${passwordInputHasError ? classes.invalid : ''}`}
        />
        {passwordInputHasError && (<p className={classes.errorM}>Can't be empty string and must include #</p>)}
        <div>
        <Button type="submit" className={classes.signIn}>sign in</Button>
        <Button className={classes.create} onClick={createAccountHandler}>Create Account</Button>
        </div>
        <div className={classes.info}>
        <p>Remember this is dummy app don use real password and userName!!!</p>
        <p> If you want log in your login cant't be empty and password must include "#"</p>
        </div>
      </form>
      
    </div>
  );
};

export default SignIn;
