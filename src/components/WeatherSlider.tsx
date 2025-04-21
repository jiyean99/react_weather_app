import React, { useEffect, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import styles from './WeatherSlider.module.css';

interface ForecastData {
  list: {
    dt_txt: string;
    main: {
      temp: number;
    };
    weather: {
      main: string;
      description: string;
      icon: string;
    }[];
  }[];
}

interface WeatherSliderProps {
  theme: 'light' | 'dark';
  city: string;
  weatherData: ForecastData;
}

const WeatherSlider: React.FC<WeatherSliderProps> = ({ theme, weatherData }) => {
  // 날짜별로 데이터 그룹화
  const groupedData = useMemo(() => {
    const groups: { [key: string]: typeof weatherData.list } = {};
    
    weatherData.list.forEach(item => {
      const date = new Date(item.dt_txt).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(item);
    });

    return groups;
  }, [weatherData]);

  useEffect(() => {
    // weatherData가 변경될 때마다 Swiper를 새로 초기화
    const swiper = document.querySelector('.swiper') as any;
    if (swiper && swiper.swiper) {
      swiper.swiper.update();
    }
  }, [weatherData]);

  return (
    <div className={`${styles['slider-container']} ${theme === 'dark' ? styles['dark-theme'] : styles['light-theme']}`}>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className={styles['slider']}
        key={JSON.stringify(weatherData)} // weatherData가 변경될 때마다 Swiper를 새로 생성
      >
        {Object.entries(groupedData).map(([date, items]) => (
          <SwiperSlide key={date}>
            <div className={styles['slide']}>
              <h3>{date}</h3>
              <div className={styles['weather-forecasts']}>
                {items.map((item, index) => (
                  <div key={index} className={styles['forecast-item']}>
                    <p className={styles['time']}>
                      {new Date(item.dt_txt).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit', 
                        hour12: false 
                      })}
                    </p>
                    <img 
                      src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} 
                      alt={item.weather[0].description}
                      className={styles['weather-icon']}
                    />
                    <p className={styles['description']}>{item.weather[0].description}</p>
                    <p className={styles['temperature']}>{Math.round(item.main.temp)}°C</p>
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
