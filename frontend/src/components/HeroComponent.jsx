import React from 'react';
import '../css/main.css';
import video from "../assets/landing.mp4";

class Hero extends React.Component {

    render() {
        return(
            <>
                <section className="justify-center bg-blue-900">
                    <div className="text-center max-w-5xl m-auto px-6 py-16">
                        <h2 className="text-3xl font-bold text-gray-200 md:text-5xl">Nous vous offrons <br/> la sécurité
                            dans l'obscurité</h2>


                        <div className="relative flex justify-center mt-8 md:mt-10 h-1/2 text-center m-auto">

                                <video controls className="w-full">
                                    <source
                                        src={video}
                                        type="video/mp4"
                                    />
                                    Your browser does not support the video tag.
                                </video>
                        </div>
                    </div>
                </section>

                {/*<section className="bg-white">
                    <div className="max-w-5xl px-6 py-16 mx-auto text-center">
                        <h2 className="text-3xl font-semibold text-gray-800">Lorem ipsum dolor sit amet, <br/> consectetur
                            adipiscing</h2>
                        <p className="max-w-lg mx-auto mt-4 text-gray-600">Duis aute irure dolor in reprehenderit in voluptate
                            velit esse
                            cillum
                            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                            officia
                            deserunt mollit anim id est laborum.</p>

                        <img className="object-cover object-center w-full mt-16 rounded-md shadow h-80"
                             src="https://images.unsplash.com/photo-1600069226367-412873fb0637?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"/>
                    </div>
                </section>*/}
                {/*<section className="bg-white">
                    <div className="max-w-5xl px-6 py-16 mx-auto space-y-8 md:flex md:items-center md:space-y-0">
                        <div className="md:w-2/3">
                            <div className="hidden md:flex md:items-center md:space-x-10">
                                <img className="object-cover object-center rounded-md shadow w-72 h-72"
                                     src="https://images.unsplash.com/photo-1614030126544-b79b92e29e98?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"/>
                                    <img className="object-cover object-center w-64 rounded-md shadow h-96"
                                         src="https://images.unsplash.com/photo-1618506469810-282bef2b30b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"/>
                            </div>
                            <h2 className="text-3xl font-semibold text-gray-800 md:mt-6">Lorem ipsum dolor </h2>
                            <p className="max-w-lg mt-4 text-gray-600">
                                Duis aute irure dolor in reprehenderit in voluptate velit esse illum
                                dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                                qui
                                officia
                                deserunt mollit anim id est laborum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                cupidatat
                                non proident, sunt in culpa qui officia
                                deserunt mollit anim id est laborum.
                            </p>
                        </div>
                        <div className="md:w-1/3">
                            <img className="object-cover object-center w-full rounded-md shadow" style={{height:"700px"}}
                                 src="https://images.unsplash.com/photo-1593352216840-1aee13f45818?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"/>
                        </div>
                    </div>
                </section>*/}
                <section className="bg-white">
                    <div className="max-w-5xl px-6 py-16 mx-auto text-center">
                        <h2 className="text-3xl font-semibold text-gray-800">Our Leadership</h2>
                        <p className="max-w-lg mx-auto mt-4 text-gray-600">Duis aute irure dolor in reprehenderit in voluptate
                            velit esse
                            cillum
                            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                            officia
                            deserunt mollit anim id est laborum.</p>

                        <div className="grid gap-8 mt-6 md:grid-cols-2 lg:grid-cols-4">
                            <div>
                                <img className="object-cover object-center w-full h-64 rounded-md shadow"
                                     src="https://images.unsplash.com/photo-1614030126544-b79b92e29e98?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"/>
                                    <h3 className="mt-2 font-medium text-gray-700">John Doe</h3>
                                    <p className="text-sm text-gray-600">CEO</p>
                            </div>

                            <div>
                                <img className="object-cover object-center w-full h-64 rounded-md shadow"
                                     src="https://images.unsplash.com/photo-1614030126544-b79b92e29e98?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"/>
                                    <h3 className="mt-2 font-medium text-gray-700">John Doe</h3>
                                    <p className="text-sm text-gray-600">CEO</p>
                            </div>

                            <div>
                                <img className="object-cover object-center w-full h-64 rounded-md shadow"
                                     src="https://images.unsplash.com/photo-1614030126544-b79b92e29e98?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"/>
                                    <h3 className="mt-2 font-medium text-gray-700">John Doe</h3>
                                    <p className="text-sm text-gray-600">CEO</p>
                            </div>

                            <div>
                                <img className="object-cover object-center w-full h-64 rounded-md shadow"
                                     src="https://images.unsplash.com/photo-1614030126544-b79b92e29e98?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"/>
                                    <h3 className="mt-2 font-medium text-gray-700">John Doe</h3>
                                    <p className="text-sm text-gray-600">CEO</p>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default Hero;
