import { Toaster } from "react-hot-toast";
import Login from "./components/login";
import Register from "./components/register";
import Display from "./components/Display";
import AuthWrapper from "./components/AuthWrapper";

const App = () => {
  return (
    <>
    <Toaster position="top-center"/>
    <AuthWrapper>
      <Display></Display>
    </AuthWrapper>
    </>
  )
}

export default App;