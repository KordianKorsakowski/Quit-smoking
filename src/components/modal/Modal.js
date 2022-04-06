import ReactDOM from "react-dom";
import Button from "../UI/Button";
import classes from "./modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onCloseModal} />;
};
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <h4 className={classes.title}>Your account has been created🥳</h4>
      <div>
        <p>🎗 Your Login: {props.userInfo.login}</p>
        <p>🔑 Your Password: {props.userInfo.password}</p>
      </div>
      <Button className={classes.signIn} onClick={props.onBackToSignInPanel}>
        Back & Sign In
      </Button>
    </div>
  );
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onCloseModal={props.onCloseModal} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          onBackToSignInPanel={props.onBackToSignInPanel}
          userInfo={props.userInfo}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default Modal;
