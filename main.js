// https://teachablemachine.withgoogle.com/models/af2-r7rAn/

Webcam.set({
    width : 350,
   height: 300,
   image_format: 'png',
   png_quality: 90
});

prediction="";

camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
       document.getElementById("result").innerHTML = '<img id = "captured_image" src = "'+data_uri+'">'; 
    });
}

console.log("ml5 version:", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/5WLsrpdvo/model.json",modelLoaded);

function modelLoaded(){
    console.log("model is loaded!");
}

function speak1(){
    var synth= window.speechSynthesis;
    speak_data = "The prediction is"+prediction;
    var utterThis= new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction = results[0].label;
        speak1();