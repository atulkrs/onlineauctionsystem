import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import VerifyEmail from "./Pages/VerifyEmail";
import Home from "./Pages/Home";
import DashboardLayout from "./Layout/DashboardLayout";
import AdminDashboardLayout from "./Layout/AdminDashboardLayout";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminLogin from "./Pages/AdminLogin";
import Auction from "./Pages/Auction";
import CreateAuctionForm from "./Features/CreateAuctionForm";
import DeleteAuctionButton from "./Features/DeleteAuctionButton";
import EditAuctionForm from "./Features/EditAuctionForm";
import AllUsersPage from "./Pages/AllUsersPage";
import AdminHome from "./Pages/AdminHome";
import CreateUser from "./Pages/CreateUsers";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/createAuction' element={<CreateAuctionForm />} />
        <Route path='/deleteauction' element={<DeleteAuctionButton />} />
        <Route path='/editauction' element={<EditAuctionForm />} />
        <Route path='/auction' element={<Auction />} />
        <Route path='/all-users' element={<AllUsersPage />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/admin-login' element={<AdminLogin />} />
        <Route path='/create-users' element={<CreateUser />} />

        <Route
          path='/home'
          element={
            <DashboardLayout>
              <Home />
            </DashboardLayout>
          }
        />
        <Route
          path='/admin-home'
          element={
            <AdminDashboardLayout>
              <AdminHome />
            </AdminDashboardLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
