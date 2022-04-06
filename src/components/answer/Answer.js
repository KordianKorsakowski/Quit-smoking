import { useState, useEffect } from "react";
import classes from "./answer.module.css";

const Answer = (props) => {
  const [loggedUserData, setLoggedUserData] = useState();
  const [logged, setLogged] = useState();
  let data = props.data;

  let days;
  let ciggaretesCounter;
  let savedMoney;
  let currency;

  useEffect(() => {
    const infoAboutUserLog = localStorage.getItem("isLoggedIn");

    if (infoAboutUserLog === "loggedIn") {
      const info = JSON.parse(localStorage.getItem("info"));
      setLoggedUserData(info.data);
      if (info.data.CiggaretesPerDay !== "") {
        setLogged(true);
      }
    }
  }, []);
  if (logged) {
    const loggedData = {
      date: new Date(loggedUserData.date.seconds * 1000),
      CiggaretesPerDay: loggedUserData.CiggaretesPerDay,
      currency: loggedUserData.currency,
      value: loggedUserData.value,
      CiggaretsInOnePacket: loggedUserData.CiggaretsInOnePacket,
    };
    data = loggedData;
  }

  if (data) {
    const currentDate = new Date().getTime();

    const quittingDate = data.date.getTime();
    days = Math.round((currentDate - quittingDate) / (1000 * 3600 * 24));

    ciggaretesCounter = days * data.CiggaretesPerDay;

    const oneCigarretePrice = data.value / data.CiggaretsInOnePacket;
    savedMoney = oneCigarretePrice * ciggaretesCounter;

    currency = data.currency;
    data = {};
  }

  return (
    <div className={classes.container}>
      <h3>🎉 Congratulations</h3>

      <ul className={classes.list}>
        <li className={classes.element}>🗓 You don't smoke for {days} days</li>
        <li className={classes.element}>
          🚬 You did't smoke {ciggaretesCounter} ciggaretes
        </li>
        <li className={classes.element}>
          💰 You saved {savedMoney} {currency}
        </li>
      </ul>
    </div>
  );
};

export default Answer;
