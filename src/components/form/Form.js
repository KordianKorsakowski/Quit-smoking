import Button from "../UI/Button";
import classes from './form.module.css';
const Form = (props) => {
  return (
    <form className={classes.formContainer}>
      <div className={classes.smallContainer}>
        <label htmlFor="date">When you stopped smoking?</label>
        <input type="date" id="date" />
      </div>
      <div className={classes.smallContainer}>
      <label htmlFor="many">How many cigarettes you smoke in one day?</label>
        <input type="number" id="many" min='1' max='99' step='1' />
      </div>
      <div className={classes.smallContainer}>
      <label htmlFor="ciggaretes">How many cigarettes are in one packet?</label>
        <input type="number" id="ciggraretes" min='5' max='25' step='1' />
      </div>
      <div className={classes.smallContainer}>
      <label htmlFor="packet">How much money is one packet?</label>
      <div className={classes.price}>
        <input type="number" id="packet" min='1' />
        <select>
            <option value='PLN'>PLN</option>
            <option value='Dolar'>$</option>
            <option value='EURO'>€</option>
        </select>
        </div>
      </div>
      <Button>How much money have i saved?</Button>
    </form>
  );
};

export default Form;
