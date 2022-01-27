import React from 'react';
import '../css/main.css';
import {Link} from "react-router-dom";
import { Redirect } from "react-router-dom";
import axios from "axios";
import $ from 'jquery';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                identifiant: "",
                password: ""
            },
            redirect: false
        }
    }

    updateUserState(){
        let identifiant = $('input[name=securecaneId]').val();
        let password = $('input[name=password]').val();
        this.setState({user: {identifiant, password}});
    }

    async login(){
        let headers = {
            "Access-Control-Allow-Origin": "*"
        }
        let response = await axios.post("http://localhost:4000/api/users/login", this.state.user)
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('id', response.data.id);
        this.setState({redirect: true})
        window.location.reload();
    }

    render() {
        if (this.state.redirect)return <Redirect push to="/"/>
        return(
            <div className="signup-1 flex items-center relative h-screen">
                <div className="overlay absolute inset-0 z-0 bg-black opacity-75" style={{backgroundImage: `url("https://images.pexels.com/photos/6568190/pexels-photo-6568190.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")`}}/>
                <div className="container px-4 mx-auto relative z-10">
                    <div className="sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12 mx-auto">
                        <div className="box bg-white p-6 md:px-12 md:pt-12 border-t-10 border-solid border-red-600">
                            <h2 className="text-3xl text-gray-800 text-center">Connexion</h2>

                            <div className="signup-form mt-6 md:mt-12">
                                <div className="border-2 border-solid rounded flex items-center mb-4">
                                    <div className="w-10 h-10 flex justify-center items-center flex-shrink-0">
                                        <span className="far fa-user text-gray-500"/>
                                    </div>
                                    <div className="flex-1">
                                        <input name="securecaneId" type="text" placeholder="Identifiant SecureCane" className="h-10 py-1 pr-3 w-full outline-none" onChange={() => {this.updateUserState()}}/>
                                    </div>
                                </div>

                                <div className="border-2 border-solid rounded flex items-center mb-4">
                                    <div className="w-10 h-10 flex justify-center items-center flex-shrink-0">
                                        <span className="fas fa-asterisk text-gray-500"/>
                                    </div>
                                    <div className="flex-1">
                                        <input name="password" type="password" placeholder="Mot de passe" className="h-10 py-1 pr-3 w-full outline-none" onChange={() => {this.updateUserState()}}/>
                                    </div>
                                </div>

                                <div className="text-center mt-6 md:mt-12">
                                    <button type="submit" className="bg-red-600 hover:bg-red-700 text-white text-xl py-2 px-4 md:px-6 rounded transition-colors duration-300 focus:outline-none" onClick={() => {this.login()}}>
                                        Connexion
                                    </button>
                                </div>
                            </div>

                            <div className="border-t border-solid mt-6 md:mt-12 pt-4">
                                <Link className="text-red-600 hover:underline" to={"/login"}>
                                    <p className="text-gray-500 text-center">
                                        Politique de confidentialité
                                    </p>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;
