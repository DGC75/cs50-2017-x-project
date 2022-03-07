



var n; // = 3;
var box; // = new Array(n);
var width;  // button width
var height; // button height
var count;
var measureTime;
var jsTimer;
var lightColor = "off.jpg";
var darkColor = "on.jpg";
var _stop;


function resizeBoard(p) {
    var board = document.getElementsByName("sizeBoard")[0].value;
    board.innerHTML = "";
    n = p;
    if (n < 5) {
        width = height = 101;
    }
    else if (n==50){
        width = height = 15;
    }
     else {
        width = height = 71;
    }
    prepareTable();
}
function checkResult() {
    // ACCESA=0, SPENTA=1
    var val = box[0][0];
    var fail = 0;
    for (x = 0; x < n; x++) {
        for (y = 0; y < n; y++) {
            if (box[x][y] != val) {
                fail = 1;
            }
        }
    }
    if (fail == 0) {
        /*INSERIRE UN ALERT E SUCCESSIVAMENTE IL COLLEGAMENTO ALLA LEADERBOARD*/
        alert("You Win!");
    }
}

//OK, DEVO RISCRIVERE QUESTE DUE FUNZIONI
//nextMove, changeColor
//i e j sono le coordinate della cella
function nextMove(i, j) {
    console.log("nextMove of:", i, j);
    changeColor(i, j);
    //Qua sarà un bordello...
    /*
    if (j - 1 >= 0) changeColor(i, j - 1);
    if (j + 1 < n) changeColor(i, j + 1);
    if (i - 1 >= 0) changeColor(i - 1, j);
    if (i + 1 < n) changeColor(i + 1, j);
    */
    for (var m = 0; m <n; m++) {
       changeColor(m,j);
    }
    for (var l = 0; l <n; l++) {
       changeColor(i,l);
    }
    checkResult();
}
function changeColor(i, j) {
    var img = document.getElementById("img" + i + j);
    console.log("changeColor of:", i, j);
         if (box[i][j] == "1") {
        img.setAttribute("src", lightColor);
        box[i][j] = 0;

        //Se la lampadina è accesa = 0
    } else {
        img.setAttribute("src", darkColor);
        box[i][j] = 1;

        //Se la lampadina è spenta = 1
    }

    
}
function prepareTable() {
    box = new Array(n);
    for (i = 0; i < n; i = i + 1) {
        box[i] = new Array(n);
    }

    for (i = 0; i < n; i = i + 1) {
        for (j = 0; j < n; j = j + 1) {
            box[i][j] = Math.round(Math.random());
        }
    }

    var square = document.getElementById("square");
    square.innerHTML="";
    for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
            var img = document.createElement("img");
            img.setAttribute("id", "img" + i + j);
            img.setAttribute("data-x", i);
            img.setAttribute("data-y", j);
            if (box[i][j] == 1) {
                img.setAttribute("src", darkColor);
            } else {
                img.setAttribute("src", lightColor);
            }
            img.setAttribute("width", width);
            img.setAttribute("height", height);
            //Qui viene fatta la callback alla funzione nextMove
            img.setAttribute("onClick", "javascript:nextMove(" + i + "," + j + ");");
            square.appendChild(img);
        }
        var br = document.createElement("br");
        square.appendChild(br);
    }
}

//Thanks to: https://stackoverflow.com/questions/24849/execute-script-after-specific-delay-using-javascript

function delay(ms) {
        var cur_d = new Date();
        var cur_ticks = cur_d.getTime();
        var ms_passed = 0;
        while(ms_passed < ms) {
            var d = new Date();  // Possible memory leak?
            var ticks = d.getTime();
            ms_passed = ticks - cur_ticks;
            // d = null;  // Prevent memory leak?
        }
    }

function godButton() {
/*

*/
    var img = document.getElementById("img" + 0 + 0);
     
     
    for (i =0 ; i < n; i++) {
        for (j =0 ; j < n; j++) {
          if (i==0 && j==0)
          {
            continue;
          } 
          var checkMe = document.getElementById("img" + i + j);
     if (checkMe.getAttribute("src") != img.getAttribute("src") ) {  
        var m;
                    for ( m = 0; m <n; m++) {
                       
                        console.log("(x)row cycle:", m, j);
                        if(m==i){
                            continue;
                        }
                    nextMoveTimed(m,j);
                    
                    }
                    var l;
                    for ( l = 0; l <n; l++) {
                        console.log("(y)row cycle:", i, l);
                        
                        nextMoveTimed(i,l);                   
                        
                    }


        }
}
}
}
// NEXTMOVE TIMEATO

function nextMoveTimed(i, j) {
    setTimeout(function() {
    changeColor(i, j);
    //Qua sarà un bordello...

    for (var m = 0; m <n; m++) {
        delay(100);
       changeColor(m,j);
    }
    for (var l = 0; l <n; l++) {
        delay(100);
       changeColor(i,l);
    }
    checkResult();
    },0); 
}

   

// CAMBIO COLORE TIMATO
    function changeColorTimed(i, j) {
        delay(0);
     var img = document.getElementById("img" + i + j);
    
    //console.log("changeColor of:", i, j);
    setTimeout(function() {
         if (box[i][j] == "1") {
        img.setAttribute("src", lightColor);
        box[i][j] = 0;

        //Se la lampadina è accesa = 0
    } else {
        img.setAttribute("src", darkColor);
        box[i][j] = 1;

        //Se la lampadina è spenta = 1
    }
       },0); 
}


   /*  ROBACCE VARIE ED EVENTUALI
               
                if (checkMe.getAttribute("src") != img.getAttribute("src") ) {
                    var m;
                    for ( m = 0; m <n; m++) {
                       
                        console.log("row cycle:", m, g);
                        if(m==f){
                            godButton(m+1,g);
                        }
                        updateImg(m, g);
                    nextMove(m,g);
                    }
                    var l;
                    for ( l = 0; l <n; l++) {
                        console.log("row cycle:", i, l);
                        if(l==g){
                            godButton(f,l+1);
                        }
                        updateImg(f, l);
                        nextMove(f,l);                     
                        
                    }
                } else {
                    setTimeout(function() {
         godButton(f,g+1);
       },100); 
                    
                }
 
 */  







