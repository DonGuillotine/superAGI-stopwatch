class Stopwatch {
    constructor() {
        this.startTime = null;
        this.elapsedTime = 0;
        this.timerInterval = null;
    }

    start() {
        if (!this.startTime) {
            this.startTime = new Date().getTime();
            this.timerInterval = setInterval(() => {
                const currentTime = new Date().getTime();
                this.elapsedTime += currentTime - this.startTime;
                this.startTime = currentTime;
                this.updateDisplay();
            }, 1000);
        }
    }

    stop() {
        if (this.startTime) {
            clearInterval(this.timerInterval);
            this.startTime = null;
        }
    }

    reset() {
        this.elapsedTime = 0;
        this.updateDisplay();
    }

    updateDisplay() {
        const seconds = Math.floor(this.elapsedTime / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const formattedTime = formatTime(hours, minutes % 60, seconds % 60);
        document.getElementById("time").textContent = formattedTime;
    }
}

function formatTime(hours, minutes, seconds) {
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(number) {
    return number.toString().padStart(2, "0");
}

function startStopwatch(stopwatch) {
    const startStopButton = document.getElementById("startStopButton");
    if (startStopButton.textContent === "Start") {
        startStopButton.textContent = "Stop";
        stopwatch.start();
    } else {
        startStopButton.textContent = "Start";
        stopwatch.stop();
    }
}

function resetStopwatch(stopwatch) {
    stopwatch.reset();
    document.getElementById("startStopButton").textContent = "Start";
}

const stopwatch = new Stopwatch();

document.getElementById("startStopButton").addEventListener("click", () => {
    startStopwatch(stopwatch);
});

document.getElementById("resetButton").addEventListener("click", () => {
    resetStopwatch(stopwatch);
});
