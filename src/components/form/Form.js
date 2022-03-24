import { useState } from "react";

import Button from "../UI/Button";
import classes from "./form.module.css";

const Form = (props) => {
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredCiggaretsPerDay, setEnteredCiggaretsPerDay] = useState("");
  const [enteredCiggaretsInOnePacket, setEnteredCiggaretsInOnePacket] =
    useState("");
  const [enteredValue, setEnteredValue] = useState("");
  const [enteredCurrency, setEnteredCurrency] = useState("PLN");

  const dateChangeHandler = (e) => {
    setEnteredDate(e.target.value);
  };
  const ciggaretsPerDayChangeHandler = (e) => {
    setEnteredCiggaretsPerDay(e.target.value);
  };
  const CiggaretsInOnePacketChangeHandler = (e) => {
    setEnteredCiggaretsInOnePacket(e.target.value);
  };
  const valueChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };
  const currencyChangeHandler = (e) => {
    setEnteredCurrency(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
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
          value={enteredDate}
          type="date"
          id="date"
          onChange={dateChangeHandler}
        />
      </div>
      <div className={classes.smallContainer}>
        <label htmlFor="many">How many cigarettes you smoke in one day?</label>
        <input
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
          value={enteredCiggaretsInOnePacket}
          type="number"
          id="ciggraretes"
          min="5"
          max="25"
          step="1"
          onChange={CiggaretsInOnePacketChangeHandler}
        />
      </div>
      <div className={classes.smallContainer}>
        <label htmlFor="packet">How much money is one packet?</label>
        <div className={classes.price}>
          <input
            value={enteredValue}
            type="number"
            id="packet"
            min="1"
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
