
document.getElementById("b1").addEventListener('click',function(){
    setTimeout(function(){
        console.log("click1");
    },0);
})

document.getElementById("b2").addEventListener('click',function(){
       console.log("click2");
})


setInterval(function(){
   console.log("interval");
},2000);


setTimeout(function(){
   document.getElementById("b1").click(); //clicks the button with the id of 'b1'
},1500);


setTimeout(function(){
   document.getElementById("b2").click(); //clicks the button with the id of 'b2'
},1500);

setTimeout(function(){
   console.log("timeout");
},1000); 