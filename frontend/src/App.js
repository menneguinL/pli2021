import React from 'react';
import './css/main.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from "./components/HeaderComponent";
import Home from "./pages/HomePage";
import Footer from "./components/FooterComponent";
import Login from "./pages/LoginPage";
import Profile from "./pages/ProfilePage";

function App() {
  return (
      <Router>
          <Header/>
          <div>
          <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profile" component={Profile} />
          </Switch>
          </div>
          <Footer/>
      </Router>
  );
}

export default App;
