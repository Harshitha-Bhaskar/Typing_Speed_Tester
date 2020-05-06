const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer = [0,0,0,0];
var interval;
var timer_running = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leading_zero(time) {
    if (time <= 9){
      time = "0" + time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    let curr_time = leading_zero(timer[0]) + ":" + leading_zero(timer[1]) + ":" + leading_zero(timer[2]);
    theTimer.innerHTML = curr_time;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60)
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60))
    timer[2] = Math.floor((timer[3]) - (timer[1] * 100) - (timer[0] * 6000));
    // console.log(theTimer.innerHTML);
}

// Match the text entered with the provided text on the page:

function spell_check() {
    let text_entered = testArea.value;
    let origin_text_match = originText.substring(0, text_entered.length)

    if (text_entered == originText){
      clearInterval(interval);
      testWrapper.style.borderColor = "#429890";
    }
    else {
      if (text_entered == origin_text_match) {
        testWrapper.style.borderColor = "#65CCf3";
      }
      else {
        testWrapper.style.borderColor = "#E95D0F";
      }
    }
    // console.log(text_entered);
}


// Start the timer:
function start() {
    let textEnteredLength = testArea.value.length;
    if (textEnteredLength === 0 && !timer_running){
      interval = setInterval(runTimer, 10);
      timer_running = true;
    }
    console.log(textEnteredLength);
}

// Reset everything:
function reset() {
    // console.log("reset has been pressed");
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timer_running = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00"
    testWrapper.style.borderColor = "grey";
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spell_check, false)
resetButton.addEventListener("click", reset, false)
