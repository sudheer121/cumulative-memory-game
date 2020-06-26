var gameOver = 1; 
lastPattern = [];
buttonColours = [ "red", "blue", "green", "yellow" ];
function chooseColour()
{   
    return buttonColours[Math.floor(Math.random()*4)]; 
}

var randomChosenColour;     // chosen by computer
var arrayEndPointer = -1; // points to last element of last successful pattern(its length-1 actually)
var arrayPointer=-1;         // temporary variable, changes accorging to user click. 

$(".bigbtn").click(function(){ startGame(); });
$(".red").click( function(){ pressed("red"); } );
$(".blue").click( function(){ pressed("blue"); } );
$(".green").click( function(){ pressed("green"); } );
$(".yellow").click( function(){ pressed("yellow"); } );

function pressed(colour)
{   colourBlink(colour,100);
    if(gameOver==0)
    {   $(".bigbtn p").slideUp();
        ++arrayPointer;
        if(arrayPointer > arrayEndPointer || lastPattern[arrayPointer]!=colour)
        {   console.log("it's over ")
            $(".bigbtn h4").text("Game Over");
            $(".bigbtn h4").fadeOut().fadeIn().fadeOut().fadeIn().fadeOut().fadeIn();
            $(".bigbtn p").text("to start,");
            setTimeout(function()
             {
                $(".bigbtn p").text("to start,");
                $(".bigbtn p").slideDown();
                $(".bigbtn h4").text("click here");
             },2000); 
            
            gameOver = 1; 
            gameOverSound();
        }
        else if(arrayPointer == arrayEndPointer)
        {   $(".bigbtn h4").text("complete match").fadeOut().fadeIn().fadeOut().fadeIn();
            arrayPointer = -1; 
            randomChosenColour = chooseColour();
            colourBlinkAndAssign(randomChosenColour,1500);
        }
        else
        {
            $(".bigbtn h4").text("match").fadeOut().fadeIn();
            console.log("match");
            
        }
    }
    else
    {
        gameOverSound();
    }
}

function startGame()
{
if(gameOver==1)
{
    
    $(".bigbtn").addClass("pressed");
    setTimeout(function(){
        $(".bigbtn").removeClass("pressed");
    }, 100);
    
    $(".bigbtn p").text("wait");
    $(".bigbtn h4").text("watch your left");
    wordAnime("wait");

gameOver = 0
randomChosenColour = chooseColour();
lastPattern = [];
arrayEndPointer = -1; 
arrayPointer = -1; 
colourBlinkAndAssign(randomChosenColour,3000);
}
}

function colourBlink(colour,time)
{  setTimeout(function()
    {
        $("." + colour).addClass("pressed");
        setTimeout(function(){
            $("." + colour).removeClass("pressed");
            var audio = new Audio("sounds/" + colour + ".mp3");
            audio.play();
        }, 300);
    },time);
}

function colourBlinkAndAssign(colour,time)
{
    setTimeout(function()
    {
        $("." + colour).addClass("pressed");
        setTimeout(function(){
            $("." + colour).removeClass("pressed");
            var audio = new Audio("sounds/" + colour + ".mp3");
            audio.play();
        }, 300);
        lastPattern.push(colour);
        arrayEndPointer++;
    },time);
}
function gameOverSound()
{
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
}

function wordAnime(word)
{
setTimeout(function(){
    $(".bigbtn p").text(word + ".")
}, 500);
setTimeout(function(){
    $(".bigbtn p").text(word + "..")
}, 1000);
setTimeout(function(){
    $(".bigbtn p").text(word + "...")
}, 1500);
setTimeout(function(){
    $(".bigbtn p").text(word + "....")
}, 2000);
setTimeout(function(){
    $(".bigbtn p").text(word + ".....")
}, 2500);
}

var vpw =  $(window).width();
var vph =  $(window).height();
console.log(String(vpw)+" "+String(vph));
if(vpw < 600)
{
    $(".bigbtn h3,.bigbtn h4,.bigbtn p").css("font-size","2vw")
}
if(vpw < 550)
{
    $(".end").css("height", String(0.6*vph) + "px");
}
else if(vpw > 550 && vpw < 800)
{
    $(".end").css("height", String(0.5*vph) + "px");
    $("h6").css("padding-bottom",  "50px");
}
else if(vpw > 800 && vpw < 1080)
{
    $(".end").css("height", String(0.5*vpw) + "px");
    $("h6").css("padding-bottom",  "50px");
}
else 
{   
        $(".end").css("height", String(0.4*vpw) + "px");
        $("h6").css("padding-bottom",  "30px");
}