import axios from "axios";
import React, {Fragment, useEffect, useState} from "react";
import {
  AppWrapper,
  Button,
  Input,
  InputWrap,
} from "./index.style.ts";
import {darkTheme, lightTheme} from "./theme/theme.ts";
import {ThemeProvider} from "styled-components";
import WeatherSlider from "./components/WeatherSlider.tsx";
import styles from './App.module.css';
import Settings from './components/Settings';

interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    main: string;
    icon: string;
  }[];
}

function App() {
  const [location, setLocation] = useState<string>(''); // 사용자 입력 도시
  const [result, setResult] = useState<WeatherData | null>(null); // 날씨 데이터
  const [themeMode, setThemeMode] = useState<"system" | "light" | "dark">(
      "system"
  );
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const API_KEY = '8599852cc989e43376dedb400a31ca61';

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;


  const fetchWeatherData = async () => {
    if (!location.trim()) {
      alert("도시 이름을 입력하세요.");
      return;
    }
    try {
      const { data } = await axios.get<WeatherData>(url);
      console.log(data);
      setResult(data);
    } catch (err) {
      alert("날씨 데이터를 가져오는 데 실패했습니다.\n도시명을 영문으로 입력해주세요.");
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      await fetchWeatherData();
    }
  };

  // Geolocation API를 사용해 현재 위치 날씨 검색
  const fetchWeatherByLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation을 지원하지 않는 브라우저입니다.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

          try {
            const { data } = await axios.get<WeatherData>(geoUrl);
            console.log(data);
            setResult(data);
          } catch (err) {
            alert("현재 위치의 날씨 데이터를 가져오는 데 실패했습니다.");
          }
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert("위치 정보 접근이 거부되었습니다.");
              break;
            case error.POSITION_UNAVAILABLE:
              alert("위치 정보를 사용할 수 없습니다.");
              break;
            case error.TIMEOUT:
              alert("위치 정보 요청 시간이 초과되었습니다.");
              break;
            default:
              alert("알 수 없는 오류가 발생했습니다.");
          }
        }
    );
  };

  useEffect(() => {
    if (themeMode === "system") {
      const systemPrefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkMode(systemPrefersDark);
      document.documentElement.style.setProperty('--background-main', systemPrefersDark ? '#242424' : '#FFFFFF');
      document.documentElement.style.setProperty('--text-primary', systemPrefersDark ? 'rgba(255, 255, 255, 0.87)' : '#333333');
      document.documentElement.style.setProperty('--text-secondary', systemPrefersDark ? 'rgba(255, 255, 255, 0.6)' : '#666666');
      document.documentElement.style.setProperty('--border-light', systemPrefersDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)');
      document.documentElement.style.setProperty('--shadow-card', systemPrefersDark ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)');
    } else {
      setIsDarkMode(themeMode === "dark");
      if (themeMode === "dark") {
        document.documentElement.style.setProperty('--background-main', '#242424');
        document.documentElement.style.setProperty('--text-primary', 'rgba(255, 255, 255, 0.87)');
        document.documentElement.style.setProperty('--text-secondary', 'rgba(255, 255, 255, 0.6)');
        document.documentElement.style.setProperty('--border-light', 'rgba(255, 255, 255, 0.1)');
        document.documentElement.style.setProperty('--shadow-card', '0 4px 6px rgba(0, 0, 0, 0.3)');
      } else {
        document.documentElement.style.setProperty('--background-main', '#FFFFFF');
        document.documentElement.style.setProperty('--text-primary', '#333333');
        document.documentElement.style.setProperty('--text-secondary', '#666666');
        document.documentElement.style.setProperty('--border-light', 'rgba(0, 0, 0, 0.1)');
        document.documentElement.style.setProperty('--shadow-card', '0 4px 6px rgba(0, 0, 0, 0.1)');
      }
    }
  }, [themeMode]);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <AppWrapper className="appContentWrap">
        <Settings themeMode={themeMode} onThemeChange={setThemeMode} />
        <InputWrap>
          <Input
              placeholder="도시를 입력하세요"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              onKeyDown={handleKeyDown}
          />
          {location && (
            <button className="input-btn" onClick={fetchWeatherData}>검색</button>
          )}
        </InputWrap>
        <Button onClick={fetchWeatherByLocation}>현재 위치의 날씨</Button>
        {result && (
            <Fragment>
              <div className={styles['weather-card']}>
                <img 
                  src={`https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`}
                  alt={result.weather[0].main}
                  className={styles['weather-icon']}
                />
                <div className={styles['city']}>{result.name}</div>
                <div className={styles['temperature']}>
                  {Math.round((result.main.temp - 273.15) * 10) / 10}℃
                </div>
                <div className={styles['sky']}>{result.weather[0].main}</div>
              </div>
              <WeatherSlider theme={isDarkMode ? "dark" : "light"}/>
            </Fragment>
        )}
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;

