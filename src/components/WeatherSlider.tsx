import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import styles from './WeatherSlider.module.css';

interface WeatherData {
    date: string;
    temperature: number;
    description: string;
    time: string;
    icon: string;
}

interface GroupedWeatherData {
    date: string;
    forecasts: WeatherData[];
}

interface WeatherSliderProps {
    theme: "light" | "dark";
}

const WeatherSlider: React.FC<WeatherSliderProps> = ({ theme }) => {
    const [weatherData, setWeatherData] = useState<GroupedWeatherData[]>([]);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const API_KEY = '8599852cc989e43376dedb400a31ca61';
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?q=Seoul&appid=${API_KEY}&units=metric`
                );
                const data = await response.json();
                
                // 오늘 날짜부터 3일간의 데이터만 필터링
                const today = new Date();
                today.setHours(0, 0, 0, 0); // 오늘 자정으로 설정
                
                const filteredData = data.list.filter((item: any) => {
                    const itemDate = new Date(item.dt_txt);
                    const diffTime = itemDate.getTime() - today.getTime();
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    return diffDays >= 0 && diffDays <= 3; // 오늘 포함 3일간의 데이터
                });

                // 날짜별로 데이터 그룹화
                const groupedData = filteredData.reduce((acc: { [key: string]: WeatherData[] }, item: any) => {
                    const date = new Date(item.dt_txt).toLocaleDateString();
                    const time = new Date(item.dt_txt).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        hour12: false // 24시간 형식으로 표시
                    });
                    
                    if (!acc[date]) {
                        acc[date] = [];
                    }
                    
                    acc[date].push({
                        date,
                        temperature: item.main.temp,
                        description: item.weather[0].description,
                        time,
                        icon: item.weather[0].icon
                    });
                    
                    return acc;
                }, {});

                // 그룹화된 데이터를 배열로 변환하고 시간순으로 정렬
                const formattedData = Object.entries(groupedData).map(([date, forecasts]) => ({
                    date,
                    forecasts: (forecasts as WeatherData[]).sort((a, b) => a.time.localeCompare(b.time))
                }));

                setWeatherData(formattedData);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeatherData();
    }, []);

    return (
        <div className={`${styles['slider-container']} ${theme === 'dark' ? styles['dark-theme'] : styles['light-theme']}`}>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                className={styles['slider']}
            >
                {weatherData.map((dayData, index) => (
                    <SwiperSlide key={index}>
                        <div className={styles['slide']}>
                            <h3>{dayData.date}</h3>
                            <div className={styles['weather-forecasts']}>
                                {dayData.forecasts.map((forecast, forecastIndex) => (
                                    <div key={forecastIndex} className={styles['forecast-item']}>
                                        <p className={styles['time']}>{forecast.time}</p>
                                        <img 
                                            src={`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`} 
                                            alt={forecast.description}
                                            className={styles['weather-icon']}
                                        />
                                        <p className={styles['description']}>{forecast.description}</p>
                                        <p className={styles['temperature']}>{Math.round(forecast.temperature)}°C</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default WeatherSlider;
