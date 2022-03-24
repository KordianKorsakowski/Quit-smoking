

import classes from './answer.module.css';


const Answer = props => {
    const data = props.data;
    
    let days;
    let ciggaretesCounter;
    let savedMoney;
    let currency;

    if(data){
    const currentDate = new Date().getTime();
   
    const quittingDate = data.date.getTime();
    days = Math.round((currentDate - quittingDate) / (1000 * 3600 * 24));

    ciggaretesCounter = days * data.CiggaretesPerDay;
    
    const oneCigarretePrice = data.value / data.CiggaretsInOnePacket;
    savedMoney = oneCigarretePrice * ciggaretesCounter;

    currency = data.currency;
   
    }
    return(
    
        <div className={classes.container}>
            <h3>🎉 Congratulations</h3>
        
        <ul className={classes.list}>
            <li className={classes.element}>🗓 You don't smoke for {days} days</li>
            <li className={classes.element}>🚬 You did't smoke {ciggaretesCounter} ciggaretes</li>
            <li className={classes.element}>💰 You saved {savedMoney} {currency}</li>
        </ul>
        </div>
    )
};

export default Answer;
