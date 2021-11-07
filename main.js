Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera= document.getElementById("camera");
Webcam.attach('#camera');

function takepic() {
    Webcam.snap(function (data_uri) {
        document.getElementById("pic").innerHTML= '<img id= "taken_img" src= "' + data_uri + '"/>';
        console.log('ml5 version:', ml5.version);
        classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Zv3Hk_iaa/model.json', modelLoaded);
    });
}

function modelLoaded() {
    console.log("modelloaded");
}

function identify() {
    picture= document.getElementById("taken_img");
    console.log(picture);
    classifier.classify(picture, percentage);
}

function percentage(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("person").innerHTML= results[0].label;
        document.getElementById("accuracy").innerHTML= results[0].confidence.toFixed(3);
    }
}