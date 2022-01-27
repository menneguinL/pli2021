import React from 'react';
import '../css/main.css';
import Hero from "../components/HeroComponent";
import Map from "../components/MapComponent";

class Home extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        loggedIn: this.isLoggedIn()
      }
    }

    isLoggedIn(){
      if(sessionStorage.getItem('token')){
        return sessionStorage.getItem('token');
      }
      return false
    }

    renderHome(isLoggedIn) {
      if (isLoggedIn) {
        return <Map/>;
      } else {
        return <Hero/>;
      }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      this.isLoggedIn()
    }

    render() {
        let loggedIn = this.state.loggedIn;
        return(
            <>
              {this.renderHome(this.isLoggedIn())}
            </>
        )
    }
}

export default Home;
