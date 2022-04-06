import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Button from "../UI/Button";
import classes from "./deleteModal.module.css";

import { db } from "../../firebase-config";
import { doc, deleteDoc } from "firebase/firestore";

const Backdrop = (props) => {
  return (
    <div className={classes.backdrop} onClick={props.onCloseDeleteModal} />
  );
};
const ModalOverlay = (props) => {
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const info = JSON.parse(localStorage.getItem("info"));
    setUserId(info.id);
  }, []);

  const deleteUser = async () => {
    const userDoc = doc(db, "users", userId);
    await deleteDoc(userDoc);
    props.onSignOut(false);
    props.onModalCloseDeleteHandler();
    props.onShowAnswerForLoggedUser(false);
  };
  return (
    <div className={classes.modal}>
      <h4 className={classes.title}>
        Are you sure you want to delete your Account?😤
      </h4>
      <div className={classes.container}>
        <Button className={classes.agree} onClick={deleteUser}>
          Yes
        </Button>
        <Button className={classes.disagree} onClick={props.onCloseDeleteModal}>
          no
        </Button>
      </div>
    </div>
  );
};

const DeleteModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onCloseDeleteModal={props.onCloseDeleteModal} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          onCloseDeleteModal={props.onCloseDeleteModal}
          onSignOut={props.onSignOut}
          onModalCloseDeleteHandler={props.onModalCloseDeleteHandler}
          onShowAnswerForLoggedUser={props.onShowAnswerForLoggedUser}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default DeleteModal;
