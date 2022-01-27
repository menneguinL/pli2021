import React, {Component, useState} from 'react';
import GoogleMapReact from 'google-map-react';
import axios from "axios";

const AnyReactComponent = ({ text }) => <div><div className="pin bounce" /><div className="pulse" /></div>;

class Map extends Component {


    constructor(props) {
        super(props);
        this.state = {
            position: {
                lat: 48.89,
                lng: 2.23
            },
            zoom: 18
        };
    }


    async updatePosition(_this){
        let response = await axios.get("http://localhost:4000/api/users/position/"+sessionStorage.getItem("id"),
            { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` } });
        console.log(response.data.position)
        _this.setState({position: response.data.position});
    }

    timeUp(callback){
        var _this = this;
        window.setInterval(function(){
            callback(_this)
        }, 5000);
    }

    componentDidMount() {
        this.timeUp(this.updatePosition);
    }

    render() {


        return (
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    center={this.state.position}
                    bootstrapURLKeys={{ key: "AIzaSyBIDXomOLUTBwgQDJeaPlhlOHzXOFCNvKs" }}
                    defaultCenter={this.state.position}
                    defaultZoom={this.state.zoom}
                >
                    <AnyReactComponent
                        lat={this.state.position.lat}
                        lng={this.state.position.lng}
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

export default Map;