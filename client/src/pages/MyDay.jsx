import { useState, useEffect } from "react";

export default function MyDay() {
    const apiKey = "7741429336edb20463834fa0118e040c";
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

    const [city, setCity] = useState("Minneapolis");
    const [weather, setWeather] = useState(null);
    const [input, setInput] = useState("");

    useEffect(() => {
        checkWeather(city);
    }, []);

    async function checkWeather(cityName) {
        try {
            const response = await fetch(apiURL + cityName + `&appid=${apiKey}`);
            if (!response.ok) {
                alert("City not found. Please try again.");
                return;
            }
            const data = await response.json();
            setWeather({
                name: data.name,
                temp: Math.round(data.main.temp) + "°F",
                humidity: data.main.humidity + "%",
                wind: data.wind.speed + " mph",
                condition: data.weather[0].main,
            });
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    const handleSearch = () => {
        if (input.trim() !== "") {
            setCity(input);
            checkWeather(input);
            setInput("");
        }
    };

    const getWeatherIcon = (condition) => {
        switch (condition) {
            case "Clouds": return "/public/weatherimages/clouds.png";
            case "Clear": return "/public/weatherimages/clear.png";
            case "Rain": return "/public/weatherimages/rain.png";
            case "Snow": return "/public/weatherimages/snow.png";
            case "Drizzle": return "/public/weatherimages/drizzle.png";
            case "Mist": return "/public/weatherimages/mist.png";
            default: return "/public/weatherimages/default.png";
        }
    };

    return (
        <div className="myday-container">
            <h1>Hi Dan! Plan your day for the best vacation ever.</h1>
            <div className="card">
                {weather && (
                    <div className="weather">
                        <img src={getWeatherIcon(weather.condition)} alt={weather.condition} className="weather-icon" />
                        <h1 className="temp">{weather.temp}</h1>
                        <h2 className="city">{weather.name}</h2>
                        <div className="details">
                            <div className="col">
                                <img src="/public/weatherimages/humidity.png" alt="humidity icon" />
                                <div>
                                    <p className="humidity">{weather.humidity}</p>
                                    <p>Humidity</p>
                                </div>
                            </div>
                            <div className="col">
                                <img src="/public/weatherimages/wind.png" alt="wind icon" />
                                <div>
                                    <p className="wind">{weather.wind}</p>
                                    <p>Wind Speed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
