sound = "";
status = "";
object = [];

function preload(){
    sound = createVideo("alarm_beep_3.mp3");
}

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Object";
}

function modelLoaded(){
    console.log("model is ready");
    status = true;
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        object = results;
    }

}

function draw(){
    image(video,0,0,380,380);

    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResults);

        for(i = 0;i < object.length;i=i+1){
            if(object[i].label == "person"){
                document.getElementById("status").innerHTML = "Status: Object Detected";
                document.getElementById("objectCount").innerHTML = "Baby Found";
                sound.stop()
                percent = floor(object[i].confidence * 100);
                fill(r,g,b);
                text("Baby" + " " + percent + "%",object[i].x + 15,object[i].y + 15)
                noFill();
                stroke(r,g,b);
                rect(object[i].x, object[i].y, object[i].width, object[i].height);
            }
            else{
                sound.play();
                sound.loop();
                document.getElementById("objectCount").innerHTML = "Baby Not Found";
                document.getElementById("status").innerHTML = "Status: Detecting";
            }
        }
    }

   
   /* fill("#ff0000"); 
    noFill();
    stroke("#ff0000");
    rect(40,40,275,350);
    rect(280,80,250,275);
    textSize(20);
    text("dog",50,60);
    text("cat",285,100); 
    */
}