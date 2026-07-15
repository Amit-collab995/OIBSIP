function convertTemp() {
    const inputTemp = parseFloat(document.getElementById("temperature").value);
    const fromUnit = document.getElementById("fromUnit").value;
    const toUnit = document.getElementById("toUnit").value;
    const error = document.getElementById("error");
    const c = document.getElementById("celsius");
    const f = document.getElementById("fahrenheit");
    const k = document.getElementById("kelvin");
    const r = document.getElementById("rankine");

    error.textContent = "";
    c.textContent = "";
    f.textContent = "";
    k.textContent = "";
    r.textContent = "";

    if (isNaN(inputTemp)) {
        error.textContent = "Please enter a valid number.";
        return;
    }

    let celsius, fahrenheit, kelvin;

    if (fromUnit === "c") {
        if (inputTemp < -273.15) {
            error.textContent = "Temperature cannot be below absolute zero (-273.15°C)";
            return;
        }
        celsius = inputTemp;
        fahrenheit = (inputTemp * 9) / 5 + 32;
        kelvin = inputTemp + 273.15;
    } else if (fromUnit === "f") {
        if (inputTemp < -459.67) {
            error.textContent = "Temperature cannot be below absolute zero (-459.67°F)";
            return;
        }
        fahrenheit = inputTemp;
        celsius = ((inputTemp - 32) * 5) / 9;
        kelvin = celsius + 273.15;
    } else if (fromUnit === "k") {
        if (inputTemp < 0) {
            error.textContent = "Temperature cannot be below absolute zero (0 K).";
            return;
        }
        kelvin = inputTemp;
        celsius = inputTemp - 273.15;
        fahrenheit = (celsius * 9) / 5 + 32;
    } else {
        if (inputTemp < 0) {
            error.textContent = "Temperature cannot be below absolute zero (0 R).";
            return;
        }
        const kelvinFromRankine = inputTemp * 5 / 9;
        kelvin = kelvinFromRankine;
        celsius = kelvinFromRankine - 273.15;
        fahrenheit = (celsius * 9) / 5 + 32;
    }

    c.textContent = "";
    f.textContent = "";
    k.textContent = "";
    r.textContent = "";

    if (toUnit === "c") {
        c.textContent = `Celsius: ${celsius.toFixed(2)} °C`;
    } else if (toUnit === "f") {
        f.textContent = `Fahrenheit: ${fahrenheit.toFixed(2)} °F`;
    } else if (toUnit === "k") {
        k.textContent = `Kelvin: ${kelvin.toFixed(2)} K`;
    } else {
        const rankine = kelvin * 9 / 5;
        r.textContent = `Rankine: ${rankine.toFixed(2)} °R`;
    }
}

const convertBtn = document.getElementById("convertBtn");
if (convertBtn) {
    convertBtn.addEventListener("click", convertTemp);
}
