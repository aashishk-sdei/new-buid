import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLogin from "./Components/UserAccount/UserLogin";
import ForgotPassword from "./Components/UserAccount/FrogotPassword";
import CreateAccount from "./Components/UserAccount/CreateAccount";
import SetnewPassword from "./Components/UserAccount/SetnewPassword";
import UserProfile from "./Components/UserManagement/UserProfile";
import Dashboard from "./Components/Dashboard/Dashboard";
import PropertyList from "./Components/Property/PropertyList";
import Addproperty from "./Components/Property/Addproperty";
import Spinner from "./Constant/Spinner";
import UserProvider from "./Components/UserManagement/Provider";
import VerifyAccount from "./Components/UserAccount/VerifyAccoutn";
import EditProperty from "./Components/Property/EditProperty";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<UserLogin />} />
          <Route exact path="/login" element={<UserLogin />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route exact path="/create-account" element={<CreateAccount />} />
          <Route
            exact
            path="/newpassword/:userid"
            element={<SetnewPassword />}
          />
          <Route
            exact
            path="/verify-account/:userid"
            element={<VerifyAccount />}
          />

          <Route exact path="/user" element={<UserProfile />} />
          <Route exact path="/all-user" element={<UserProvider />} />
          <Route exact path="/propertylist" element={<PropertyList />} />
          <Route exact path="/add-property" element={<Addproperty />} />
          <Route exact path="/edit-property/:id" element={<EditProperty />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/spin" element={<Spinner />} />
          <Route exact path="*" element={<UserLogin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
