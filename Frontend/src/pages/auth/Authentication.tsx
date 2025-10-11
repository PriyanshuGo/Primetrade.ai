import Login from "./Login";
import { useState } from "react";
import Register from "./Register";
export function Authentication() {
const [login, setLogin] = useState(true);

  return (
    <div className="flex items-center justify-center h-screen">
        {login ? <Login setLogin={setLogin}/> : <Register setLogin={setLogin}/>}
    </div>
  )

}
