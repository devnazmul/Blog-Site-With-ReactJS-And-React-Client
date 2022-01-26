import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/AuthProvider";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Plants from "./Pages/Home/Components/Services/Plants";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import NotFound from "./Pages/NotFound/NotFound";
import Purchase from "./Pages/Purchase/Purchase";
import SignUp from "./Pages/SignUp/SignUp";
import UserProfile from "./Pages/UserProfile/UserProfile";
import PrivateRoute from "./Private/PrivateRoute";
import ScrollToTop from "./ScrollToTop/ScrollToTop";



function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Switch>
          <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>
          {/* <PrivateRoute path="/dashboard/purchase/:_id">
          <Purchase />

            </PrivateRoute> */}
            
            <Route exact path="/purchase/:_id">
              <Purchase />
            </Route>

            <Route exact path="/user_profile/:_id">
              <UserProfile />
            </Route>

            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/plants">
              <Plants />
            </Route>
          
            <Route exact path="/signup">
              <SignUp />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
