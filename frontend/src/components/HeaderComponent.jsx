import React from 'react';
import '../css/main.css';
import '../css/index.css'
import {Link} from "react-router-dom";

class Header extends React.Component {
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
    logout(){
        sessionStorage.clear();
        this.setState({loggedIn: false});
    }
    renderAuthButton(isLoggedIn) {

        if (!isLoggedIn) {
            return <Link to={"/login"}
                         className="p-2 lg:px-4 md:mx-2 text-blue-900 text-center border border-solid border-blue-900 rounded hover:bg-blue-900 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1">Connexion</Link>;
        } else {
            return (
                <>
                    <Link to={"/profile"}
                          className="p-2 lg:px-4 md:mx-2 hover:bg-white hover:text-blue-900 border border-transparent text-center hover:border-blue-900 rounded bg-blue-900 text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1">
                        Mon entourage
                    </Link>
                    <Link to={"/login"}
                          className="p-2 lg:px-4 md:mx-2 text-blue-900 text-center border border-solid border-blue-900 rounded hover:bg-blue-900 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1"
                          onClick={() => {this.logout()}}>
                        Déconnexion
                    </Link>
                </>
            )
        }
    }
    collapse(){
        let toggleBtn = document.querySelector("#navbar-toggle");
        let collapse = document.querySelector("#navbar-collapse");
        toggleBtn.onclick = () => {
            collapse.classList.toggle("hidden");
            collapse.classList.toggle("flex");
        };
    }
    componentDidMount() {
        this.collapse();

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.isLoggedIn()
    }

    render() {
        let loggedIn = this.state.loggedIn;
        return(
                <nav className="bg-white py-2 md:py-4">
                    <div className="container px-4 mx-auto md:flex md:items-center">

                        <div className="flex justify-between items-center">
                            <Link to={"/"} className="font-bold text-xl text-blue-900">SECURECANE</Link>
                            <button
                                className="border border-solid border-gray-600 px-3 py-1 rounded text-gray-600 opacity-50 hover:opacity-75 md:hidden"
                                id="navbar-toggle">
                                <i className="fas fa-bars"/>
                            </button>
                        </div>

                        <div className="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0 duration-300 transition"
                             id="navbar-collapse">

                            {this.renderAuthButton(this.isLoggedIn())}

                        </div>
                    </div>
                </nav>
        )
    }
}

export default Header;
