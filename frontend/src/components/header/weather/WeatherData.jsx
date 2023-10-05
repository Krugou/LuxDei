import {useEffect, useState} from 'react';

const WeatherData = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [coords, setCoords] = useState(null);
    useEffect(() => {
        const setDefaultCoords = () => {
            setCoords({lat: 60.2052, lon: 24.6564}); // Default coordinates for Espoo
        };

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const {latitude, longitude} = position.coords;
                setCoords({lat: latitude, lon: longitude});

            },
            (error) => {
                console.error(error);
                setDefaultCoords();
            }
        );
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(coords.lattimantti , coords.lon);
                const response = await fetch(
                    `https://api.met.no/weatherapi/locationforecast/2.0/classic?lat=${coords.lat}&lon=${coords.lon}`
                );
                const data = await response.text();
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(data, 'text/xml');
                const windSpeed = xmlDoc.getElementsByTagName('windSpeed')[0].getAttribute('mps');
                const windDirectionDegree = xmlDoc.getElementsByTagName('windDirection')[0].getAttribute('deg');
                const weatherCode = xmlDoc.getElementsByTagName('symbol')[0].getAttribute('code');
                // reverse winddirectiondegree to opposite direction
                const windDirectionDegreeReversed = windDirectionDegree - 180;
                const temperature = xmlDoc.getElementsByTagName('temperature')[0].getAttribute('value');
                const windSpeedOutput = windSpeed + ' m/s';
                const temperatureOutput = temperature + '°C';

                setWeatherData({windSpeedOutput, temperatureOutput, windDirectionDegreeReversed, weatherCode});
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    if (!weatherData) {
        return null;
    }

    const {temperatureOutput, windSpeedOutput, windDirectionDegreeReversed, weatherCode} = weatherData;

    return (
        <div id="weatherdata" className='flex flex-col md:flex-row '>
            <p className="text-white">{temperatureOutput}</p>
            <img src={`./weather/png/${weatherCode}.png`} alt='Weather icon' className='w-6 h-6 bg-white rounded-full p-1 mx-2 my-2 md:my-0 inline-block align-middle transform transition duration-500 ease-in-out' />
            <p className="text-white">{windSpeedOutput}</p>

            <img
                src="./png/up-arrow2.png"
                alt="Wind direction arrow"
                className="arrow w-6 h-6 bg-white rounded-full p-1 mx-2 my-2 md:my-0 inline-block align-middle transform transition duration-500 ease-in-out"
                style={{transform: `rotate(${windDirectionDegreeReversed}deg)`}}
            />
        </div>
    );
};

export default WeatherData;