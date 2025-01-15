import { useState, useEffect } from 'react';

interface WeatherData {
    date: string;
    temperature: number;
    description: string;
}

const WeatherSlider = () => {
    const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

    useEffect(() => {
        // 여기서는 더미 데이터를 사용
        // 실제 API 호출로 교체 가능
        const fetchWeatherData = async () => {
            const data = [
                { date: '2024-12-17', temperature: 18, description: 'Clear Sky' },
                { date: '2024-12-18', temperature: 15, description: 'Partly Cloudy' },
                { date: '2024-12-19', temperature: 20, description: 'Sunny' },
            ];
            setWeatherData(data);
        };

        fetchWeatherData();
    }, []);

    return (
        <div className="weather-slider-container">
            <div
                // spaceBetween={50}
                // slidesPerView={1}
                // navigation
                // pagination={{ clickable: true }}
            >
                {weatherData.map((data, index) => (
                    <div key={index}>
                        <div className="weather-card">
                            <h4>{data.date}</h4>
                            <p>{data.description}</p>
                            <p>{Math.round(data.temperature)}°C</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherSlider;
