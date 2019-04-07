


function openmodal(){
    jQuery.noConflict(),
    $('#ex1').modal('show'); 
}


var cvs = document.getElementById("canvas");
var gameview = cvs.getContext("2d"); // 2D spiel

var vogel = new Image();
var background = new Image();
var frontground = new Image();
var stockUp = new Image();
var stockBottom = new Image();
 
//adding image to var
vogel.src = "img/flappy_bird_bird.png";
background.src = "img/flappy_bird_bg.png";
frontground.src = "img/flappy_bird_fg.png";
stockUp.src = "img/flappy_bird_pipeUp.png";
stockBottom.src = "img/flappy_bird_pipeBottom.png";



// audio
let fly = new Audio();
let score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";



let gap = 125;

//on hit key vogel go up
document.addEventListener("keydown", moveUp); // fugt event hinzu, hier keydown und bestimmt function was beim event passiert
document.addEventListener("touchstart" , moveUp);
document.addEventListener("touchend" , movenone);

document.getElementById("tryagain").onclick =function() {tryAgain()};
document.getElementById("start", "startofgame").onclick = function(){startGame()};

/* stockBottom.onload = draw; */
function startGame(){
    startofgame.style.display ="none";
    draw();



}
function tryAgain(){
    history.go(0);
}

function moveUp(){ //function für den event keydown, damit der vogel hochfliegt
    yPos -= 35;
    fly.play();
}

function movenone(){ //function für den event keydown, damit der vogel hochfliegt
    yPos -= 0;

}

// Blocks
var pipe = []; // leerer block
pipe[0] = { //nur 1 object in dem block, deswegen die 0
    x : cvs.width,
    y : 0
}

var score = 0;
var highscore = 0;

// vogel position
let xPos = 10;
let yPos = 150;
let grav = 1.5;


function gameover(){
    gameview.fillText("GAME OVER!!!", 100, 200);
}





function draw(){
    gameview.drawImage(background, 0, 0);

    for(var i = 0; i < pipe.length; i++) { // cycle
    gameview.drawImage(stockUp, pipe[i].x, pipe[i].y);
    gameview.drawImage(stockBottom, pipe[i].x, pipe[i].y + stockUp.height + gap); // nimm die höhe von stock up und fügt zwischenraum von gap hinzu
    
    pipe[i].x--;//let the object inside block pipe move -- also -1 immer


    // hier if fall, wenn object erreicht 125px so wird neuer object hinzugefügt.
    if(pipe[i].x == 90){
        pipe.push({
            x : cvs.width,
            y : Math.floor(Math.random() *stockUp.height) - 
            stockUp.height // hier nehmen wir floor für aufrunden und random für random zahl, dann dieses mal unser stockUP höhe und dann das ganze - stockUp höhe
        });
    }

    // untersuche berührung von vogel und stockup
    if(xPos + vogel.width >= pipe[i].x
        && xPos <= pipe[i].x + stockUp.width
        && (yPos <= pipe[i].y + stockUp.height
        || yPos + vogel.height >= pipe[i].y + stockUp.height + gap)
        || yPos + vogel.height >= cvs.height - frontground.height ){
            return(openmodal());

        }    

        if(pipe[i].x  == 5){
            score++;
            score_audio.play();
        }

//HTML Box edit + score
document.getElementById("losttext").innerHTML = 'GAME OVER!! Your Score was: ' + score;

    }

    gameview.drawImage(frontground, 0, cvs.height - frontground.height); // nimmt die cvs höhe und reduziert den frontground höhe, so bleibt der frontground unten.
    gameview.drawImage(vogel, xPos, yPos); // mann kann auch 2 weitere hinzufügen 10, 150, 20, 20 ... diese sagen die breite und höhe des objects aus.

    yPos += grav; // vogel yPos 

    gameview.fillStyle = "#000";
    gameview.font = "20px Verdana";
    gameview.fillText("Score" + " " + score, 10, cvs.height - 20);
    gameview.fillText("Hightscore" + " " + highscore, 120, cvs.height - 20);



    requestAnimationFrame(draw); // loop , damit die function draw immer und immer wieder geloopt wird



}

