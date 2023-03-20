const left = document.getElementById("left");
const right = document.getElementById("right");
const time = document.getElementById("time");

const hands = ["fist-noshake", "one", "two", "three", "four", "five", "six"];
var score_player = 0;
var score_bot = 0;
var batting = 1;
var player_input = 0;
var run = 1;
var dots = 0;

transition("First Inning", "Batting");

document.addEventListener("keypress", (event) => {
    if(!isNaN(event.key) && event.key < 7){
        player_input = event.key;
    }
})

function bat_score(){
    if(player_input == random_right || dots >= 3){
        document.getElementById("score-value").innerHTML = "OUT";
        transition("Second Inning", "Balling");
        batting = 0;
    }
    else{
        score_player += parseInt(player_input);
        document.getElementById("score-value").innerHTML = score_player;
    }
}

function ball_score(){
    if(player_input != random_right){
        score_bot += random_right;
        document.getElementById("score-value").innerHTML = score_bot;
    }
    else{
        document.getElementById("score-value").innerHTML = "OUT";
        result();
    }
}

function result(){
    if(score_player > score_bot){
        transition("Player", "Wins", Infinity);
    }
    else if(score_player == score_bot){
        transition("Match", "Draw", Infinity);
    }
    else{
        transition("Bot", "Wins", Infinity)
    }
}

function transition(number, value, duration = 2){
    run = 0;
    var transition_iter = 0;
    const transition = document.getElementById("transition");

    document.getElementById("inning-no").innerHTML = number;
    document.getElementById("inning-value").innerHTML = value;

    const transition_interval = setInterval(() => {
        transition.style.scale = "1 1";
        if(transition_iter > duration){
            transition.style.scale = "1 0";
            run = 1;
            clearInterval(transition_interval);
        }
        transition_iter += 1;
    }, 1000);
}

function shake(){
    var iter = 0;
    player_input = 0;
    left.className = "og shake_left";
    left.style.pointerEvents = "none";
    right.className = "og shake_right";
    time.className = "shrink";

    const interval = setInterval(() => {
        iter += 1;

        if(iter == 2){
            //left hand (player)
            left.className = "og";
            left.src = `./hand_svg/${hands[player_input]}.svg`;
            if(player_input == 0){
                left.style.scale = "1.1 1.1";
                dots += 1;
            }
            else if(hands[player_input] != "six"){
                left.style.rotate = "45deg";
                left.style.scale = "-1 1";
                dots = 0;
            }
            else{
                left.style.scale = "0.8 0.8";
                dots = 0;
            }

            //right hand (bot)
            random_right = Math.floor(Math.random()*6) + 1;
            right.className = "og";
            right.src = `./hand_svg/${hands[random_right]}.svg`;
            if(hands[random_right] != "six"){
                right.style.rotate = "-45deg";
                right.style.scale = "-1 1";
            }
            else{
                right.style.scale = "0.8 0.8"
            }

            //update score
            if(batting){
                bat_score();
            }
            else{
                ball_score();
                if(score_bot > score_player){
                    result();
                }
            }
        }
        if(iter == 3){
            time.className = "";
        }
        if(iter == 4){
            //left hand (player)
            left.style.pointerEvents = "all";
            left.src = "./hand_svg/fist-noshake.svg";
            left.style.rotate = "0deg";
            left.style.scale = "1 1";

            //right hand (bot)
            right.src = "./hand_svg/fist-noshake.svg";
            right.style.rotate = "0deg";
            right.style.scale = "1 1";

            clearInterval(interval);
        }
        
    }, 750);
}

function main(){
    main_iter = 0;
    const main_interval = setInterval(() => {
        if(run){
            shake();
        }
        main_iter += 1;
    }, 3000);
}

main();
