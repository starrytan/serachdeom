import React from 'react';
import OpenSeadragon from 'openseadragon';
import '../../static/css/viewer-l.pcss';
import '../../static/css/viewer-p.pcss';
import $ from 'jquery'


const SERVER_PROPERTIES ={openslide: { url: 'http://2749q65j10.qicp.vip/myserv' }};



const OPENSLIDE_INFO_REQUEST = "?action=info&path=";
const OPENSLIDE_THUMBNAIL_REQUEST = "?action=image&path=";
const OPENSLIDE_REGION_REQUEST = "?action=region&path=";

var ourGestureSettingsMouse = {
    scrollToZoom: true,
    clickToZoom: true,
    dblClickToZoom: false,
    pinchToZoom: false,
    flickEnabled: false,
    flickMinSpeed: 120,
    flickMomentum: 0,
    pinchRotate: false
};

var ourGestureSettingsTouch = {
    scrollToZoom: false,
    clickToZoom: false,
    dblClickToZoom: true,
    pinchToZoom: true,
    flickEnabled: false,
    flickMinSpeed: 120,
    flickMomentum: 0,
    pinchRotate: false
};

var ourGestureSettingsPen = {
    scrollToZoom: false,
    clickToZoom: true,
    dblClickToZoom: false,
    pinchToZoom: false,
    flickEnabled: false,
    flickMinSpeed: 120,
    flickMomentum: 0,
    pinchRotate: false
};

