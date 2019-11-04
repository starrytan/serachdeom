import React from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

const OPENSILDE_INFO_REQUEST = "?action=info&path=";
const OPENSILDE_THUMBNAIL_REQUEST = "?action=image&path=";
const OPENSILDE_REGION_REQUEST = "?action=region&path=";
//声明一些全局的对象来处理数据

var sourceImages;
var sourceProperties;
var sourceCase;

var currentImage;

var snapshotDiv = "snapshot";

var ourGestureSettingsMouse = {
    
};

const WSIBox = (wsiurl) => {
    class WSIBox extends React.Component {
        

        constructor(props) {
            super(props);
            this.state = {
                sourceImages:sourceImages,
                sourceProperties:sourceProperties,
                sourceCase:sourceCase,
            }
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
