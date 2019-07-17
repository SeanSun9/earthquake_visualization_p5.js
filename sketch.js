let img;

let longitude = 120.3119;
let latitude = 31.4912;

let clongitude = 0;
let clatitude = 0;

let zoomLevel = 1;
let earthquake;

//31.4912° N, 120.3119° E

function preload(){

    img = loadImage("https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,1,0,0/1024x512?access_token=pk.eyJ1Ijoic2VhbnN1bjkiLCJhIjoiY2p5MDdmNW9zMDA2cTNicGRkdmVzdjRlcSJ9.peJ8SXChZctmFVIC8Nv8Lg"); 
    earthquake = loadStrings("query.csv");

}



function webMercatorX(lon){
    lon = radians(lon);
    let a = (256/PI)*pow(2,zoomLevel);
    let b = lon + PI;
    return a*b;

}

function webMercatorY(lat){
    lat = radians(lat);
    let a = (256/PI)*pow(2,zoomLevel);
    let b = tan(PI/4 + lat/2);
    let c = PI - log(b);
    return a*c;

}



function setup() {
    createCanvas(1024,512);
    translate(width/2,height/2);
    imageMode(CENTER);
    image(img,0,0);

    for(let i=0;i<earthquake.length;i++){
        let data = earthquake[i].split(/,/);
        console.log(data);
        latitude = data[1];
        longitude = data[2];
        let magnitude = data[4];
        magnitude = pow(10,magnitude);
        magnitude = sqrt(magnitude);

        maxmag = sqrt(pow(10,10));



        let diameter = map(magnitude,0,maxmag,0,30);
        let color = map(magnitude,0,maxmag,0,255);

        let cx = webMercatorX(clongitude);
        let cy = webMercatorY(clatitude);
        let x = webMercatorX(longitude) -cx;
        let y = webMercatorY(latitude) - cy;
    
        fill(255,color,0);
        noStroke();
        ellipse(x,y,diameter,diameter);
    }

    // let cx = webMercatorX(clongitude);
    // let cy = webMercatorY(clatitude);
    // let x = webMercatorX(longitude) -cx;
    // let y = webMercatorY(latitude) - cy;

    // ellipse(x,y,4,4);


   
}

function draw() {
    


}