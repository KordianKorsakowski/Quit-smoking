import { useState } from "react";
import Form from "./components/form/Form";
import Answer from "./components/answer/Answer";



function App() {
const [userData, setUserData] = useState();
const [isValid, setIsValid] = useState(false);

const getUserDataHandler = (data) => {
    setUserData(data);
}
const validHandler = (value) => {
  setIsValid(value);
}
  return (
    <div>
     
      <Form onSendUserData={getUserDataHandler} onValid={validHandler}/>
      {isValid && <Answer data={userData}/>}
     
    </div>
  );
}

export default App;
