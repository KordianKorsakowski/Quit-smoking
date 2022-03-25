import { useState } from "react";
import Form from "./components/form/Form";
import Answer from "./components/answer/Answer";
import SingIn from "./components/singIn/SingIn";


function App() {
const [userData, setUserData] = useState();
const [isValid, setIsValid] = useState(false);
const [singIn, setSingIn] = useState(false);

const getUserDataHandler = (data) => {
    setUserData(data);
}
const validHandler = (value) => {
  setIsValid(value);
}
const singInHandler = (login) => {
  setSingIn(login);
}

  return (
    <div>
     {!singIn && <SingIn onSingIn={singInHandler}/>}
     {singIn && <Form onSendUserData={getUserDataHandler} onValid={validHandler}/>}
      {isValid && <Answer data={userData}/>}
     
    </div>
  );
}

export default App;
