import React, { useEffect, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import styles from './WeatherSlider.module.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

  // 각 날짜별 차트 데이터 생성
  const getChartData = (items: typeof weatherData.list) => {
    const labels = items.map(item => 
      new Date(item.dt_txt).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false 
      })
    );
    
    const data = items.map(item => Math.round(item.main.temp));

    return {
      labels,
      datasets: [
        {
          label: 'Temperature (°C)',
          data,
          borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
          backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
          pointBorderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
          pointBorderWidth: 2,
          fill: true,
          borderWidth: 2,
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        titleColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
        bodyColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
        borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (context: any) => {
            return `${context.parsed.y}°C`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          display: true,
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
          font: {
            size: 12,
          },
          padding: 10,
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
          font: {
            size: 12,
          },
          maxRotation: 0,
          padding: 10,
        }
      }
    },
    elements: {
      line: {
        tension: 0.4,
      }
    }
  };

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
        key={JSON.stringify(weatherData)}
      >
        {Object.entries(groupedData).map(([date, items]) => (
          <SwiperSlide key={date}>
            <div className={styles['slide']}>
              <h3>{date}</h3>
              <div className={styles['chart-container']}>
                <Line data={getChartData(items)} options={chartOptions} />
              </div>
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
