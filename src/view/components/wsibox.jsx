import React from 'react';
import OpenSeadragon from 'openseadragon';
import '../../static/css/viewer-l.pcss';
import '../../static/css/viewer-p.pcss';
import $ from 'jquery';



const SERVER_PROPERTIES = { openslide: { url: 'http://2749q65j10.qicp.vip/myserv' } };



const OPENSLIDE_INFO_REQUEST = "?action=info&path=";
const OPENSLIDE_THUMBNAIL_REQUEST = "?action=image&path=";
const OPENSLIDE_REGION_REQUEST = "?action=region&path=";

var viewer;

// save list of images and properties
var sourceImages;
var sourceProperties;
var sourceCase;

//Save reference to open slide image
var currentImage;

var snapshotDiv = "snapshot";

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

function addImage(image, source) {
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
        "<a href=\"javascript:;\" class=\"thumbnail-a\" id=\"IMG" +
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
        openViewer(source);
    });
}

function openViewer(source) {
    let repenViewer = false;

    if ((typeof currentImage !== undefined
        || typeof currentImage !== 'undefined') && (currentImage != null)) {
        if ((typeof viewer !== 'undefined' || typeof viewer !== undefined)
            && (viewer != null) && (viewer.isOpen())) {
            if (source.imageURL == currentImage.imageURL) {
                viewer.viewport.goHome(true);
                return;
            }
            else {
                if (((this.state.currentImage.maxLevel == 1) && (source.maxLevel > 1))
                    || ((this.state.currentImage.maxLevel > 1) && (source.maxLevel == 1))) {

                    repenViewer = true;
                }
            }
        }
    }

    if ((repenViewer) || (!viewer)) {
        let showControls = (source.maxLevel > 1);
        $("#view").text("");
        $("#view").css("background-image", "none");
        viewer = OpenSeadragon({
            id: "view",
            autoHideControls: false,
            visibilityRatio: 0.75,
            navigatorSizeRatio: 0.2,
            showNavigator: showControls,
            showNavigationControl: showControls,
            // preserveViewport: true,	//only relevent if we have a sequence of images, could revisit in future
            gestureSettingsMouse: ourGestureSettingsMouse,
            gestureSettingsTouch: ourGestureSettingsTouch,
            gestureSettingsPen: ourGestureSettingsPen,
            gestureSettingsUnknown: ourGestureSettingsMouse,
            crossOriginPolicy: 'anonymous',
        });
        viewer.addHandler("open-failed", () => {
            console.log("unable to open slide viewer;");
            alert("unable to open slide viewer");
        });
        viewer.open(source);
        currentImage = source;
        console.log(viewer);
        if (source.maxLevel == 1) {
            $("#snapshot").hide();
            viewer.MouseNavEnable=false;
        } else {
            $("#snapshot").show();
            viewer.MouseNavEnable=true;
        }

    }
}

function setupControls() {
    $("#snapshot").hide();
    $("#snapshot")
        .mouseover(function () {
            $(this).attr("src", "../../static/images/snapshot_hover.png");
        })
        .mouseout(function () {
            $(this).attr("src", "../../static/images/snapshot_rest.png");
        });
}

