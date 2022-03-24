import { useState } from "react";

import Button from "../UI/Button";
import classes from "./form.module.css";

const Form = (props) => {
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredDateIsValid, setEnteredDateIsValid] = useState(true);

  const [enteredCiggaretsPerDay, setEnteredCiggaretsPerDay] = useState("");
  const [enteredCiggaretsPerDayIsValid, setEenteredCiggaretsPerDayIsValid] =
    useState(true);

  const [enteredCiggaretsInOnePacket, setEnteredCiggaretsInOnePacket] =
    useState("");
  const [
    enteredCiggaretsInOnePacketIsValid,
    setEnteredCiggaretsInOnePacketIsValid,
  ] = useState(true);

  const [enteredValue, setEnteredValue] = useState("");
  const [enteredValueIsValid, setEnteredValueIsValid] = useState(true);
  
  const [enteredCurrency, setEnteredCurrency] = useState("PLN");

  const [formIsValid, setFormIsValid] = useState(false);

  //get data
  const dateChangeHandler = (e) => {
    if (e.target.value !== "") {
      setEnteredDateIsValid(true);
    }
    setEnteredDate(e.target.value);
  };
  const ciggaretsPerDayChangeHandler = (e) => {
    if (e.target.value !== "") {
      setEenteredCiggaretsPerDayIsValid(true);
    }
    setEnteredCiggaretsPerDay(e.target.value);
  };
  const CiggaretsInOnePacketChangeHandler = (e) => {
    if (e.target.value !== "") {
      setEnteredCiggaretsInOnePacketIsValid(true);
    }
    setEnteredCiggaretsInOnePacket(e.target.value);
  };
  const valueChangeHandler = (e) => {
    if (e.target.value !== "") {
      setEnteredValueIsValid(true);
    }
    setEnteredValue(e.target.value);
  };
  const currencyChangeHandler = (e) => {
    setEnteredCurrency(e.target.value);
  };

  // validation

  const submitHandler = (e) => {
    e.preventDefault();

    if (enteredDate.length !== 10) {
      setEnteredDateIsValid(false);
    }
    if (enteredCiggaretsPerDay === "") {
      setEenteredCiggaretsPerDayIsValid(false);
    }
    if (enteredCiggaretsInOnePacket === "") {
      setEnteredCiggaretsInOnePacketIsValid(false);
    }
    if (enteredValue === "") {
      setEnteredValueIsValid(false);
    }
    if (
      enteredDateIsValid &&
      enteredCiggaretsPerDayIsValid &&
      enteredCiggaretsInOnePacketIsValid &&
      enteredValueIsValid
    ) {
      setFormIsValid(true);
    }
    if (!formIsValid) {
      return;
    }

    const allData = {
      date: new Date(enteredDate),
      CiggaretesPerDay: enteredCiggaretsPerDay,
      CiggaretsInOnePacket: enteredCiggaretsInOnePacket,
      value: enteredValue,
      currency: enteredCurrency,
    };
    props.onSendUserData(allData);

    setEnteredDate("");
    setEnteredCiggaretsPerDay("");
    setEnteredCiggaretsInOnePacket("");
    setEnteredValue("");
    setEnteredCurrency("PLN");
  };

  return (
    <form className={classes.formContainer} onSubmit={submitHandler}>
      <div className={classes.smallContainer}>
        <label htmlFor="date">When you stopped smoking?</label>
        <input
          className={`${enteredDateIsValid ? "" : classes.invalid}`}
          value={enteredDate}
          type="date"
          id="date"
          onChange={dateChangeHandler}
        />
      </div>
      <div className={classes.smallContainer}>
        <label htmlFor="many">How many cigarettes you smoke in one day?</label>
        <input
          className={`${enteredCiggaretsPerDayIsValid ? "" : classes.invalid}`}
          value={enteredCiggaretsPerDay}
          type="number"
          id="many"
          min="1"
          max="99"
          step="1"
          onChange={ciggaretsPerDayChangeHandler}
        />
      </div>
      <div className={classes.smallContainer}>
        <label htmlFor="ciggaretes">
          How many cigarettes are in one packet?
        </label>
        <input
          className={`${
            enteredCiggaretsInOnePacketIsValid ? "" : classes.invalid
          }`}
          value={enteredCiggaretsInOnePacket}
          type="number"
          id="ciggraretes"
          min="1"
          max="25"
          step="1"
          onChange={CiggaretsInOnePacketChangeHandler}
        />
      </div>
      <div className={classes.smallContainer}>
        <label htmlFor="packet">How much money is one packet?</label>
        <div className={classes.price}>
          <input
            className={`${enteredValueIsValid ? "" : classes.invalid}`}
            value={enteredValue}
            type="number"
            id="packet"
            min="1"
            step="0.1"
            onChange={valueChangeHandler}
          />
          <select onChange={currencyChangeHandler}>
            <option value="PLN">PLN</option>
            <option value="$">$</option>
            <option value="€">€</option>
          </select>
        </div>
      </div>
      <Button type="submit">How much money have i saved?</Button>
    </form>
  );
};

export default Form;
