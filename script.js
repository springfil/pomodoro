    const POMODORO_BUTTON = document.getElementById("pomodoro");
    const SHORTBREAK_BUTTON = document.getElementById("short-break");
    const LONGBREAK_BUTTON = document.getElementById("long-break");
    const TIMER_ELEMENT = document.getElementById("timer");
    const START_BUTTON = document.getElementById("start");
    const STOP_BUTTON = document.getElementById("stop");

    POMODORO_BUTTON.addEventListener("click", setTimer.bind(null, "pomodoro"));
    SHORTBREAK_BUTTON.addEventListener("click", setTimer.bind(null, "short-break"));
    LONGBREAK_BUTTON.addEventListener("click", setTimer.bind(null, "long-break"));
    STOP_BUTTON.addEventListener("click", stopTimer);

    const timers = {
    pomodoro: 1 * 60,
    "short-break": 5 * 60,
    "long-break": 10 * 60,
    };

    let currentTimer = null;
    let timeLeft = null;
    let timerId = null;

    const updateTimer = () => {
    const minutes = Math.floor(timeLeft / 60)
        .toString()
        .padStart(2, "0");
    const seconds = (timeLeft % 60).toString().padStart(2, "0");
    TIMER_ELEMENT.innerText = `${minutes}:${seconds}`;
    };

    function setTimer(timer) {
    currentTimer = timers[timer];
    timeLeft = timers[timer];
    updateTimer();
    }

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

        if (timeLeft === 0) {
        clearInterval(timerId);
        timeLeft = null;
        START_BUTTON.disabled = false;
        STOP_BUTTON.disabled = true;
        chooseBreakType();
        }

        updateTimer();
    }, 1000);
    }

    function chooseBreakType() {
    const choice = confirm("Хорошо поработал, отдохнем?");
    if (choice) {
        const breakType = confirm("Короткий перерыв?")
        ? "short-break"
        : "long-break";
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

    START_BUTTON.addEventListener("click", () => {
    startTimer();
    const audio = new Audio("yamade.mp3");
    audio.play();
    });
