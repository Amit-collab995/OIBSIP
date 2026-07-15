function convertTemp() {
    const inputTemp =
        parseFloat(document.getElementById("temperature").value);

    const unit =
        document.getElementById("unit").value;

    const error =
        document.getElementById("error");

    const c =
        document.getElementById("celsius");

    const f =
        document.getElementById("fahrenheit");

    const k =
        document.getElementById("kelvin");


    error.innerHTML = "";

    c.innerHTML = "";
    f.innerHTML = "";
    k.innerHTML = "";


    if (isNaN(inputTemp)) {
        error.innerHTML = "Please enter a valid number.";
        return;
    }

    let celsius, fahrenheit, kelvin;

    if (unit === "c") {
        if (inputTemp < -273.15) {
            error.innerHTML = "Temperature cannot be below absolute zero (-273.15°C)"
            return;
        }
        celsius = inputTemp;
        fahrenheit = (inputTemp * 9 / 5) + 32;
        kelvin = inputTemp + 273.15;
    }
    else if (unit === "f") {
        if (inputTemp < -459.67) {
            error.innerHTML = "Temperature cannot be below absolute zero (-459.67°F)"
            return;
        }
        fahrenheit = inputTemp;

        celsius = (inputTemp - 32) * 5 / 9;

        kelvin = celsius + 273.15;
    }
    else {

        if (inputTemp < 0) {

            error.innerHTML =
                "Temperature below Absolute Zero.";

            return;

        }

        kelvin = inputTemp;

        celsius = inputTemp - 273.15;

        fahrenheit = (celsius * 9 / 5) + 32;

    }

    c.innerHTML = `Celsius : ${celsius.toFixed(2)} °C`;
    f.innerHTML = `Fahrenheit : ${fahrenheit.toFixed(2)} °F`;
    k.innerHTML = `Kelvin : ${kelvin.toFixed(2)} K`;


    const output = `Celsius: ${celsius.toFixed(2)} °C, Fahrenheit: ${fahrenheit.toFixed(2)} °F, Kelvin: ${kelvin.toFixed(2)} K`;


}