const WSIBox = (wsiurl) => {
    class WSIBox extends React.Component {


        constructor(props) {
            super(props);
            this.currentImage = null;
            this.sourceImages = null;
            this.sourceProperties = "";
            this.sourceCase = "";
            this.snapshotDiv = "snapshot";
            this.viewer =  OpenSeadragon;
            this.state = {
                ourGestureSettingsMouse: ourGestureSettingsMouse,
                ourGestureSettingsTouch: ourGestureSettingsTouch,
                ourGestureSettingsPen: ourGestureSettingsPen,
            }
        }

        componentDidMount() {
            this.setupControls();
            let caseName = "1";
            let props = SERVER_PROPERTIES;
            // test
			var images = [
            // { type: "openslide", name: "APERIO_7", path: "KW16-000001_APERIO_7_U00000X.svs", tag: "H&E" },
			{ type: "openslide", name: "1", path: "1.tiff" }
			// { type: "snapshot", name: "figure.01.7-APERIO", path: "Case1\\snapshots\\figure.01.7-APERIO.jpg", tag: "Snapshots" },
            ];
            this.loadImages(props, images, caseName);
        }

        render() {
            return (<div id="content">
                <div id="images">
                    <div id="image-container">
                        <div id="HE" className="tag">
                        </div>
                    </div>
                </div>
                <div id="view" ></div>
            </div>);
        }

        openViewer(source) {
            let repenViewer = false;

            if ((typeof currentImage !== undefined
                || typeof currentImage !== 'undefined') && (this.currentImage != null)) {
                if ((typeof viewer !== 'undefined' || typeof viewer !== undefined)
                    && (this.viewer != null) && (this.viewer.isOpen())) {
                    if (source.imageURL == this.currentImage.imageURL) {
                        this.viewer.viewport.goHome(true);
                        return;
                    }
                    else {
                        if (((this.currentImage.maxLevel == 1) && (source.maxLevel > 1))
                            || ((this.currentImage.maxLevel > 1) && (source.maxLevel == 1))) {

                            repenViewer = true;
                        }
                    }
                }
            }

            if ((repenViewer) || (!this.viwer)) {
                let showControls = (source.maxLevel > 1);
                $("#view").text("");
                $("#view").css("background-image", "none");
                this.viewer = OpenSeadragon({
                    id: "view",
                    autoHideControls: false,
                    visibilityRatio: 0.75,
                    navigatorSizeRatio: 0.2,
                    showNavigator: showControls,
                    showNavigationControl: showControls,
                    //preserveViewport: true,	//only relevent if we have a sequence of images, could revisit in future
                    gestureSettingsMouse: ourGestureSettingsMouse,
                    gestureSettingsTouch: ourGestureSettingsTouch,
                    gestureSettingsPen: ourGestureSettingsPen,
                    gestureSettingsUnknown: ourGestureSettingsMouse,
                    crossOriginPolicy: 'anonymous'
                });
                this.viewer.addHandler("open-failed", () => {
                    console.log("unable to open slide viewer;");
                    alert("unable to open slide viewer");
                });
                this.viewer.open(source);
                this.currentImage = source;

                if (source.maxLevel == 1) {
                    this.viewer.setMouseNavEnable(false);
                } else {
                    this.viewer.setMouseNavEnable(true);
                }

            }


        }

        setupControls() {
            $("#snapshot").hide();
            $("#snapshot")
                .mouseover(function () {
                    $(this).attr("src", "images/snapshot_hover.png");
                })
                .mouseout(function () {
                    $(this).attr("src", "images/snapshot_rest.png");
                });
        }

        loadImages(props, images, name) {
            this.sourceImages = images;
            this.sourceProperties = props;
            this.sourceCase = name;


            for (let i = 0; i < images.lenght; i++) {
                if (images[i].name == '') {
                    if (images[i].type == 'snapshot') {
                        let endIndex = images[i].path.lastIndexOf('.');
                        images[i].name = images[i].path.substr(0, endIndex);
                    }
                    else if (images[i].type == "label") {
                        images.splice(i, 1);
                        i--;
                    }
                    else {
                        let nameParts = images[i].path.split("_");
                        let stain = nameParts[1];
                        let slideID = nameParts[2];
                        images[i].name = slideID + "-" + stain;
                        if (stain == "H&E") stain = 'HE';
                        images[i].tag = stain;
                    }
                }
            }

            images.sort((a, b) => { return ((a.name < b.name) ? -1 : 1) });

            for (let i = 0; i < images.lenght; i++) {
                let imageDone = false;

                let j = i;
                while ((j < (images.lenght - 1) && (images[i].name === images[j + 1].name))) {
                    j++;
                }
                if ((j - 1) == 1) {
                    if ((images[i].type === 'mirax') && (images[j].type === 'tiff')) {
                        images[i].n = 1;
                        this.loadMiraxImage(props.openslide, images[i], images[j]);
                        imageDone = true;
                        i++;
                    }
                    else if ((images[i].type === "tiff") && (images[j].type === "mirax")) {
                        images[j].n = i;
                        this.loadMiraxImage(props.openslide, images[j], images[i]);
                        imageDone = true;
                        i++;
                    }
                }

                if (!imageDone) {
                    this.loadOpenslideImage(props.openslide,images[i]);
                }
            }
        }

        loadSnapshot(prop, image) {
            //Construct the full URL for accessing the image
            let url = image.path;
            /*if(!/^https?:\/\//i.test(url)) {
                url = prop.url+url;
            }*/
            if (url.indexOf("snapshots\\") == -1) {
                //If the url doesn't include the path to the snapshot folder, add it
                url = this.sourceCase + "\\snapshots\\" + url;
            }
            url = prop.url + url;
            //Open the image in order to derive information that the viewer will need 
            //when we truly access the image for viewing
            let img = new Image();
            img.src = url;
            img.onload = function () {
                // image  has been loaded
                // add to list of sources
                var source = {
                    width: img.width,
                    height: img.height,
                    tileSize: img.width,
                    maxLevel: 1,
                    imageURL: new String(url),
                    getTileUrl: function (level, x, y) {
                        return this.imageURL;
                    }
                };

                // add image to the slider
                this.addImage(image, source);
            };
        }

        loadOpenslideImage(prop, image) {
            //Issue a JSON request for the OpenSlide server to send image specs
            $.getJSON((prop.url + OPENSLIDE_INFO_REQUEST + image.path), function (data) {
                //Split the return string into an array of image specifications
                let args = data.contents.split("\n");

                //Define an object that can hold key/value pairs
                let Collection = function () {
                    this.count = 0;
                    this.collection = {};

                    this.add = function (key, value) {
                        if (this.collection[key] != undefined)
                            return undefined;
                        this.collection[key] = value;
                        return ++this.count;
                    }

                    this.remove = function (key) {
                        if (this.collection[key] == undefined)
                            return undefined;
                        delete this.collection[key];
                        return --this.count;
                    }

                    this.item = function (key) {
                        return this.collection[key];
                    }
                }

                //Compile a map of the information labels (keys) to data values
                let imageInfo = new Collection();
                for (let i = 2; i < args.length; i++) {
                    let entry = args[i];
                    let equalSign = entry.indexOf("=");
                    imageInfo.add(entry.substr(0, equalSign), entry.substr(equalSign + 1));
                }


                let imageWidth = +(imageInfo.item("openslide.bounds-width"));
                if ((imageWidth == undefined) || (isNaN(imageWidth))) {
                    imageWidth = +(imageInfo.item("image.width"));
                }
                if ((imageWidth == undefined) || (isNaN(imageWidth))) {
                    imageWidth = +(imageInfo.item("openslide.level[0].width"));
                }
                if ((imageWidth == undefined) || (isNaN(imageWidth))) {
                    imageWidth = +(imageInfo.item("layer.0.width"));
                }


                let imageHeight = +(imageInfo.item("openslide.bounds-height"));
                if ((imageHeight == undefined) || (isNaN(imageHeight))) {
                    imageHeight = +(imageInfo.item("image.height"));
                }
                if ((imageHeight == undefined) || (isNaN(imageHeight))) {
                    imageHeight = +(imageInfo.item("openslide.level[0].height"));
                }
                if ((imageHeight == undefined) || (isNaN(imageHeight))) {
                    imageHeight = +(imageInfo.item("layer.0.height"));
                }

                //If openslide.bounds-(x,y) defined, extract; otherwise set startX, startY to (0,0)
                let startX = +(imageInfo.item("openslide.bounds-x"));
                if ((startX == undefined) || (isNaN(startX))) {
                    startX = 0;
                }
                let startY = +(imageInfo.item("openslide.bounds-y"));
                if ((startY == undefined) || (isNaN(startY))) {
                    startY = 0;
                }

                //Extract the tilesize 
                let tileSizeHeight = +(imageInfo.item("tile.height"));
                let tileSizeWidth = +(imageInfo.item("tile.width"));
                //OpenSeadragon can also take tileOverlap, aspectRatio as TileSource properties,
                //but these don't seem to be available in Hamamatsu and Aperio data
                //May need to determine these for other file types

                let imageURL = image.path;
                //If thumbnail already defined (e.g. for a Mirax with a paired TIFF), leave it; otherwise set up thumbbnail
                if ((image.thumbnail === undefined) || (image.thumbnail == null)) {
                    image.thumbnail = prop.url + OPENSLIDE_THUMBNAIL_REQUEST + image.path;
                }

                //Calculate aspect ratio for use in requesting image URL's
                let aspectRatio = (imageWidth / imageHeight) / (tileSizeWidth / tileSizeHeight);

                //Calculate image size
                //Currently this is only used to compare with thresholds, so scale down for more readable code
                let imageSize = (imageHeight * imageWidth) / 1000000000;

                //Set the image levels based on image size
                let imageLevels =0;
                if (imageSize < 2) {
                    imageLevels = 6;
                }
                else if (imageSize < 6) {
                    imageLevels = 7;
                }
                else if (imageSize < 16) {
                    imageLevels = 8;
                }
                else if (imageSize < 40) {
                    imageLevels = 9;
                }
                else {
                    imageLevels = 10;
                }
                //Adjust for aspect ratio 
                //if (aspectRatio > 2.3) {
                if (aspectRatio > 1.9) {
                    //For wide images
                    if (imageLevels > 6) {
                        imageLevels--;	//Decrease unless we're already at a low (6) # levels
                    }
                }
                else {
                    //For square or narrow images
                    if (imageLevels < 7) {
                        imageLevels++;	//Increase if we're at a low (6) # levels
                    }
                }

                // add to list of sources
                var source = {
                    width: imageWidth,
                    height: imageHeight,
                    tileWidth: tileSizeWidth,
                    tileHeight: tileSizeHeight,
                    maxLevel: imageLevels,
                    initX: startX,
                    initY: startY,
                    //minLevel: 0,
                    //tileOverlap: 1,
                    imageURL: imageURL,
                    displayAspectRatio: aspectRatio,
                   
                    getTileUrl: function (level, x, y) {
                        //alert(x+", "+y+", "+level);
                        let p = Math.pow(2, level);

                        x = Math.floor((x * this.width) / (p * this.displayAspectRatio));
                        y = Math.floor((y * this.height) / (p));
                        let w = Math.floor(this.width / (p * this.displayAspectRatio));
                        let h = Math.floor(this.height / p);

                        x = x + this.initX;
                        y = y + this.initY;

                        let url = this.imageURL;
                        url = prop.url + OPENSLIDE_REGION_REQUEST + url;
                        url = url + "&x=" + x + "&y=" + y + "&width=" + w + "&height=" + h + "&size=" + this._tileWidth;
                        return url;
                    }
                };

                // add image to the slider
                this.addImage(image, source);
            });
        }

        addImage(image, source) {
            // add image info to source
            source.info = image;

            // find tags
            let tag = "images";
            if ("tag" in image) {
                tag = image.tag.replace(/[^a-zA-Z0-9]/g, '');
            }
            // check if this tag is new, add if so
            if ($("#" + tag).length == 0) {
                if (image.type == "snapshot") {
                    $("#images").append("<div id=\"" + tag + "\" class=\"tag\">" + image.tag + "</div>");
                } else {
                    $("#image-container").append("<div id=\"" + tag + "\" class=\"tag\">" + image.tag + "</div>");
                }
            }
            // add image thumbnail to an appropriate tag
            let text = "<div class=\"thumbnail-div\" id=\"THUMB" + image.n + "\" title=\"" + image.name + "\">" +
                "<a href=\"#\" class=\"thumbnail-a\" id=\"IMG" +
                image.n + "\"><img src=\"" +
                image.thumbnail + "\" class=\"thumbnail-img\"/>" + "<div class=\"thumbnail-caption\">" + image.name + "</div></a></div>";

            // do something else for snapshot
            if (image.type == "snapshot") {
                text = "<div class=\"snapshot-snapshot\" id=\"THUMB" + image.n + "\" title=\"" + image.name + "\">" +
                    "<a href=\"#\" class=\"thumbnail-a\" id=\"IMG" + image.n + "\">" + image.name + "</a></div>";
            }

            $("#" + tag).append(text);
            $("#IMG" + image.n).click(function () {
                $(".thumbnail-div").css("border-color", "#000");
                $("#THUMB" + image.n).css("border-color", "#00F");
                this.openViewer(source);
            });
        }

        pad(num, size) {
            let s = "000000000" + num;
            return s.substr(s.length-size);
        }

        loadMiraxImage(prop, image, presumedMatch) {
            //If a Mirax image has one and only one potential match, use that as the thumbnail
            image.thumbnail = prop.url+OPENSLIDE_THUMBNAIL_REQUEST+presumedMatch.path;
            // image.thumbnail = USE_PROXY_FOR_IMAGES?redirect(image.thumbnail,false):image.thumbnail;
            
            //Aside from using the TIFF as the thumbnail, loading will proceed using OpenSlide
            this.loadOpenslideImage(prop, image);
        }

        doSnapshot(offs){
            try{
                //Get the image from the canvas
                let canvas = document.getElementsByTagName("canvas")[0];
                
                //get information about the image
                let caseName = this.sourceCase;
                let slideName = this.currentImage.info.name;
                
                //Construct a name and file path for the snapshot, starting by determining the figure number
                for(var i=0; i < this.sourceImages.length; i++){
                    if ('type' in this.sourceImages[i] && this.sourceImages[i].type === 'snapshot') {
                        offs++;
                    }
                }
                if (offs > 99) {
                    alert("Error: Exceeded maximum number of snapshots for this case");
                    return;
                }
                let name = "figure."+this.pad(offs,2)+"."+slideName;
                let path = caseName+"\\snapshots\\"+name+".jpg"; 
                //Construct image information for the snapshot
                let image = {type:"snapshot",name:name,path:path,tag:this.snapshotDiv,n:this.sourceImages.length};
                
                //Convert the canvas image to jpeg format
                // var dataURL = canvas.toDataURL("image/jpeg");
                
               
                  this.sourceImages.push(image);
                  //Add image to the slide chooser, and prepare it to be loaded by viewer
                  this.loadSnapshot(SERVER_PROPERTIES.snapshot,image);
            }catch(err){
                alert("Error: Could not take a snapshot! Cause: "+err.message);
            }
        }

    }
    return <WSIBox />
}

export default WSIBox;
