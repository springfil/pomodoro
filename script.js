const POMODORO_BUTTON = document.getElementById("pomodoro");
const SHORTBREAK_BUTTON = document.getElementById("short-break");
const LONGBREAK_BUTTON = document.getElementById("long-break");
const TIMER_ELEMENT = document.getElementById("timer");
const C1_CIRCLE = document.getElementById("c1");
const C2_CIRCLE = document.getElementById("c2");
const START_BUTTON = document.getElementById("start");
const STOP_BUTTON = document.getElementById("stop");

const timers = {
  pomodoro: 1 * 60,
  "short-break": 5,
  "long-break": 10,
};

let currentTimer = timers["pomodoro"];
let timeLeft = null;
let circleLeft = null;
let timerId = null;

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  TIMER_ELEMENT.innerText = `${minutes}:${seconds}`;
}

function setTimer(timer) {
  stopTimer();
  currentTimer = timers[timer];
  timeLeft = timers[timer];
  circleLeft = timers[timer];
  updateCircle();
  updateTimer();
}

function updateCircle() {
  const l = ((timeLeft / circleLeft) * 100).toFixed(2);
  const k = (100 - l).toFixed(2);
  console.log(`timeLeft - ${timeLeft}, currentTimer|circleLeft - ${currentTimer}|${circleLeft}, l - ${l}, k - ${l}`)

  C1_CIRCLE.style.strokeDasharray = `${l} ${k}`;
  C2_CIRCLE.style.strokeDasharray = `${k} ${l}`;
  C1_CIRCLE.style.strokeDashoffset = l;
}

POMODORO_BUTTON.addEventListener("click", setTimer.bind(null, "pomodoro"));
SHORTBREAK_BUTTON.addEventListener("click", setTimer.bind(null, "short-break"));
LONGBREAK_BUTTON.addEventListener("click", setTimer.bind(null, "long-break"));
STOP_BUTTON.addEventListener("click", stopTimer);
START_BUTTON.addEventListener("click", startTimer);

function startTimer() {
  START_BUTTON.disabled = true;
  STOP_BUTTON.disabled = false;

  if (currentTimer !== null) {
    timeLeft = currentTimer;
  } else {
    timeLeft = timers["pomodoro"];
  }

  timerId = setInterval(() => {
    timeLeft--;

    if (timeLeft + 1 === 0) {
      clearInterval(timerId);
      timeLeft = null;
      START_BUTTON.disabled = false;
      STOP_BUTTON.disabled = true;
      chooseBreakType();
    }

    updateCircle();
    updateTimer();
  }, 1000);
}

function chooseBreakType() {
  const breakTypes = Object.keys(timers).slice(1);
  let breakChosen = false;

  const breakType = breakTypes
    .map((type) => {
      if (!breakChosen && confirm(`Выберите тип перерыва: ${type}?`)) {
        breakChosen = true;
        return type;
      }
      return null;
    })
    .find(Boolean);

  if (breakType) {
    setTimer(breakType);
    startTimer();
  } else {
    setTimer("pomodoro");
    startTimer();
  }
}

function stopTimer() {
  clearInterval(timerId);
  START_BUTTON.disabled = false;
  STOP_BUTTON.disabled = true;
  if (timeLeft !== null) {
    currentTimer = timeLeft;
  }
}
