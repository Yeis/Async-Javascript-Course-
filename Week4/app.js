var Ships  = [
    {name:"CR90 Corvette" , id:"2"},
    {name:"V-wing" , id:"75"},
    {name:"Belbullab-22 Starfighter" , id:"74"},
    {name:"Jedi Interceptor" , id:"65"},
    {name:"Star Destroyer" , id:"3"},
    {name:"Trade Fedaration Cruiser" , id:"59"},
    {name:"Solar Sailer" , id:"58"},
    {name:"Republic Attack Cruiser" , id:"63"},
    {name:"A-wing" , id:"28"},
    {name:"B-wing" , id:"29"},
    {name:"Naboo Fighter" , id:"39"},
    {name:"Millenium Falcon", id:"10"}
];
//localVariables 
var shipOption1 = document.getElementById("ships1");
var shipOption2 = document.getElementById("ships2");
SetupOptions();

document.getElementById("compare").addEventListener("click", compareShips);


function SetupOptions(){
    Ships.forEach(function(ship){
        shipOption1.innerHTML += '<option value="'+ship.id+'" >'+ship.name +'</option>';
        shipOption2.innerHTML += '<option value="'+ship.id+'" >'+ship.name +'</option>';
    });
};

function compareShips(){
    clean();
    run(gen).catch(function(err){
        alert(err.message);
    });
};
function clean(){
    document.getElementById('name1').classList.remove('redTd');
    document.getElementById('name2').classList.remove('redTd');
    document.getElementById('cost1').classList.remove('redTd');
    document.getElementById('cost2').classList.remove('redTd');
    document.getElementById('speed1').classList.remove('redTd');
    document.getElementById('speed2').classList.remove('redTd');
    document.getElementById('cargo1').classList.remove('redTd');
    document.getElementById('cargo2').classList.remove('redTd');
    document.getElementById('passenger1').classList.remove('redTd');
    document.getElementById('passenger2').classList.remove('redTd');
}
function *gen(){
    //fetch first starship
    var starship1response = yield fetch('http://swapi.co/api/starships/'+ shipOption1.value);
    var starhip1 = yield starship1response.json();
    //fetch second starship
    var starship2response = yield fetch('http://swapi.co/api/starships/'+ shipOption2.value);
    var starhip2= yield starship2response.json();
    //display data
    document.getElementById('name1').innerHTML = starhip1.name;
    document.getElementById('name2').innerHTML = starhip2.name;
    document.getElementById('cost1').innerHTML = starhip1.cost_in_credits;
    document.getElementById('cost2').innerHTML = starhip2.cost_in_credits;
    document.getElementById('speed1').innerHTML = starhip1.max_atmosphering_speed;
    document.getElementById('speed2').innerHTML = starhip2.max_atmosphering_speed;
    document.getElementById('cargo1').innerHTML = starhip1.cargo_capacity;
    document.getElementById('cargo2').innerHTML = starhip2.cargo_capacity;
    document.getElementById('passenger1').innerHTML = starhip1.passengers;
    document.getElementById('passenger2').innerHTML = starhip2.passengers;
    //speed
    if(starhip1.max_atmosphering_speed > starhip2.max_atmosphering_speed){
        document.getElementById('speed1').className += " redTd";}
    else{
        document.getElementById('speed2').className += " redTd";}
    //cost
    if(starhip1.cost_in_credits > starhip2.cost_in_credits){
        document.getElementById('cost1').className += " redTd";
    }
    else{
        document.getElementById('cost2').className += " redTd";
    }
    //cargo
    if(starhip1.cargo_capacity > starhip2.cargo_capacity){
        document.getElementById('cargo1').className += " redTd";
    }
    else{
        document.getElementById('cargo2').className += " redTd";
    }
    //passengers
    if(starhip1.passengers > starhip2.passengers){
        document.getElementById('passenger1').className += " redTd";
    }
    else{
        document.getElementById('passenger2').className += " redTd";
    }


}


function run(genFunc){
    const genObject= genFunc(); //creating a generator object

    function iterate(iteration){ //recursive function to iterate through promises
        if(iteration.done) //stop iterating when done and return the final value wrapped in a promise
            return Promise.resolve(iteration.value);
        return Promise.resolve(iteration.value) //returns a promise with its then() and catch() methods filled
        .then(x => iterate(genObject.next(x))) //calls recursive function on the next value to be iterated
        .catch(x => iterate(genObject.throw(x))); //throws an error if a rejection is encountered
    }

    try {
        return iterate(genObject.next()); //starts the recursive loop
    } catch (ex) {
        return Promise.reject(ex); //returns a rejected promise if an exception is caught
    }
}