const WSIBox = (wsiurl) => {
    class WSIBox extends React.Component {


        constructor(props) {
            super(props)
            this.state = {
                ourGestureSettingsMouse: ourGestureSettingsMouse,
                ourGestureSettingsTouch: ourGestureSettingsTouch,
                ourGestureSettingsPen: ourGestureSettingsPen,
                currentImage: null,
                sourceImages: [],
                sourceProperties: "",
                sourceCase: "",
                snapshotDiv: "snapshot",
                viewer: OpenSeadragon,
            };
        }

        setupControls() {
            $("#snapshot").hide();
            $("#snapshot")
                .mouseover(function () {
                    $(this).attr("src", "../../static/images/snapshot_hover.png");
                })
                .mouseout(function () {
                    $(this).attr("src", "../../static/images/snapshot_rest.png");
                });
        }

        componentDidMount() {
            this.setupControls();
            let caseName = "1";
            let props = SERVER_PROPERTIES;
            // test
            var images = [
                // { type: "openslide", name: "APERIO_7", path: "KW16-000001_APERIO_7_U00000X.svs", tag: "H&E" },
                { type: "openslide", name: "1.tiff", path: "1.tiff" }
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





        loadImages(props, images, name) {
            // console.log("loadimage");
            // let newState = this.state;
            this.state.sourceImages = images;
            this.state.sourceProperties = props;
            this.state.sourceCase = name;



            for (let i = 0; i < this.state.sourceImages.length; i++) {

                if (this.state.sourceImages[i].name == '') {
                    if (this.state.sourceImages[i].type == 'snapshot') {
                        let endIndex = this.state.sourceImages[i].path.lastIndexOf('.');
                        console.log(endIndex);
                        this.state.sourceImages[i].name = this.state.sourceImages[i].path.substr(0, endIndex);
                    }
                    else if (this.state.sourceImages[i].type == "label") {
                        this.state.sourceImages.splice(i, 1);
                        console.log("i= " + i);
                        i--;
                    }
                    else {

                        let nameParts = this.state.sourceImages[i].path.split("_");
                        let stain = nameParts[1];
                        let slideID = nameParts[2];
                        this.state.sourceImages[i].name = slideID + "-" + stain;
                        if (stain == "H&E") stain = 'HE';
                        this.state.sourceImages[i].tag = stain;
                    }
                }
            }

            this.state.sourceImages.sort((a, b) => { return ((a.name < b.name) ? -1 : 1) });

            for (let i = 0; i < this.state.sourceImages.length; i++) {
                console.log(this.state.sourceImages[i]);

                let imageDone = false;

                let j = i;
                while ((j < (this.state.sourceImages.lenght - 1) && (this.state.sourceImages[i].name === this.state.sourceImages[j + 1].name))) {
                    j++;
                }
                if ((j - 1) == 1) {
                    if ((this.state.sourceImages[i].type === 'mirax') && (this.state.sourceImages[j].type === 'tiff')) {
                        this.state.sourceImages[i].n = 1;
                        this.loadMiraxImage(props.openslide, this.state.sourceImages[i], this.state.sourceImages[j]);
                        imageDone = true;
                        i++;
                    }
                    else if ((this.state.sourceImages[i].type === "tiff") && (this.state.sourceImages[j].type === "mirax")) {
                        this.state.sourceImages[j].n = i;
                        this.loadMiraxImage(props.openslide, this.state.sourceImages[j], this.state.sourceImages[i]);
                        imageDone = true;
                        i++;
                    }
                }

                if (!imageDone) {
                    console.log(imageDone);
                    this.loadOpenslideImage(props.openslide, this.state.sourceImages[i]);
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
                url = this.state.sourceCase + "\\snapshots\\" + url;
            }
            url = prop.url + url;
            //Open the image in order to derive information that the viewer will need 
            //when we truly access the image for viewing
            let img = new Image();
            img.src = url;
            img.onload = function () {
                // image  has been loaded
                // add to list of sources
                let source = {
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
                addImage(image, source);
            };
        }



        pad(num, size) {
            let s = "000000000" + num;
            return s.substr(s.length - size);
        }

        loadMiraxImage(prop, image, presumedMatch) {
            //If a Mirax image has one and only one potential match, use that as the thumbnail
            image.thumbnail = prop.url + OPENSLIDE_THUMBNAIL_REQUEST + presumedMatch.path;
            // image.thumbnail = USE_PROXY_FOR_IMAGES?redirect(image.thumbnail,false):image.thumbnail;

            //Aside from using the TIFF as the thumbnail, loading will proceed using OpenSlide
            this.loadOpenslideImage(prop, image);
        }

        doSnapshot(offs) {
            try {
                //Get the image from the canvas
                let canvas = document.getElementsByTagName("canvas")[0];

                //get information about the image
                let caseName = this.state.sourceCase;
                let slideName = this.state.currentImage.info.name;

                //Construct a name and file path for the snapshot, starting by determining the figure number
                for (var i = 0; i < this.sourceImages.length; i++) {
                    if ('type' in this.sourceImages[i] && this.sourceImages[i].type === 'snapshot') {
                        offs++;
                    }
                }
                if (offs > 99) {
                    alert("Error: Exceeded maximum number of snapshots for this case");
                    return;
                }
                let name = "figure." + this.pad(offs, 2) + "." + slideName;
                let path = caseName + "\\snapshots\\" + name + ".jpg";
                //Construct image information for the snapshot
                let image = { type: "snapshot", name: name, path: path, tag: this.state.snapshotDiv, n: this.state.sourceImages.length };

                //Convert the canvas image to jpeg format
                // var dataURL = canvas.toDataURL("image/jpeg");


                this.state.sourceImages.push(image);
                //Add image to the slide chooser, and prepare it to be loaded by viewer
                this.loadSnapshot(SERVER_PROPERTIES.snapshot, image);
            } catch (err) {
                alert("Error: Could not take a snapshot! Cause: " + err.message);
            }
        }


        loadOpenslideImage(prop, image) {
            //Issue a JSON request for the OpenSlide server to send image specs
            $.getJSON((prop.url + OPENSLIDE_INFO_REQUEST + image.path), function (data) {
                //Split the return string into an array of image specifications
                // console.log(data)
                let str = JSON.stringify(data);
                let str2 = JSON.stringify(data);
                let str3 = str.substr(1,(str2.length-2))

                let args = str3.split(",");

                //Compile a map of the information labels (keys) to data values
                let imageInfo =  new Map();
                for (let i = 2; i < args.length; i++) {
                    let entry = args[i];
                    // console.log(entry);
                    let equalSign = entry.indexOf(":");
                    // console.log(entry.substr(0, equalSign))
                    // console.log(entry.substr(equalSign + 1))
                    imageInfo.set(entry.substr(1, equalSign-2), Number.parseInt(entry.substr(equalSign + 2)));
                }
                
               
                //  console.log(imageInfo.get('openslide.level[0].width'))
                let imageWidth = +( imageInfo.get("openslide.bounds-width"));
           
                if ((imageWidth == undefined) || (isNaN(imageWidth))) {
                    imageWidth = +( imageInfo.get("image.width"));
                }


                if ((imageWidth == undefined) || (isNaN(imageWidth))) {
                    imageWidth = +( imageInfo.get("openslide.level[0].width"));
                }
                if ((imageWidth == undefined) || (isNaN(imageWidth))) {
                    imageWidth = +( imageInfo.get("layer.0.width"));
                }

                console.log(imageWidth)
                let imageHeight = +( imageInfo.get("openslide.bounds-height"));
            
                if ((imageHeight == undefined) || (isNaN(imageHeight))) {
                    imageHeight = +( imageInfo.get("image.height"));
                }
                if ((imageHeight == undefined) || (isNaN(imageHeight))) {
                    imageHeight = +( imageInfo.get("openslide.level[0].height"));
                }
                if ((imageHeight == undefined) || (isNaN(imageHeight))) {
                    imageHeight = +( imageInfo.get("layer.0.height"));
                }
                console.log(imageHeight)
                //If openslide.bounds-(x,y) defined, extract; otherwise set startX, startY to (0,0)
                let startX = +( imageInfo.get("openslide.bounds-x"));
                if ((startX == undefined) || (isNaN(startX))) {
                    startX = 0;
                }
                let startY = +( imageInfo.get("openslide.bounds-y"));
                if ((startY == undefined) || (isNaN(startY))) {
                    startY = 0;
                }

                //Extract the tilesize 
                let tileSizeHeight = +( imageInfo.get("tile.height"));
                let tileSizeWidth = +(imageInfo.get("tile.width"));
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
                console.log(imageSize);
                //Set the image levels based on image size
                let imageLevels = 0;
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
                    minLevel: 0,
                    tileOverlap: 1,
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
                addImage(image, source);
            });
        }



    }
    return <WSIBox />
}

export default WSIBox;
