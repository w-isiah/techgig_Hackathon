// Stopwatch functionality
let stopwatchInterval;
let stopwatchSeconds = 0;
let stopwatchRunning = false;

document.getElementById('start-stopwatch').addEventListener('click', function() {
    console.log("Start/Stop Stopwatch Button Clicked");
    if (!stopwatchRunning) {
        stopwatchRunning = true;
        stopwatchInterval = setInterval(updateStopwatch, 1000); // Update every second
        this.textContent = "Stop"; // Change button text to "Stop"
    } else {
        stopwatchRunning = false;
        clearInterval(stopwatchInterval); // Stop the stopwatch
        this.textContent = "Start"; // Change button text back to "Start"
    }
});

document.getElementById('reset-stopwatch').addEventListener('click', function() {
    clearInterval(stopwatchInterval); // Clear interval
    stopwatchSeconds = 0; // Reset time
    document.getElementById('stopwatch-display').textContent = "00:00"; // Reset display
    document.getElementById('start-stopwatch').textContent = "Start"; // Reset button text
    stopwatchRunning = false;
});

function updateStopwatch() {
    stopwatchSeconds++;
    let minutes = Math.floor(stopwatchSeconds / 60);
    let seconds = stopwatchSeconds % 60;
    document.getElementById('stopwatch-display').textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Timer functionality
let timerInterval;
let timerTime = 0;

document.getElementById('start-timer').addEventListener('click', function() {
    const inputTime = parseInt(document.getElementById('timer-input').value);
    if (!isNaN(inputTime) && inputTime > 0) {
        timerTime = inputTime;
        startTimer();
    } else {
        alert("Please enter a valid time!");
    }
});

function startTimer() {
    document.getElementById('start-timer').disabled = true; // Disable button while timer runs
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (timerTime <= 0) {
        clearInterval(timerInterval);
        document.getElementById('timer-display').textContent = "00:00";
        document.getElementById('start-timer').disabled = false; // Re-enable button
        alert("Time's up!");
    } else {
        timerTime--;
        let minutes = Math.floor(timerTime / 60);
        let seconds = timerTime % 60;
        document.getElementById('timer-display').textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
    }
}

// Weather functionality
function getWeather() {
    fetch('/get_weather')
        .then(response => response.json())
        .then(data => {
            // Handle weather data and display it
            console.log('Weather Data:', data);
            const weatherInfo = document.getElementById('weather-info');
            weatherInfo.innerHTML = `
                <p><strong>Temperature:</strong> ${data.temperature}°C</p>
                <p><strong>Description:</strong> ${data.description}</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

// Automatically fetch weather data on page load
window.addEventListener('load', function() {
    getWeather();
});

// Handling orientation changes
window.addEventListener("orientationchange", () => {
    const orientation = window.orientation;

    if (orientation === 0) {  // Portrait Mode (Upright)
        // Show the clock or other relevant content
    } else if (orientation === 180) {  // Portrait Mode (Upside Down)
        // Show the timer
    } else if (orientation === 90 || orientation === -90) {  // Landscape Mode
        // Show the stopwatch and weather
        getWeather();  // Fetch and display weather when in landscape mode
    }
});
