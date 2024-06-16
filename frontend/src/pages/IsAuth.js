import React, { useState } from "react";
import App from "../App"
import SignIn from "./SignIn"

const Parent = () => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <div>
      <App isAuth={isAuth} />
      <SignIn setIsAuth={setIsAuth} />
    </div>
  );
};

export default Parent;