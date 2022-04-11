import { useState, useEffect } from "react";
import classes from "./answer.module.css";

const Answer = (props) => {
  const [loggedUserData, setLoggedUserData] = useState();
  const [logged, setLogged] = useState();
  const [update, setUpdate] = useState(false);
  let data = props.data;

  let days;
  let ciggaretesCounter;
  let savedMoney;
  let currency;

  if (typeof data === "undefined") {
    localStorage.removeItem("update");
  }

  useEffect(() => {
    const infoAboutUserLog = localStorage.getItem("isLoggedIn");
    const updateLsInfo = localStorage.getItem("update");
    if (updateLsInfo === "true") {
      setUpdate(true);
    }

    if (infoAboutUserLog === "loggedIn") {
      const info = JSON.parse(localStorage.getItem("info"));
      setLoggedUserData(info.data);
      if (info.data.CiggaretesPerDay !== "") {
        setLogged(true);
      }
    }
  }, []);
  if (logged && !update) {
    const loggedData = {
      date:
        typeof loggedUserData.date === "object"
          ? new Date(loggedUserData.date.seconds * 1000)
          : new Date(loggedUserData.date),
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
    savedMoney = (oneCigarretePrice * ciggaretesCounter).toFixed(2);

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
