
var faceApiKey = '023f1661f6244d3e9f81501646ef9a0f';
var analyzeButton = document.getElementById('analyseButton');
var textInput = document.getElementById('textInput');


analyzeButton.addEventListener('click',function(){
    document.getElementById('sourceImage').src = textInput.value;

    var requestBody = {
        url:document.getElementById('textInput').value 
    } ;

    var myHeader = new Headers({
        'Content-Type':'application/json',
        'Ocp-Apim-Subscription-Key':'023f1661f6244d3e9f81501646ef9a0f'
    });

    var initObject = {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: myHeader
    };

    var request = new Request('https://westus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=age,gender' , initObject);

    fetch(request).then(function(response){
        if(response.ok){
            return response.json();
        }
        else{
            return Promise.reject(new Error(response.statusText));
        }
    }).then(function(response){
        console.log(response[0]);
        document.getElementById("output").innerHTML = "Age: " + response[0].faceAttributes.age + "</br>" 
        + "Gender: " +  response[0].faceAttributes.gender ;
    }).catch(function(err){
        alert(err);  
        document.getElementById("output").innerHTML = "No Faces Detected";
    });

});