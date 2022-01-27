import React from 'react';
import '../css/main.css';
import {Link} from "react-router-dom";
import axios from "axios";
import $ from 'jquery';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      entourage: {
        name: null,
        phone: null
      },
    }
  }

  updateUserEntourage(){
    let name = $('input[name=member]').val();
    let phone = $('input[name=phone]').val();
    this.setState({entourage: {name, phone}});
    console.log(this.state.entourage);
  }

  async componentDidMount() {
    let user = await axios.get("http://localhost:4000/api/users/"+sessionStorage.getItem("id"),
        { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` } });
    this.setState({user: user.data});
  }

  async addEntourage(){
    let userToUpdate = this.state.user;
    userToUpdate.entourage.push(this.state.entourage);
    await axios.post("http://localhost:4000/api/users/entourage/"+sessionStorage.getItem("id"), userToUpdate.entourage);
    this.setState({user: userToUpdate});
  }

  render() {
    let {user} = this.state;
    console.log("USER LOG :", user);

    return(
        <div className="bg-gray-50 flex items-center justify-center py-5">

          <div id="ex1" className="modal p-8">
              <div className="w-full mx-auto">
                <div className="box bg-white md:px-12 md:py-6 border-t-10 border-solid border-red-600">
                  <h2 className="text-3xl text-gray-800 text-center">Ajouter une personne de confiance</h2>

                  <div className="signup-form mt-6 md:mt-12">
                    <div className="border-2 border-solid rounded flex items-center mb-4">
                      <div className="w-10 h-10 flex justify-center items-center flex-shrink-0">
                        <span className="far fa-user text-gray-500"/>
                      </div>
                      <div className="flex-1">
                        <input name="member" type="text" placeholder="Prénom/Nom" className="h-10 py-1 pr-3 w-full outline-none" onChange={() => {this.updateUserEntourage()}}/>
                      </div>
                    </div>

                    <div className="border-2 border-solid rounded flex items-center mb-4">
                      <div className="w-10 h-10 flex justify-center items-center flex-shrink-0">
                        <span className="fas fa-asterisk text-gray-500"/>
                      </div>
                      <div className="flex-1">
                        <input name="phone" type="tel" placeholder="Téléphone" className="h-10 py-1 pr-3 w-full outline-none" onChange={() => {this.updateUserEntourage()}}/>
                      </div>
                    </div>

                    <div className="text-center mt-6 md:mt-12">
                      <button type="submit" className="bg-red-600 hover:bg-red-700 text-white text-xl py-2 px-4 md:px-6 rounded transition-colors duration-300 focus:outline-none" onClick={() => {this.addEntourage()}}>
                        Ajouter
                      </button>
                    </div>
                  </div>

                </div>
              </div>
          </div>

          <div className="w-full bg-white px-5 md:px-12 py-8 md:py-12 text-gray-800">
            <div className="w-full">
              <div className="text-center max-w-xl mx-auto">
                <h1 className="text-6xl md:text-7xl font-bold mb-5 text-gray-600">Mon entourage</h1>
                <h3 className="text-xl mb-5 font-light">Les personnes à contacter en cas de nécessité.</h3>
                <div className="text-center mb-10">
                  <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"/>
                  <span className="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"/>
                  <span className="inline-block w-40 h-1 rounded-full bg-indigo-500"/>
                  <span className="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"/>
                  <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"/>
                </div>
              </div>

              <div className="mx-3 md:flex items-start">

                {user?
                    user.entourage.map((el, index) => {
                      return <div className="px-3 md:w-1/8" key={index}>
                        <div className="w-full min-h-full h-32 mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6 text-center">
                          <div className="w-full flex mb-4 items-center">
                            <div className="flex-grow pl-3">
                              <h5 className="font-bold text-sm uppercase text-gray-600">{el.name}.</h5>
                            </div>
                          </div>
                          <div className="w-full text-center">
                            <p className="text-sm leading-tight">{el.phone}</p>
                          </div>
                        </div>
                      </div>
                    })
                    : null
                }

                <div className="px-3 md:w-1/8">
                  <a href="#ex1" rel="modal:open">
                    <div className="cursor-pointer min-h-full w-full h-32 mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6 text-center">
                      <div className="w-full flex mb-4 items-center">
                        <div className="flex-grow pl-3">
                          <h5 className="font-bold text-sm uppercase text-gray-600">Ajouter <br/>une personne</h5>
                        </div>
                      </div>
                      <div className="w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                      </div>
                    </div>
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default Profile;
