import { useState, useEffect } from "react";
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

export default function MyDay() {
    const weatherApiKey = "7741429336edb20463834fa0118e040c";
    const weatherApiURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";
    const ticketmasterApiKey = "bk7HtvieD0oKFw1BzZUU3Clx1ElNh0xW";
    const ticketmasterApiURL = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${ticketmasterApiKey}&latlong=44.9724,-93.2742&radius=5&unit=miles`;

    const [city, setCity] = useState("Minneapolis");
    const [weather, setWeather] = useState(null);
    const [events, setEvents] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        checkWeather(city);
        fetchEvents();
    }, []);

    async function checkWeather(cityName) {
        try {
            const response = await fetch(weatherApiURL + cityName + `&appid=${weatherApiKey}`);
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

    async function fetchEvents() {
        try {
            const response = await fetch(ticketmasterApiURL);
            const data = await response.json();

            if (data._embedded && data._embedded.events) {
                const today = new Date();
                const nextWeek = new Date();
                nextWeek.setDate(today.getDate() + 7);

                const filteredEvents = data._embedded.events
                    .map(event => ({
                        id: event.id,
                        name: event.name,
                        url: event.url,
                        date: new Date(event.dates.start.localDate),
                    }))
                    .filter(event => event.date >= today && event.date <= nextWeek)
                    .sort((a, b) => a.date - b.date); // Added this line of code to ensure events are published sequentially 

                setEvents(filteredEvents);
            } else {
                setEvents([]);
            }
        } catch (error) {
            console.error("Error fetching event data:", error);
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
            case "Clouds": return "/weatherimages/clouds.png";
            case "Clear": return "/weatherimages/clear.png";
            case "Rain": return "/weatherimages/rain.png";
            case "Snow": return "/weatherimages/snow.png";
            case "Drizzle": return "/weatherimages/drizzle.png";
            case "Mist": return "/weatherimages/mist.png";
            default: return "/weatherimages/default.png";
        }
    };

    return (
        <div className="myday-container">
            <h1>"Hi there! Plan your day for the best vacation ever."</h1>
            <div className="card">
                {weather && (
                    <div className="weather">
                        <img src={getWeatherIcon(weather.condition)} alt={weather.condition} className="weather-icon" />
                        <h1 className="temp">{weather.temp}</h1>
                        <h2 className="city">{weather.name}</h2>
                        <div className="details">
                            <div className="col">
                                <img src="/weatherimages/humidity.png" alt="humidity icon" />
                                <div>
                                    <p className="humidity">{weather.humidity}</p>
                                    <p>Humidity</p>
                                </div>
                            </div>
                            <div className="col">
                                <img src="/weatherimages/wind.png" alt="wind icon" />
                                <div>
                                    <p className="wind">{weather.wind}</p>
                                    <p>Wind Speed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Nearby Events Section */}
            <div className="events-section">
                <h2>📅 Nearby Events</h2>
                {events.length > 0 ? (
                    <ul>
                        {events.map(event => (
                            <li key={event.id}>
                                <a href={event.url} target="_blank" rel="noopener noreferrer">
                                    <Calendar size={20} /> <strong>{event.name}</strong>
                                    <MapPin size={16} /> {event.location}
                                    <span style={{ fontSize: "1rem", color: "#555" }}>
                                        {event.date.toLocaleDateString()} <ExternalLink size={16} />
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No upcoming events within the next 7 days.</p>
                )}
            </div>
        </div>
    );
}
