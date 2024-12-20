import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// =====
import OnlyNotAuthorizedUserRoute from './components/Routes/OnlyNotAuthorizedUserRoute/OnlyNotAuthorizedUserRoute';
import ChatContainer from './components/Chat/ChatComponents/ChatContainer/ChatContainer';
import PrivateRoute from './components/Routes/PrivateRoute/PrivateRoute';
import NotFound from './components/NotFound/NotFound';
// =====
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import StartContestPage from './pages/StartContestPage/StartContestPage';
import ContestCreationPage from './pages/ContestCreation/ContestCreationPage';
import ContestPage from './pages/ContestPage/ContestPage';
import UserProfile from './pages/UserProfile/UserProfile';
import HowItWorks from './pages/HowItWorks/HowItWorks';
import Dashboard from './pages/Dashboard/Dashboard';
import LoginPage from './pages/LoginPage/LoginPage';
import Payment from './pages/Payment/Payment';
import Events from './pages/Events/Events';
import Layout from './pages/Layout/Layout';
import Home from './pages/Home/Home';
// =====
import browserHistory from './browserHistory';
import CONSTANTS from './constants';
import Router from './router';
// =====
import 'react-toastify/dist/ReactToastify.css';
import './App.css';


function App() {
  return (
    <Router history={browserHistory}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route element={<OnlyNotAuthorizedUserRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/payment" element={<Payment />} />
            <Route path="/startContest" element={<StartContestPage />} />
            <Route
              path="/startContest/nameContest"
              element={
                <ContestCreationPage
                  contestType={CONSTANTS.NAME_CONTEST}
                  title="Company Name"
                />
              }
            />
            <Route
              path="/startContest/taglineContest"
              element={
                <ContestCreationPage
                  contestType={CONSTANTS.TAGLINE_CONTEST}
                  title="TAGLINE"
                />
              }
            />
            <Route
              path="/startContest/logoContest"
              element={
                <ContestCreationPage
                  contestType={CONSTANTS.LOGO_CONTEST}
                  title="LOGO"
                />
              }
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contest/:id" element={<ContestPage />}/>
            <Route path="/account" element={<UserProfile />}/>
            <Route path="/how-it-works" element={<HowItWorks />}/>
            <Route path="/events" element={<Events />}/>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ChatContainer />
    </Router>
  );
}

export default App;
