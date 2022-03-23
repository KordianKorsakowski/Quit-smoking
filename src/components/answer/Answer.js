import classes from './answer.module.css';

const Answer = props => {
    return(
        <div className={classes.container}>
            <h3>🎉 Congratulations</h3>
        
        <ul className={classes.list}>
            <li className={classes.element}>🗓 You don't smoke for 31 days</li>
            <li className={classes.element}>🚬 You did't smoke 31 ciggaretes</li>
            <li className={classes.element}>💰 You saved 131$</li>
        </ul>
        </div>
    )
};

export default Answer;
