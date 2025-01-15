import axios from "axios";
import React, {Fragment, useEffect, useState} from "react";
import {
  AppWrapper,
  Button,
  City,
  Input,
  InputWrap,
  RadioGroup,
  RadioOption,
  Sky,
  Temperature,
  WeatherCard
} from "./index.style.ts";
import {darkTheme, lightTheme} from "./theme/theme.ts";
import {ThemeProvider} from "styled-components";
import WeatherSlider from "./components/WeatherSlider.tsx";

interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    main: string;
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
      fetchWeatherData();
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
    } else {
      setIsDarkMode(themeMode === "dark");
    }
  }, [themeMode]);

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThemeMode(e.target.value as "system" | "light" | "dark");
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <AppWrapper className="appContentWrap">
        <InputWrap>
          <Input
              placeholder="도시를 입력하세요"
              value={location}
              onChange={(e) => setLocation(e.target.value)} // 사용자 입력 업데이트
              type="text"
              onKeyDown={handleKeyDown} // Enter 키로 날씨 검색
          />
          {location && (
            <button className="input-btn" onClick={fetchWeatherData}>검색</button>
          )}
        </InputWrap>
        <Button onClick={fetchWeatherByLocation}>현재 위치의 날씨</Button>
        {result && (
            <Fragment>
              <WeatherCard>
                <City className="city">{result.name}</City>
                <Temperature className="temperature">
                  {Math.round((result.main.temp - 273.15) * 10) / 10}℃ {/* 켈빈 → 섭씨 변환 */}
                </Temperature>
                <Sky className="sky">{result.weather[0].main}</Sky>
              </WeatherCard>
              <WeatherSlider/>
            </Fragment>
        )}
        <RadioGroup>
          <RadioOption>
            <input
                type="radio"
                id="system"
                name="theme"
                value="system"
                checked={themeMode === "system"}
                onChange={handleThemeChange}
            />
            <label htmlFor="system">System Mode</label>

            <input
                type="radio"
                id="light"
                name="theme"
                value="light"
                checked={themeMode === "light"}
                onChange={handleThemeChange}
            />
            <label htmlFor="light">Light Mode</label>
          </RadioOption>
          <RadioOption>
            <input
                type="radio"
                id="dark"
                name="theme"
                value="dark"
                checked={themeMode === "dark"}
                onChange={handleThemeChange}
            />
            <label htmlFor="dark">Dark Mode</label>
          </RadioOption>
        </RadioGroup>
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;
