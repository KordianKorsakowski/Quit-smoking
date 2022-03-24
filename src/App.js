import { useState } from "react";
import Form from "./components/form/Form";
import Answer from "./components/answer/Answer";



function App() {
const [userData, setUserData] = useState();

const getUserDataHandler = (data) => {
    setUserData(data);
}
  return (
    <div>
     
      <Form onSendUserData={getUserDataHandler}/>
      <Answer data={userData}/>
     
    </div>
  );
}

export default App;
