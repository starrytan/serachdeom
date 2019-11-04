import React from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
const WSIBox = (wsiurl) => {
    class WSIBox extends React.Component {
        constructor(props) {
            super(props);
        }

        componentDidMount() {
            var myMap = new Map({
                view: new View({
                    center: [0, 0],
                    zoom: 1
                }),
                layers: [
                    new TileLayer({
                        source: new OSM()
                    })
                ],
                target: 'myMap'
            });
        }

        render() {
            return (<div id="myMap" className="map"></div>);
        }
       
    }
    return<WSIBox />
}

export default WSIBox;
