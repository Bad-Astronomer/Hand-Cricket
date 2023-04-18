const choices = document.getElementsByClassName("choice");
// choice[0]: Heads, [1]: Tails, [2]: Bat, [3]: Ball

function toss(event){
    let face_input = event.target.innerText[0]; //input "H" or "T"

    //since only two choices
    choices[0].style.scale = 0;
    choices[1].style.scale = 0;

    var face = Math.floor(Math.random()*7) + 10;
    if(face % 2){
        face += 1; //to avoid null flips
    }
    const coin = document.getElementById("coin");
    var iter = 0;

    coin.style.translate = "-50% -300%";
    coin.style.transition = `transform 0.125s ease-in-out, translate ${(face+1)*125/2}ms cubic-bezier(.05,1,.58,1)`;

    const toss_interval = setInterval(() => {
        iter++;

        if(iter%4 == 0){
            coin.style.transform = `rotateY(${90*(iter+1)}deg)`
        }
        if(iter%4 == 1){
            document.getElementById("face").innerHTML = "T";
            coin.style.transform = `rotateY(${90*(iter+1)}deg)`;
        }
        if(iter%4 == 2){
            coin.style.transform = `rotateY(${90*(iter+1)}deg)`;
        }
        if(iter%4 == 3){
            document.getElementById("face").innerHTML = "H";
            coin.style.transform = `rotateY(${90*(iter+1)}deg)`;
        }

        if(iter > face/2){
            coin.style.transition = `transform 0.125s ease-in-out, translate ${(face+1)*125/2}ms cubic-bezier(.42,0,.95,0)`;
            coin.style.translate = "-50% -50%";
        }

        if(iter > face){
            clearInterval(toss_interval);
            const result = document.getElementById("result");
            result.style.opacity = 1;
            
            if(document.getElementById("face").innerHTML === face_input){
                result.innerText = "TOSS WON!";

                choices[2].style.scale = 1;
                choices[3].style.scale = 1;
                return 1;
            }
            document.getElementById("ready").style.scale = 1;
            result.innerText = "TOSS LOST..";
            return 0;
        }

    }, 125);
}

function ready(){
    document.getElementById("ready").querySelector("p").style.scale = 0;
    start(Math.floor(Math.random()*2));
}

function start(option){
    choices[2].style.scale = 0;
    choices[3].style.scale = 0;

    document.getElementsByClassName("toss-container")[0].style.transform = "scaleY(0)";
    batting = option;

    document.getElementById("game-container").style.display = "inline";
    main();
}