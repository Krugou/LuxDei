import React, {useEffect, useState} from 'react';

const WeatherData = ({coords}) => {
    const [weatherData, setWeatherData] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
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
                setRetryCount(0); // Reset retry count on successful request
            } catch (error) {
                if (retryCount < 2) { // Limit retries to 2
                    setRetryCount(retryCount + 1);
                    setTimeout(() => {
                        fetchData();
                    }, 1000);
                }
            }
        };



        fetchData();
    }, [coords, retryCount,]);

    if (!weatherData) {
        return null;
    }

    const {temperatureOutput, windSpeedOutput, windDirectionDegreeReversed, weatherCode} = weatherData;

    return (
        <div id="weatherdata" className='flex flex-col md:flex-row '>
            <div className="flex flex-row" >
                <p className="text-white">{temperatureOutput}</p>
                <img src={`/weather/png/${weatherCode}.png`} alt='Weather icon' className='w-6 h-6 bg-white rounded-full p-1 mx-2 my-0  inline-block align-middle transform transition duration-500 ease-in-out' />
            </div>
            <div className="flex flex-row  " >
                <p className="text-white">{windSpeedOutput}</p>

                <img
                    src="/png/up-arrow2.png"
                    alt="Wind direction arrow"
                    className="arrow w-6 h-6 bg-white rounded-full p-1 mx-2 my-0  inline-block align-middle transform transition duration-500 ease-in-out"
                    style={{transform: `rotate(${windDirectionDegreeReversed}deg)`}}
                />
            </div>
        </div>
    );
};


export default WeatherData;