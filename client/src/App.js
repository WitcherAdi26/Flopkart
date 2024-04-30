import {Routes,Route} from "react-router-dom";
import "./App.css";
import RegistrationPage from "./Pages/RegistrationPage";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import ViewProductPage from "./Pages/ViewProductPage.js";
import CartPage from "./Pages/CartPage.js";
import ErrorPage from "./Pages/ErrorPage.js";

function App() {


  // const [user,changeUserInfo]=useState({
  //   username:"",
  //   loginStatus:false
  // });

  // function handleChangeInfo({username}){
  //   changeUserInfo((prev)=>{
  //     return {
  //       username:username,
  //       loginStatus:(username!=="")?true:false
  //     }
  //   });
  // }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/viewProduct/:id" element={<ViewProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<ErrorPage />}/>
      </Routes>
    </div>
  );
}

export default App;
