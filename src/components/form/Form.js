import { useState } from "react";
import useInput from "../hooks/use-input";
import Button from "../UI/Button";
import classes from "./form.module.css";

const Form = (props) => {
  const [enteredCurrency, setEnteredCurrency] = useState("PLN");
  const {
    value: enteredDate,
    isValid: enteredDateIsValid,
    hasError: dateInputHasError,
    valueChangeHandler: dateChangedHandler,
    inputBlurHandler: dateBlurHandler,
    reset: resetDateInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredCiggaretsPerDay,
    isValid: enteredCiggaretsPerDayIsValid,
    hasError: ciggaretsPerDayInputHasError,
    valueChangeHandler: ciggaretsPerDayChangedHandler,
    inputBlurHandler: ciggaretsPerDayBlurHandler,
    reset: resetCiggaretsPerDayInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredCiggaretsInOnePacket,
    isValid: enteredCiggaretsInOnePacketIsValid,
    hasError: ciggaretsInOnePacketInputHasError,
    valueChangeHandler: ciggaretsInOnePacketChangedHandler,
    inputBlurHandler: ciggaretsInOnePacketBlurHandler,
    reset: resetCiggaretsInOnePacketInput,
  } = useInput((value) => value.trim() !== '');
  const {
    value: enteredValue,
    isValid: enteredValueIsValid,
    hasError: valueInputHasError,
    valueChangeHandler: valueChangedHandler,
    inputBlurHandler: valueBlurHandler,
    reset: resetValueInput,
  } = useInput((value) => value.trim() !== '');

  let formIsValid = false;

  if(enteredDateIsValid && enteredCiggaretsPerDayIsValid && enteredCiggaretsInOnePacketIsValid && enteredValueIsValid){
    formIsValid = true;
  }

  const currencyChangedHandler = (e) => {
    setEnteredCurrency(e.target.value);
  };


  const submitHandler = (e) => {
    e.preventDefault();
    
    if(!formIsValid){
      props.onValid(formIsValid);
      return;
    }

    const allData = {
      date: new Date(enteredDate),
      CiggaretesPerDay: enteredCiggaretsPerDay,
      CiggaretsInOnePacket: enteredCiggaretsInOnePacket,
      value: enteredValue,
      currency: enteredCurrency,
    };

    props.onValid(formIsValid);
    props.onSendUserData(allData);

    resetDateInput();
    resetCiggaretsPerDayInput();
    resetCiggaretsInOnePacketInput();
    resetValueInput();
    setEnteredCurrency("PLN");
  };

  const allError = dateInputHasError && ciggaretsPerDayInputHasError && ciggaretsInOnePacketInputHasError && valueInputHasError;

  return (

    <form className={classes.formContainer} onSubmit={submitHandler}>
      <h3> Hello {props.loggedUserInfo.login}!👋</h3>
      <div className={classes.smallContainer}>
        <label htmlFor="date">When you stopped smoking?</label>
        <input
        className={`${dateInputHasError ? classes.invalid : ''}`}
          value={enteredDate}
          type="date"
          id="date"
          onChange={dateChangedHandler}
          onBlur={dateBlurHandler}
        />
      </div>
      <div className={classes.smallContainer}>
        <label htmlFor="many">How many cigarettes you smoke in one day?</label>
        <input
          className={`${ciggaretsPerDayInputHasError ? classes.invalid : ''}`}
          value={enteredCiggaretsPerDay}
          type="number"
          id="many"
          min="1"
          max="99"
          step="1"
          onChange={ciggaretsPerDayChangedHandler}
          onBlur={ciggaretsPerDayBlurHandler}
        />
      </div>
      <div className={classes.smallContainer}>
        <label htmlFor="ciggaretes">
          How many cigarettes are in one packet?
        </label>
        <input
         className={`${ciggaretsInOnePacketInputHasError ? classes.invalid : ''}`}
          value={enteredCiggaretsInOnePacket}
          type="number"
          id="ciggraretes"
          min="1"
          max="25"
          step="1"
          onChange={ciggaretsInOnePacketChangedHandler}
          onBlur={ciggaretsInOnePacketBlurHandler}
        />
      </div>
      <div className={classes.smallContainer}>
        <label htmlFor="packet">How much money is one packet?</label>
        <div className={classes.price}>
          <input
            className={`${valueInputHasError ? classes.invalid : ''}`}
            value={enteredValue}
            type="number"
            id="packet"
            min="1"
            step="0.1"
            onChange={valueChangedHandler}
            onBlur={valueBlurHandler}
          />
          <select onChange={currencyChangedHandler}>
            <option value="PLN">PLN</option>
            <option value="$">$</option>
            <option value="€">€</option>
          </select>
        </div>
      </div>
      <Button type="submit">How much money have i saved?</Button>
      {allError && (<p className={classes.errorM}>You can't leave epmty filed</p>)}
    </form>
  );
};

export default Form;
