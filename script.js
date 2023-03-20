const left = document.getElementById("left");
const right = document.getElementById("right");

const hands = ["one", "two", "three", "four", "five", "six"];
var score_player = 0;
var score_bot = 0;
var batting = 1;

transition("First Inning", "Batting");

function bat_score(){
    if(random_left != random_right){
        score_player += random_left + 1;
        document.getElementById("score-value").innerHTML = score_player;
    }
    else{
        document.getElementById("score-value").innerHTML = "OUT";
        transition("Second Inning", "Balling");
        batting = 0;
    }
}

function ball_score(){
    if(random_left != random_right){
        score_bot += random_right + 1;
        document.getElementById("score-value").innerHTML = score_bot;
    }
    else{
        document.getElementById("score-value").innerHTML = "OUT";
        result();
    }
}

function result(){
    if(score_player > score_bot){
        transition("Player", "Wins");
    }
    else if(score_player == score_bot){
        transition("Match", "Draw");
    }
    else{
        transition("Bot", "Wins")
    }
}

function transition(number, value){
    var transition_iter = 0;
    const transition = document.getElementById("transition");

    document.getElementById("inning-no").innerHTML = number;
    document.getElementById("inning-value").innerHTML = value;

    const transition_interval = setInterval(() => {
        transition.style.scale = "1 1";
        if(transition_iter > 2){
            transition.style.scale = "1 0";
            clearInterval(transition_interval);
        }
        transition_iter += 1;
    }, 1000);
}

function shake(event){
    var iter = 0;
    left.className = "og shake_left";
    left.style.pointerEvents = "none";
    right.className = "og shake_right";

    const interval = setInterval(() => {
        iter += 1;

        if(iter == 2){
            //left hand (player)
            random_left = Math.floor(Math.random()*6);
            left.className = "og";
            left.src = `./hand_svg/${hands[random_left]}.svg`;
            if(hands[random_left] != "six"){
                left.style.rotate = "45deg";
                left.style.scale = "-1 1";
            }
            else{
                left.style.scale = "0.8 0.8";
            }

            //right hand (bot)
            random_right = Math.floor(Math.random()*6);
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
